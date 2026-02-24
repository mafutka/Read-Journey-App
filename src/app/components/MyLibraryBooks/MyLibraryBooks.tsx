"use client"

import { useEffect, useState } from "react"
import { useLibraryStore } from "../../../store/useLibraryStore"
import BookDetailsModal from "./BookDetailsModal"
import LibraryBookCard from "./LibraryBookCard"
import css from "./BookCardLibrary.module.css"

export default function MyLibraryBooks() {
  const { books, fetchBooks, removeBook, loading } =
    useLibraryStore()

  const [filter, setFilter] = useState<
    "all" | "unread" | "in-progress" | "done"
  >("all")

  const [selectedBookId, setSelectedBookId] =
    useState<string | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  const filteredBooks =
    filter === "all"
      ? books
      : books.filter((b) => b.status === filter)

  const currentBook =
    books.find((b) => b._id === selectedBookId) || null

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
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredBooks.length === 0 ? (
        <div className={css.empty}>
          <p>No books yet</p>
        </div>
      ) : (
        <div className={css.list}>
          {filteredBooks.map((book) => (
            <LibraryBookCard
              key={book._id}
              book={book}
              onDelete={removeBook}
              onOpen={setSelectedBookId} 
            />
          ))}
        </div>
      )}

      {currentBook && (
        <BookDetailsModal
          book={currentBook}
          onClose={() => setSelectedBookId(null)}
        />
      )}
    </div>
  )
}
