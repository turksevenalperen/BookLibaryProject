"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchBooks, addBook, deleteBook as apiDeleteBook, updateBook as apiUpdateBook } from "../utils/api";

export type Book = { id: number; title: string; author: string; year: number };

type BookContextType = {
  books: Book[];
  refresh: () => void;
  add: (book: Omit<Book, "id">) => Promise<void>;
  remove: (id: number) => Promise<void>;
  edit: (id: number, book: Omit<Book, "id">) => Promise<void>;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const refresh = () => {
    fetchBooks().then(setBooks).catch(() => setBooks([]));
  };

  useEffect(() => {
    refresh();
  }, []);

  const add = async (book: Omit<Book, "id">) => {
    await addBook(book);
    refresh();
  };

  const remove = async (id: number) => {
    await apiDeleteBook(id);
    refresh();
  };

  const edit = async (id: number, book: Omit<Book, "id">) => {
    await apiUpdateBook(id, book);
    refresh();
  };

  return (
    <BookContext.Provider value={{ books, refresh, add, remove, edit }}>
      {children}
    </BookContext.Provider>
  );
};

export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks must be used within BookProvider");
  return ctx;
}