"use client"

import { useEffect, useState } from "react"
import BookCardLibrary from "../MyLibraryBooks/BookCardLibrary"
import { getRecommendedBooks, Book } from "../../../services/books/booksApi"
import Link from "next/link"
import css from "./Recommended.module.css"

export default function RecommendedPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendedBooks(page, 3)
        setBooks(data.results)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBooks()
  }, [page])

  return (
    <div className={css.prewiewContainer}>
      <h2>Recommended books</h2>
      <div className={css.previeList}>
        {books.map((book) => (
          <BookCardLibrary
            key={book._id}
            book={book}
          />
        ))}
      </div>
      <div className={css.bottom}>
        <Link href="/recommended" className={css.link}>
          Recommended
        </Link>
        <Link href="/recommended">
          <svg className={css.arrowIcon}>
            <use href="/symbol-defs.svg#icon-log-in" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
