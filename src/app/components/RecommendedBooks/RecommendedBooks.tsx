"use client"

import { useEffect, useState } from "react"
import css from "./Recommended.module.css"

import BookCard from "../RecommendedBooks/BookCard"
import AddModal from "./AddModal"
import { getRecommendedBooks, Book } from "../../../services/books/booksApi"

export default function RecommendedPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(2)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

useEffect(() => {
  const updateLimit = () => {
    const width = window.innerWidth

    if (width >= 1440) {
      setLimit(10) 
    } else if (width >= 768) {
      setLimit(8) 
    } else {
      setLimit(2) 
    }
  }

  updateLimit()
  window.addEventListener("resize", updateLimit)

  return () => window.removeEventListener("resize", updateLimit)
}, [])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendedBooks(page, limit)
        setBooks(data.results)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBooks()
  }, [page, limit])

  return (
    <>
      <div className={css.header}>
        <h2>Recommended</h2>
        <div className={css.buttons}>
        <button className={css.scrollBtn}
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          <svg className={css.icon}>
            <use href="/symbol-defs.svg#icon-chevron-left" />
          </svg>
        </button>

        <button className={css.scrollBtn}
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          <svg className={css.icon}>
            <use href="/symbol-defs.svg#icon-chevron-right" />
          </svg>
        </button>
        </div>
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
        <AddModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  )
}
