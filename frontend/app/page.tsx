"use client";

import Link from "next/link";
import { useState } from "react";
import { useBooks, type Book } from "../context/BookContext";
import AddBookForm from "../components/AddBookForm";
import EditBookForm from "../components/EditBookForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit, BookOpen, Calendar, User } from "lucide-react";

export default function Home() {
  const { books, remove } = useBooks();
  const [editing, setEditing] = useState<Book | null>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8" />
            Kitap Koleksiyonum
          </h1>
          <p className="text-gray-600">Kitaplarınızı organize edin ve yönetin</p>
        </div>

        <AddBookForm />

        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <EditBookForm book={editing} onClose={() => setEditing(null)} />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Kitaplarım ({books.length})
          </h2>
          {books.length === 0 ? (
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Henüz kitap eklenmemiş</p>
                <p className="text-gray-500 text-sm mt-2">
                  Yukarıdaki formu kullanarak ilk kitabınızı ekleyin
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {books.map((book) => (
                <Card
                  key={book.id}
                  className="bg-white border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Link href={`/books/${book.id}`} className="block group">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                            {book.title}
                          </h3>
                          <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{book.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{book.year}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditing(book)}
                          className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => remove(book.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
