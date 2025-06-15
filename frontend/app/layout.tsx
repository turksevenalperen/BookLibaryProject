import "./globals.css"
import type { ReactNode } from "react"
import { BookProvider } from "../context/BookContext"
import { Toaster } from "sonner"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "My Book Collection",
  description: "Manage your personal book collection",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <BookProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
        </BookProvider>
      </body>
    </html>
  )
}