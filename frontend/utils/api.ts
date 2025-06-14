export const API_BASE = "http://localhost:8080";

export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books`, { cache: "no-store" });
  if (!res.ok) throw new Error("Kitaplar alınamadı");
  return res.json();
}

export async function addBook(book: { title: string; author: string; year: number }) {
  const res = await fetch(`${API_BASE}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Kitap eklenemedi");
  return res.json();
}
// ...existing code...

export async function deleteBook(id: number) {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Kitap silinemedi");
}
// ...existing code...

export async function updateBook(id: number, book: { title: string; author: string; year: number }) {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Kitap güncellenemedi");
  return res.json();
}