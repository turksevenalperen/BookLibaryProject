"use client"

import { useState } from "react"
import type React from "react"
import { type Book, useBooks } from "../context/BookContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, X, Loader2 } from "lucide-react"

export default function EditBookForm({
  book,
  onClose,
}: {
  book: Book
  onClose: () => void
}) {
  const { edit } = useBooks()
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const [year, setYear] = useState<number | "">(book.year)
  const [detail, setDetail] = useState(book.detail || "")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Book title is required"
    } else if (title.trim().length < 2) {
      newErrors.title = "Book title must be at least 2 characters"
    }

    if (!author.trim()) {
      newErrors.author = "Author name is required"
    } else if (author.trim().length < 2) {
      newErrors.author = "Author name must be at least 2 characters"
    }

    if (!year) {
      newErrors.year = "Publication year is required"
    } else if (year < 1000 || year > new Date().getFullYear() + 1) {
      newErrors.year = `Publication year must be between 1000 and ${new Date().getFullYear() + 1}`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await edit(book.id, {
        title: title.trim(),
        author: author.trim(),
        year: Number(year),
        detail: detail.trim() || undefined,
      })
      onClose()
    } catch (error) {
      setErrors({ submit: "An error occurred while updating the book. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-4 bg-white shadow-2xl border-0">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Edit className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Edit Book</h3>
            <p className="text-sm text-gray-600 font-normal mt-1">Update the information for "{book.title}"</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-gray-700 font-medium">
                Book Title *
              </Label>
              <Input
                id="edit-title"
                type="text"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (errors.title) {
                    setErrors((prev) => ({ ...prev, title: "" }))
                  }
                }}
                className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 ${
                  errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-author" className="text-gray-700 font-medium">
                Author *
              </Label>
              <Input
                id="edit-author"
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value)
                  if (errors.author) {
                    setErrors((prev) => ({ ...prev, author: "" }))
                  }
                }}
                className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 ${
                  errors.author ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.author && <p className="text-sm text-red-600">{errors.author}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-year" className="text-gray-700 font-medium">
              Publication Year *
            </Label>
            <Input
              id="edit-year"
              type="number"
              placeholder="Enter publication year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value === "" ? "" : Number(e.target.value))
                if (errors.year) {
                  setErrors((prev) => ({ ...prev, year: "" }))
                }
              }}
              className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 ${
                errors.year ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
              }`}
              min="1000"
              max={new Date().getFullYear() + 1}
              disabled={isSubmitting}
            />
            {errors.year && <p className="text-sm text-red-600">{errors.year}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-detail" className="text-gray-700 font-medium">
              About the Book <span className="text-gray-500 text-sm">(Optional)</span>
            </Label>
            <Textarea
              id="edit-detail"
              placeholder="A short description about the book..."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 min-h-[100px] resize-none"
              disabled={isSubmitting}
            />
          </div>

          {errors.submit && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-700">{errors.submit}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}