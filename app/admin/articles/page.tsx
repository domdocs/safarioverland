import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getArticles, type Article } from "@/lib/articles"

export const dynamic = "force-dynamic"

const STATUS_TONE: Record<Article["status"], string> = {
  published: "bg-emerald-100 text-emerald-800",
  draft: "bg-amber-100 text-amber-800",
  archived: "bg-stone-200 text-stone-700",
}

export default async function ArticlesPage() {
  const articles = await getArticles({ status: "all", limit: 200 })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-stone-600 mt-1">
            Long-form Field Notes content. {articles.length} total.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="h-4 w-4 mr-2" />
            New article
          </Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-stone-500">
            No articles yet. Click <strong>New article</strong> to write the first.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Link key={article.id} href={`/admin/articles/${article.id}/edit`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex flex-wrap justify-between items-center gap-3">
                    <span>{article.title}</span>
                    <span
                      className={`text-xs uppercase tracking-wider px-2 py-1 rounded ${STATUS_TONE[article.status]}`}
                    >
                      {article.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-stone-600 space-y-1">
                  {article.excerpt && (
                    <p className="line-clamp-2 text-stone-700">{article.excerpt}</p>
                  )}
                  <p className="text-xs text-stone-500 pt-1">
                    <span>/{article.slug}</span>
                    {article.category && <> · {article.category}</>}
                    {article.read_minutes && <> · {article.read_minutes} min read</>}
                    {article.author_name && <> · {article.author_name}</>}
                    <> · updated {new Date(article.updated_at).toLocaleDateString()}</>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
