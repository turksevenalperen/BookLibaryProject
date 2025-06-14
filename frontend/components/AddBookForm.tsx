"use client"
import { useState } from "react"
import type React from "react"

import { useBooks } from "../context/BookContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus } from "lucide-react"

export default function AddBookForm() {
  const { add } = useBooks()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState<number | "">("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!title || !author || !year) {
      setError("Tüm alanlar zorunludur.")
      return
    }
    try {
      await add({ title, author, year: Number(year) })
      setTitle("")
      setAuthor("")
      setYear("")
    } catch {
      setError("Kitap eklenemedi.")
    }
  }

  return (
    <Card className="mb-6 bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Yeni Kitap Ekle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">
              Başlık
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Kitap başlığını girin"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author" className="text-gray-700">
              Yazar
            </Label>
            <Input
              id="author"
              type="text"
              placeholder="Yazar adını girin"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year" className="text-gray-700">
              Yayın Yılı
            </Label>
            <Input
              id="year"
              type="number"
              placeholder="Yayın yılını girin"
              value={year}
              onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Kitap Ekle
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
