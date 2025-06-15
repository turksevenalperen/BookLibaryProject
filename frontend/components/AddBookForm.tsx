"use client"

import { useState } from "react"
import type React from "react"
import { useBooks } from "../context/BookContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Loader2, BookOpen } from "lucide-react"

interface AddBookFormProps {
  onSuccess?: () => void
}

export default function AddBookForm({ onSuccess }: AddBookFormProps) {
  const { add } = useBooks()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState<number | "">("")
  const [detail, setDetail] = useState("")
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
      await add({
        title: title.trim(),
        author: author.trim(),
        year: Number(year),
        detail: detail.trim() || undefined,
      })

      // Reset form
      setTitle("")
      setAuthor("")
      setYear("")
      setDetail("")
      setErrors({})

      // Call onSuccess callback
      onSuccess?.()
    } catch (error) {
      setErrors({ submit: "An error occurred while adding the book. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-white border-0 shadow-none rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b px-8 py-6">
        <CardTitle className="text-gray-900 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Plus className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Add New Book</h3>
            <p className="text-base text-gray-600 font-normal mt-2">Add a new book to your collection</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-gray-700 font-semibold text-base">
                Book Title *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. 1984"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (errors.title) {
                    setErrors((prev) => ({ ...prev, title: "" }))
                  }
                }}
                className={`bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-base ${errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-sm text-red-600 flex items-center gap-1">{errors.title}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="author" className="text-gray-700 font-semibold text-base">
                Author *
              </Label>
              <Input
                id="author"
                type="text"
                placeholder="e.g. George Orwell"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value)
                  if (errors.author) {
                    setErrors((prev) => ({ ...prev, author: "" }))
                  }
                }}
                className={`bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-base ${errors.author ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                disabled={isSubmitting}
              />
              {errors.author && <p className="text-sm text-red-600">{errors.author}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="year" className="text-gray-700 font-semibold text-base">
              Publication Year *
            </Label>
            <Input
              id="year"
              type="number"
              placeholder="e.g. 1949"
              value={year}
              onChange={(e) => {
                setYear(e.target.value === "" ? "" : Number(e.target.value))
                if (errors.year) {
                  setErrors((prev) => ({ ...prev, year: "" }))
                }
              }}
              className={`bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-base max-w-xs ${errors.year ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
              min="1000"
              max={new Date().getFullYear() + 1}
              disabled={isSubmitting}
            />
            {errors.year && <p className="text-sm text-red-600">{errors.year}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="detail" className="text-gray-700 font-semibold text-base">
              About the Book <span className="text-gray-500 text-sm font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="detail"
              placeholder="You can write a short description about the book..."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] resize-none text-base"
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500">{detail.length}/500 characters</p>
          </div>

          {errors.submit && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-700 text-base">{errors.submit}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg h-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                Adding Book...
              </>
            ) : (
              <>
                <BookOpen className="h-5 w-5 mr-3" />
                Add Book to Collection
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}