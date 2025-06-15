"use client"

import Link from "next/link"
import { useState } from "react"
import { useBooks, type Book } from "../context/BookContext"
import AddBookForm from "../components/AddBookForm"
import EditBookForm from "../components/EditBookForm"
import DeleteConfirmDialog from "../components/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Trash2, Edit, BookOpen, Calendar, User, Eye, Search, Filter, Grid3X3, List, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const { books, loading } = useBooks()
  const [editing, setEditing] = useState<Book | null>(null)
  const [deleting, setDeleting] = useState<Book | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter and sort books
  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "author":
          return a.author.localeCompare(b.author)
        case "year":
          return b.year - a.year
        default:
          return 0
      }
    })

  const BookSkeleton = () => (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const BookCard = ({ book }: { book: Book }) => (
    <Card className="group bg-white border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex-1 mb-4">
            <Link href={`/books/${book.id}`} className="block">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                {book.title}
              </h3>
            </Link>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{book.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <Badge variant="secondary" className="text-xs">
                  {book.year}
                </Badge>
              </div>
            </div>
            {book.detail && <p className="text-sm text-gray-500 mt-3 line-clamp-2">{book.detail}</p>}
          </div>
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <Link href={`/books/${book.id}`} className="flex-1">
              <Button size="sm" variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(book)}
              className="text-amber-600 border-amber-200 hover:bg-amber-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDeleting(book)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const BookListItem = ({ book }: { book: Book }) => (
    <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <Link href={`/books/${book.id}`} className="block group">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {book.title}
              </h3>
              <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <Badge variant="secondary" className="text-xs">
                    {book.year}
                  </Badge>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex gap-2 ml-4">
            <Link href={`/books/${book.id}`}>
              <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(book)}
              className="text-amber-600 border-amber-200 hover:bg-amber-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDeleting(book)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">My Book Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize, manage, and discover your personal book collection
          </p>
        </div>

        {/* Add Book Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
              <div className="relative bg-white rounded-2xl shadow-2xl">
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  size="sm"
                  className="absolute -top-3 -right-3 z-10 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full w-10 h-10 p-0 shadow-lg"
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="p-2">
                  <AddBookForm onSuccess={() => setShowAddForm(false)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Books
            <Badge variant="secondary" className="ml-3 text-sm">
              {filteredBooks.length} books
            </Badge>
          </h2>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Book
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">By Title</SelectItem>
                  <SelectItem value="author">By Author</SelectItem>
                  <SelectItem value="year">By Year</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-gray-200 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none border-l"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="space-y-6">
          {loading ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <BookSkeleton key={i} />
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? "No books found" : "No books added yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? "No books match your search criteria. Try different keywords."
                    : "Start building your collection by adding your first book."}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add My First Book
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredBooks.map((book) =>
                viewMode === "grid" ? (
                  <BookCard key={book.id} book={book} />
                ) : (
                  <BookListItem key={book.id} book={book} />
                ),
              )}
            </div>
          )}
        </div>

        {/* Modals */}
        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <EditBookForm book={editing} onClose={() => setEditing(null)} />
          </div>
        )}

        {deleting && <DeleteConfirmDialog book={deleting} onClose={() => setDeleting(null)} />}
      </div>
    </main>
  )
}