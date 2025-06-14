"use client"
import { useState } from "react"
import type React from "react"

import { type Book, useBooks } from "../context/BookContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Edit, Save, X } from "lucide-react"

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
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!title || !author || !year) {
      setError("Tüm alanlar zorunludur.")
      return
    }
    try {
      await edit(book.id, { title, author, year: Number(year) })
      onClose()
    } catch {
      setError("Kitap güncellenemedi.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-4 bg-white shadow-2xl">
      <CardHeader className="bg-gray-50 text-gray-900 rounded-t-lg border-b">
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Kitabı Düzenle
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-gray-700 font-medium">
              Başlık
            </Label>
            <Input
              id="edit-title"
              type="text"
              placeholder="Kitap başlığını girin"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-author" className="text-gray-700 font-medium">
              Yazar
            </Label>
            <Input
              id="edit-author"
              type="text"
              placeholder="Yazar adını girin"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-year" className="text-gray-700 font-medium">
              Yayın Yılı
            </Label>
            <Input
              id="edit-year"
              type="number"
              placeholder="Yayın yılını girin"
              value={year}
              onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Vazgeç
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
