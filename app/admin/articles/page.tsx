import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

// Temporary mock data until we set up proper data storage
const mockArticles = [
  {
    id: "1",
    title: "Safari Planning Guide",
    status: "draft",
    category: "Planning Guides",
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Wildlife Photography Tips",
    status: "published",
    category: "Travel Tips",
    updated_at: new Date().toISOString()
  }
]

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {mockArticles.map((article) => (
          <Link key={article.id} href={`/admin/articles/${article.id}/edit`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{article.title}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    article.status === "published" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {article.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>Category: {article.category}</p>
                  <p>Last updated: {new Date(article.updated_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {mockArticles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No articles yet. Click "New Article" to create one.
          </div>
        )}
      </div>
    </div>
  )
} 