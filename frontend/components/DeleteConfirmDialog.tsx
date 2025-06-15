"use client"

import { useState } from "react"
import { type Book, useBooks } from "../context/BookContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react"

export default function DeleteConfirmDialog({
  book,
  onClose,
}: {
  book: Book
  onClose: () => void
}) {
  const { remove } = useBooks()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await remove(book.id)
      onClose()
    } catch (error) {
      console.error("Error deleting book:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-4 bg-white shadow-2xl border-0">
        <CardHeader className="bg-red-50 border-b">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Delete Book</h3>
              <p className="text-sm text-gray-600 font-normal mt-1">This action cannot be undone</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete <strong>"{book.title}"</strong> from your collection?
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div>
                <strong>Author:</strong> {book.author}
              </div>
              <div>
                <strong>Year:</strong> {book.year}
              </div>
              {book.detail && (
                <div>
                  <strong>Detail:</strong> {book.detail}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Yes, Delete
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}