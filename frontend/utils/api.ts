export const API_BASE = "http://localhost:8080"

export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch books")
  return res.json()
}

export async function addBook(book: { title: string; author: string; year: number; detail?: string }) {
  const res = await fetch(`${API_BASE}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  })
  if (!res.ok) throw new Error("Failed to add book")
  return res.json()
}

export async function deleteBook(id: number) {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete book")
}

export async function updateBook(id: number, book: { title: string; author: string; year: number; detail?: string }) {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  })
  if (!res.ok) throw new Error("Failed to update book")
  return res.json()
}

export async function fetchBook(id: string) {
  const res = await fetch(`${API_BASE}/books/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Book not found")
  return res.json()
}