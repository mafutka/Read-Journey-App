"use client"

import { useEffect, useState } from "react"
import {
  getUserBooks,
  deleteBook,
  UserBook,
} from "../../../services/books/booksApi"
import BookDetailsModal from "./BookDetailsModal"
import css from "./BookCardLibrary.module.css"

export default function MyLibraryBooks() {
  const [books, setBooks] = useState<UserBook[]>([])
  const [filter, setFilter] = useState<
    "all" | "unread" | "in-progress" | "done"
  >("all")
  const [selectedBook, setSelectedBook] = useState<UserBook | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getUserBooks()
        setBooks(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBooks()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id)
      setBooks((prev) => prev.filter((b) => b._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const filteredBooks =
    filter === "all" ? books : books.filter((b) => b.status === filter)

  return (
    <div className={css.libraryContainer}>
      <div className={css.header}>
        <h2>My library</h2>
        <div className={css.selectWrapper}>
          <select
            className={css.select}
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as "all" | "unread" | "in-progress" | "done",
              )
            }
          >
            <option value="all">All books</option>
            <option value="unread">Unread</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
          <svg
            className={css.arrow}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#F9F9F9"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      {filteredBooks.length === 0 ? (
         <div className={css.empty}>
          <div className={css.imageBox}>
    <img
      src="/books_small.png"
      alt="Empty library"
      className={css.emptyImage}
    />
    </div>
    <p className={css.emptyText}>
      To start training, add <span className={css.gray}>some of your books </span>or from the recommended ones
    </p>
  </div>): (
    <div className={css.list}>
        {filteredBooks.map((book) => (
          <div key={book._id}>
            <img
              src={book.imageUrl}
              alt={book.title}
              onClick={() => setSelectedBook(book)}
            />
            <p>{book.title}</p>
            <p>{book.author}</p>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </div>
        ))}
      </div>
  )}
      

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}
