"use client"

import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import { useDropzone } from "react-dropzone"
import { Check, ChevronRight, Copy, FileText, Loader2, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

/**
 * Admin page — drag-drop or paste a research record, POST it to
 * /api/admin/listings/import (already shipped in feature/listing-import-api),
 * surface a per-file pass/fail panel with admin edit links.
 *
 * No server work — the underlying API does all parsing, validation,
 * idempotency and 409/400/500 shaping. This page is the GUI on top of
 * the same shape the `scripts/import-listing.ts` CLI hits.
 */

// ── State shape ──────────────────────────────────────────────────────────

type PendingFile = {
  // file.name is non-unique if the user picks two files with the same
  // basename across folders; the leading client_id keeps result rows stable
  // and lets the remove-X work on the right entry.
  client_id: string
  file: File
}

type Outcome =
  | {
      kind: "success"
      action: "created" | "updated"
      listing_name: string
      admin_url: string
      raw: unknown
    }
  | {
      kind: "conflict"
      errors: string[]
      existing_admin_url: string | null
      raw: unknown
    }
  | { kind: "validation"; errors: string[]; raw: unknown }
  | { kind: "server"; status: number; message: string; raw: unknown }

type ResultRow =
  | { state: "pending"; client_id: string; filename: string }
  | { state: "running"; client_id: string; filename: string }
  | { state: "done"; client_id: string; filename: string; outcome: Outcome }

// ── Helpers ──────────────────────────────────────────────────────────────

function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

async function importOne(
  markdown: string,
): Promise<{ status: number; body: unknown }> {
  const res = await fetch("/api/admin/listings/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ markdown }),
  })
  let body: unknown = null
  try {
    body = await res.json()
  } catch {
    body = await res.text().catch(() => null)
  }
  return { status: res.status, body }
}

function toOutcome(status: number, body: unknown): Outcome {
  const obj = (body ?? {}) as Record<string, unknown>
  if (status === 201 || status === 200) {
    return {
      kind: "success",
      action: (obj.action as "created" | "updated") ?? "created",
      listing_name: (obj.listing_name as string) ?? "",
      admin_url: (obj.admin_url as string) ?? "",
      raw: body,
    }
  }
  if (status === 409) {
    return {
      kind: "conflict",
      errors: Array.isArray(obj.errors) ? (obj.errors as string[]) : [],
      existing_admin_url: (obj.admin_url as string) ?? null,
      raw: body,
    }
  }
  if (status === 400) {
    return {
      kind: "validation",
      errors: Array.isArray(obj.errors)
        ? (obj.errors as string[])
        : ["Validation failed — see raw response."],
      raw: body,
    }
  }
  return {
    kind: "server",
    status,
    message:
      (obj.message as string) ??
      (Array.isArray(obj.errors) && obj.errors.length > 0
        ? (obj.errors[0] as string)
        : `Server returned ${status}`),
    raw: body,
  }
}

// ── Page ────────────────────────────────────────────────────────────────

export default function ImportListingsPage() {
  const [mode, setMode] = useState<"upload" | "paste">("upload")
  const [files, setFiles] = useState<PendingFile[]>([])
  const [pasteValue, setPasteValue] = useState("")
  const [results, setResults] = useState<ResultRow[]>([])
  const [importing, setImporting] = useState(false)

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => {
      const next = [
        ...prev,
        ...accepted.map((f) => ({ client_id: makeId(), file: f })),
      ]
      return next
    })
  }, [])

  const dz = useDropzone({
    onDrop,
    accept: {
      "text/markdown": [".md", ".markdown"],
      "text/plain": [".md", ".markdown"],
    },
    multiple: true,
    disabled: importing,
  })

  const canImportUpload = mode === "upload" && files.length > 0 && !importing
  const canImportPaste =
    mode === "paste" && pasteValue.trim().length > 0 && !importing
  const canImport = canImportUpload || canImportPaste

  function removeFile(client_id: string) {
    setFiles((prev) => prev.filter((f) => f.client_id !== client_id))
  }

  async function handleImport() {
    if (!canImport) return
    setImporting(true)

    if (mode === "paste") {
      const client_id = makeId()
      const filename = "(pasted markdown)"
      setResults((r) => [
        ...r,
        { state: "running", client_id, filename },
      ])
      try {
        const { status, body } = await importOne(pasteValue)
        const outcome = toOutcome(status, body)
        setResults((r) =>
          r.map((row) =>
            row.client_id === client_id
              ? { state: "done", client_id, filename, outcome }
              : row,
          ),
        )
        if (outcome.kind === "success") setPasteValue("")
      } catch (err) {
        setResults((r) =>
          r.map((row) =>
            row.client_id === client_id
              ? {
                  state: "done",
                  client_id,
                  filename,
                  outcome: {
                    kind: "server",
                    status: 0,
                    message:
                      err instanceof Error
                        ? `Network error: ${err.message}`
                        : "Network error",
                    raw: null,
                  },
                }
              : row,
          ),
        )
      }
      setImporting(false)
      return
    }

    // Upload mode — sequential. Seed the result rows up front so the
    // panel renders the queue immediately, then walk them one by one.
    const queue = files
    setResults((r) => [
      ...r,
      ...queue.map((f) => ({
        state: "pending" as const,
        client_id: f.client_id,
        filename: f.file.name,
      })),
    ])

    for (const entry of queue) {
      setResults((r) =>
        r.map((row) =>
          row.client_id === entry.client_id
            ? { ...row, state: "running" }
            : row,
        ),
      )
      try {
        const markdown = await entry.file.text()
        const { status, body } = await importOne(markdown)
        const outcome = toOutcome(status, body)
        setResults((r) =>
          r.map((row) =>
            row.client_id === entry.client_id
              ? {
                  state: "done",
                  client_id: entry.client_id,
                  filename: entry.file.name,
                  outcome,
                }
              : row,
          ),
        )
      } catch (err) {
        setResults((r) =>
          r.map((row) =>
            row.client_id === entry.client_id
              ? {
                  state: "done",
                  client_id: entry.client_id,
                  filename: entry.file.name,
                  outcome: {
                    kind: "server",
                    status: 0,
                    message:
                      err instanceof Error
                        ? `Network error: ${err.message}`
                        : "Network error",
                    raw: null,
                  },
                }
              : row,
          ),
        )
      }
    }

    setFiles([])
    setImporting(false)
  }

  function clearResults() {
    setResults([])
  }

  const importButtonLabel = useMemo(() => {
    if (importing) return "Importing…"
    if (mode === "upload")
      return files.length > 0
        ? `Import ${files.length} file${files.length === 1 ? "" : "s"}`
        : "Import"
    return "Import"
  }, [importing, mode, files.length])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Import research records</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Drop one or more <code className="font-mono text-xs">.md</code>{" "}
            files from{" "}
            <code className="font-mono text-xs">handoff/listings/</code>, or
            paste markdown directly. Each record is parsed, validated, and
            written as a pending row you can review and approve.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/pending">View pending →</Link>
        </Button>
      </div>

      {/* Input — Upload / Paste */}
      <Card>
        <CardContent className="p-6">
          <Tabs
            value={mode}
            onValueChange={(v) => setMode(v as "upload" | "paste")}
          >
            <TabsList>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="paste">Paste</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <div
                {...dz.getRootProps()}
                aria-label="Drop markdown files here, or click to choose"
                className={cn(
                  "rounded-md border-2 border-dashed p-10 text-center transition-colors cursor-pointer",
                  dz.isDragActive
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/50",
                  importing && "opacity-60 cursor-not-allowed",
                )}
              >
                <input {...dz.getInputProps()} data-testid="file-input" />
                <FileText
                  className="mx-auto h-8 w-8 text-muted-foreground"
                  aria-hidden
                />
                <p className="mt-4 text-sm">
                  {dz.isDragActive
                    ? "Drop the files here"
                    : "Drag and drop .md files here, or click to choose"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Multiple files OK. Only the markdown content is read —
                  files don't go through the server.
                </p>
              </div>

              {files.length > 0 && (
                <ul className="mt-6 divide-y divide-border rounded-md border border-border">
                  {files.map((f) => (
                    <li
                      key={f.client_id}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <FileText
                        className="h-4 w-4 text-muted-foreground shrink-0"
                        aria-hidden
                      />
                      <span className="flex-1 truncate text-sm">
                        {f.file.name}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {humanSize(f.file.size)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(f.client_id)}
                        disabled={importing}
                        aria-label={`Remove ${f.file.name}`}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-40"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="paste" className="mt-6">
              <Textarea
                value={pasteValue}
                onChange={(e) => setPasteValue(e.target.value)}
                placeholder="Paste a research-record markdown document here — YAML frontmatter followed by body."
                rows={25}
                disabled={importing}
                className="font-mono text-xs"
                data-testid="paste-textarea"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                One paste = one record. For multiple records, use the
                Upload tab.
              </p>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              type="button"
              onClick={handleImport}
              disabled={!canImport}
              data-testid="import-button"
            >
              {importing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {importButtonLabel}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-baseline justify-between gap-4">
            <CardTitle className="text-lg">Results</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearResults}
              disabled={importing}
              data-testid="clear-results"
            >
              <Trash2 className="mr-2 h-3 w-3" /> Clear
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {results.map((row) => (
                <li key={row.client_id} className="px-6 py-4">
                  <ResultEntry row={row} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ── Result entry ────────────────────────────────────────────────────────

function ResultEntry({ row }: { row: ResultRow }) {
  if (row.state === "pending" || row.state === "running") {
    return (
      <div className="flex items-center gap-3 text-sm">
        {row.state === "running" ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <span className="h-4 w-4 rounded-full border border-border" />
        )}
        <span className="font-medium">{row.filename}</span>
        <span className="text-muted-foreground text-xs">
          {row.state === "running" ? "Importing…" : "Queued"}
        </span>
      </div>
    )
  }

  const { outcome } = row

  if (outcome.kind === "success") {
    return (
      <div className="flex items-start gap-3">
        <Check
          className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0"
          aria-label="Success"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-medium">{row.filename}</span>
            <span className="text-xs text-muted-foreground">
              Pending row {outcome.action} —{" "}
              <span className="text-foreground">{outcome.listing_name}</span>
            </span>
          </div>
          <Link
            href={outcome.admin_url}
            className="mt-1 inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline"
          >
            Open in admin <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <CopyRawButton raw={outcome.raw} />
      </div>
    )
  }

  if (outcome.kind === "conflict") {
    return (
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0"
          aria-label="Conflict"
        >
          !
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-medium">{row.filename}</div>
          {outcome.errors.map((e, i) => (
            <div key={i} className="mt-1 text-sm text-amber-800">
              {e}
            </div>
          ))}
          {outcome.existing_admin_url && (
            <Link
              href={outcome.existing_admin_url}
              className="mt-1 inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline"
            >
              Open existing row <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
        <CopyRawButton raw={outcome.raw} />
      </div>
    )
  }

  if (outcome.kind === "validation") {
    return (
      <div className="flex items-start gap-3">
        <X
          className="mt-0.5 h-4 w-4 text-red-700 shrink-0"
          aria-label="Validation error"
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium">{row.filename}</div>
          <ul className="mt-1 space-y-0.5 text-sm text-red-700">
            {outcome.errors.map((e, i) => (
              <li key={i}>— {e}</li>
            ))}
          </ul>
        </div>
        <CopyRawButton raw={outcome.raw} />
      </div>
    )
  }

  // Server error
  return (
    <div className="flex items-start gap-3">
      <X
        className="mt-0.5 h-4 w-4 text-red-700 shrink-0"
        aria-label="Server error"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium">{row.filename}</div>
        <p className="mt-1 text-sm text-red-700">
          Server error ({outcome.status || "network"}) — try again or report
          to engineering. {outcome.message}
        </p>
      </div>
      <CopyRawButton raw={outcome.raw} />
    </div>
  )
}

function CopyRawButton({ raw }: { raw: unknown }) {
  const [copied, setCopied] = useState(false)
  if (raw === null || raw === undefined) return null
  return (
    <button
      type="button"
      onClick={() => {
        const text =
          typeof raw === "string" ? raw : JSON.stringify(raw, null, 2)
        navigator.clipboard.writeText(text).then(
          () => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          },
          () => {
            /* ignore — clipboard permission denied */
          },
        )
      }}
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground shrink-0"
      aria-label="Copy raw response"
    >
      <Copy className="h-3 w-3" />
      {copied ? "Copied" : "Copy raw"}
    </button>
  )
}
