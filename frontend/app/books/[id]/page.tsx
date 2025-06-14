import Link from "next/link";
import { API_BASE } from "../../../utils/api";

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE}/books/${params.id}`, { cache: "no-store" });
  if (!res.ok) {
    return <div className="text-white">Kitap bulunamadı.</div>;
  }
  const book: Book = await res.json();

  return (
    <div className="max-w-xl mx-auto mt-10 bg-red-800 rounded-xl p-8 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Kitap Detayı</h2>
      <div><b>Başlık:</b> {book.title}</div>
      <div><b>Yazar:</b> {book.author}</div>
      <div><b>Yıl:</b> {book.year}</div>
      <Link href="/" className="inline-block mt-6 px-4 py-2 bg-white text-red-700 rounded hover:bg-gray-200">Geri Dön</Link>
    </div>
  );
}
