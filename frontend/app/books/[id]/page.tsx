import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Calendar, User, FileText } from "lucide-react"

type Book = {
  id: number
  title: string
  author: string
  year: number
  detail?: string
}

const API_BASE = "http://localhost:8080"

export default async function BookDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>
}) {
  const resolvedParams = await params

  try {
    const res = await fetch(`${API_BASE}/books/${resolvedParams.id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      notFound()
    }

    const book: Book = await res.json()

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Collection
              </Button>
            </Link>
          </div>

          {/* Book Detail Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">{book.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-blue-100">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="text-lg font-medium">{book.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-base px-3 py-1">
                        {book.year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {book.detail ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <FileText className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">About the Book</h2>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed text-lg">{book.detail}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Details Available</h3>
                  <p className="text-gray-600">No additional information has been added for this book yet.</p>
                </div>
              )}

              {/* Simple Book Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <User className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-lg font-semibold text-blue-600 mb-1">{book.author}</div>
                    <div className="text-sm text-gray-600">Author</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-lg font-semibold text-purple-600 mb-1">{book.year}</div>
                    <div className="text-sm text-gray-600">Publication Year</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link href="/" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Collection
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error fetching book:", error)
    notFound()
  }
}