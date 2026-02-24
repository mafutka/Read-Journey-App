"use client"

import { useEffect, useState } from "react"
import { useLibraryStore } from "../../../store/useLibraryStore"
import BookDetailsModal from "./BookDetailsModal"
import LibraryBookCard from "./LibraryBookCard"
import css from "./BookCardLibrary.module.css"

export default function MyLibraryBooks() {
  const { books, fetchBooks, removeBook, loading } = useLibraryStore()

  const [filter, setFilter] = useState<
    "all" | "unread" | "in-progress" | "done"
  >("all")

  const [selectedBook, setSelectedBook] = useState<string | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  const filteredBooks =
    filter === "all"
      ? books
      : books.filter((b) => b.status === filter)

  const currentBook = books.find((b) => b._id === selectedBook) || null

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
                e.target.value as
                  | "all"
                  | "unread"
                  | "in-progress"
                  | "done"
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
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#F9F9F9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredBooks.length === 0 ? (
        <div className={css.empty}>
          <div className={css.imageBox}>
            <img
              src="/books_small.png"
              alt="Empty library"
              className={css.emptyImage}
            />
          </div>
          <p className={css.emptyText}>
            To start training, add{" "}
            <span className={css.gray}>some of your books </span>
            or from the recommended ones
          </p>
        </div>
      ) : (
        <div className={css.list}>
  {filteredBooks.map((book) => (
    <LibraryBookCard
      key={book._id}
      book={book}
      onDelete={removeBook}
      onOpen={setSelectedBook}
    />
  ))}
</div>
      )}

      {currentBook && (
        <BookDetailsModal
          book={currentBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}
