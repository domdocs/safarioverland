import Link from "next/link"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

/**
 * Renders admin-authored `articles.body_md` for the /field-notes/[slug]
 * public page. Prose treatment mirrors the file-based GuidePage
 * template — Cormorant headings, drop-cap first paragraph, ruled H2
 * blocks, mono-numbered list items — so DB articles read the same as
 * hand-authored ones.
 *
 * `body_md` is trusted admin input; no `rehype-raw`, no HTML pass-through.
 */

const components: Components = {
  h1: ({ children }) => (
    <h2 className="mt-16 mb-6 border-t border-rule pt-8 font-serif text-h3-fluid text-bone leading-tight tracking-tight text-balance">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-16 mb-6 border-t border-rule pt-8 font-serif text-h3-fluid text-bone leading-tight tracking-tight text-balance">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-4 font-serif text-h4-fluid text-bone leading-tight tracking-tight text-balance">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-8 mb-3 font-serif text-lg text-bone leading-snug">
      {children}
    </h4>
  ),
  p: ({ children }) => <p className="mb-5">{children}</p>,
  a: ({ href, children }) => {
    const url = href ?? "#"
    const external = /^https?:\/\//.test(url)
    if (external) {
      return (
        <a
          href={url}
          className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber transition-colors"
          rel="noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={url}
        className="text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber transition-colors"
      >
        {children}
      </Link>
    )
  },
  ul: ({ children }) => <ul className="mb-6 mt-2 space-y-3 pl-6 list-disc marker:text-amber">{children}</ul>,
  ol: ({ children }) => <ol className="mb-6 mt-2 space-y-3 pl-6 list-decimal marker:text-amber">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-amber pl-6 py-2 font-serif italic text-lg text-bone leading-snug">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-rule" />,
  strong: ({ children }) => <strong className="text-bone font-medium">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="mono rounded bg-card px-1.5 py-0.5 text-sm text-bone">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded bg-card p-4 mono text-sm leading-relaxed text-bone">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[16px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-rule">{children}</thead>,
  th: ({ children }) => (
    <th className="eyebrow px-3 py-3 text-bone">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-rule/50 px-3 py-3 text-bone-mute">{children}</td>
  ),
}

/** Lead-paragraph treatment: bone text and an amber drop cap. */
const DROP_CAP =
  "[&>p:first-of-type]:text-bone [&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:text-amber [&>p:first-of-type]:first-letter:text-[5rem] [&>p:first-of-type]:first-letter:leading-[0.9] [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1"

/**
 * `continued` drops the lead-paragraph treatment, for a body that's
 * split around an inline image and rendered in several parts.
 */
export function ArticleBody({ markdown, continued = false }: { markdown: string; continued?: boolean }) {
  return (
    <div className={`text-[19px] leading-[1.7] text-bone-mute${continued ? "" : ` ${DROP_CAP}`}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
