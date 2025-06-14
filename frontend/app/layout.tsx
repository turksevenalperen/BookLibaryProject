import "./globals.css";
import { ReactNode } from "react";
import { BookProvider } from "../context/BookContext";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <BookProvider>{children}</BookProvider>
      </body>
    </html>
  );
}