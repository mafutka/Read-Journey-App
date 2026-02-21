"use client"

import { useEffect, useState } from "react"
import css from "./Recommended.module.css"

import BookCard from "../RecommendedBooks/BookCard"
import Modal from "../RecommendedBooks/Modal"
import { getRecommendedBooks, Book } from "../../../services/books/booksApi"

export default function RecommendedPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendedBooks(page, 2)
        setBooks(data.results)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBooks()
  }, [page])

  return (
    <>
      <div className={css.header}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ←
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          →
        </button>
      </div>

      <div className={css.list}>
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {selectedBook && (
        <Modal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  )
}
