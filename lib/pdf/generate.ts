/**
 * Server-side PDF generation via headless Chromium.
 *
 * This is the production replacement for the Mac Print > PDF workflow.
 * Chromium honours `@page`, CSS `break-before/after: page`,
 * `print-color-adjust: exact`, and absolute (`mm`) units reliably —
 * none of the Safari print-pipeline quirks we hit during the screen
 * → PDF debugging.
 *
 * Environment split:
 *   - Vercel functions: `puppeteer-core` + `@sparticuz/chromium` —
 *     a slimmed Chromium binary that fits in a serverless function.
 *   - Local development: the full `puppeteer` package (already in
 *     devDependencies) which bundles its own Chromium.
 *
 * Both paths share the same flow:
 *   1. Launch a browser
 *   2. Open a page with admin Basic Auth header set
 *   3. Navigate to the preview URL
 *   4. Wait for fonts + images to settle
 *   5. Call page.pdf() with A4 portrait, printBackground: true,
 *      preferCSSPageSize: true, margin: 0
 *
 * Cold-start latency on Vercel is ~3-5 s; warm runs ~1-2 s. Acceptable
 * for the low-volume use case (a handful of PDFs per week).
 */

type Browser = {
  newPage(): Promise<Page>
  close(): Promise<void>
}

type Page = {
  authenticate(args: { username: string; password: string }): Promise<void>
  setViewport(args: {
    width: number
    height: number
    deviceScaleFactor?: number
  }): Promise<void>
  goto(url: string, options?: Record<string, unknown>): Promise<unknown>
  evaluate<R>(fn: () => R | Promise<R>): Promise<R>
  pdf(options: Record<string, unknown>): Promise<Buffer | Uint8Array>
}

/** True if we're running on Vercel (or any AWS Lambda-flavour runtime). */
function isServerless(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)
}

async function launchBrowser(): Promise<Browser> {
  if (isServerless()) {
    // Vercel — use @sparticuz/chromium's slim binary + puppeteer-core.
    const chromiumMod = (await import("@sparticuz/chromium")) as unknown as {
      default: {
        args: string[]
        defaultViewport: { width: number; height: number } | null
        executablePath: () => Promise<string>
        headless: boolean | "shell"
      }
    }
    const chromium = chromiumMod.default
    const puppeteerCore = (await import("puppeteer-core")) as unknown as {
      default: {
        launch(opts: Record<string, unknown>): Promise<Browser>
      }
    }
    return puppeteerCore.default.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
  }
  // Local dev — full puppeteer bundles its own Chromium.
  const puppeteerMod = (await import("puppeteer")) as unknown as {
    default: {
      launch(opts: Record<string, unknown>): Promise<Browser>
    }
  }
  return puppeteerMod.default.launch({ headless: true })
}

export type GenerateItineraryPdfArgs = {
  /** Absolute URL of the preview page (e.g. https://host/admin/itineraries/[id]/preview). */
  url: string
  /** Admin Basic Auth credentials for the middleware-gated route. */
  basicAuth: { user: string; pass: string }
}

export async function generateItineraryPdf(
  args: GenerateItineraryPdfArgs,
): Promise<Buffer> {
  const browser = await launchBrowser()
  try {
    const page = await browser.newPage()

    // Forward admin Basic Auth to the protected /admin/* preview route.
    await page.authenticate({
      username: args.basicAuth.user,
      password: args.basicAuth.pass,
    })

    // A4 portrait at 96 DPI (Chromium's default print DPI). preferCSSPageSize
    // below makes the @page rule the source of truth, so this viewport is
    // just for the screen-render pass before printing.
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    })

    await page.goto(args.url, {
      waitUntil: "networkidle0",
      timeout: 30_000,
    })

    // Wait for web fonts to finish loading. Without this the first paint
    // can land before Cormorant/Newsreader resolve, leaving the PDF
    // typeset in the system fallback.
    await page.evaluate(() => document.fonts.ready)

    // Then wait for every <img> to be done loading. Chromium's print
    // pipeline waits for resources by default but a stray slow image
    // can still slip through; this belt-and-braces guarantees no blank
    // placeholders end up in the PDF.
    await page.evaluate(async () => {
      const imgs = Array.from(document.images)
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((res) => {
                img.onload = () => res()
                img.onerror = () => res()
              }),
        ),
      )
    })

    const result = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    return result instanceof Buffer ? result : Buffer.from(result)
  } finally {
    await browser.close()
  }
}
