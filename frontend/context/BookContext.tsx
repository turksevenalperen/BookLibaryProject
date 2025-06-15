"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { fetchBooks, addBook, deleteBook as apiDeleteBook, updateBook as apiUpdateBook } from "../utils/api"
import { toast } from "sonner"

export type Book = {
  id: number
  title: string
  author: string
  year: number
  detail?: string
}

type BookContextType = {
  books: Book[]
  loading: boolean
  refresh: () => void
  add: (book: Omit<Book, "id">) => Promise<void>
  remove: (id: number) => Promise<void>
  edit: (id: number, book: Omit<Book, "id">) => Promise<void>
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      setLoading(true)
      const data = await fetchBooks()
      setBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
      toast.error("An error occurred while loading books")
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const add = async (book: Omit<Book, "id">) => {
    try {
      await addBook(book)
      toast.success("Book added successfully!")
      refresh()
    } catch (error) {
      console.error("Error adding book:", error)
      toast.error("An error occurred while adding the book")
      throw error
    }
  }

  const remove = async (id: number) => {
    try {
      await apiDeleteBook(id)
      toast.success("Book deleted successfully!")
      refresh()
    } catch (error) {
      console.error("Error removing book:", error)
      toast.error("An error occurred while deleting the book")
      throw error
    }
  }

  const edit = async (id: number, book: Omit<Book, "id">) => {
    try {
      await apiUpdateBook(id, book)
      toast.success("Book updated successfully!")
      refresh()
    } catch (error) {
      console.error("Error editing book:", error)
      toast.error("An error occurred while updating the book")
      throw error
    }
  }

  return <BookContext.Provider value={{ books, loading, refresh, add, remove, edit }}>{children}</BookContext.Provider>
}

export function useBooks() {
  const ctx = useContext(BookContext)
  if (!ctx) throw new Error("useBooks must be used within BookProvider")
  return ctx
}