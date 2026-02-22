"use client"

import { useEffect, useState } from "react"
import {
  getUserBooks,
  deleteBook,
  UserBook,
} from "../../../services/books/booksApi"
import BookDetailsModal from "./BookDetailsModal"

export default function MyLibraryBooks() {
  const [books, setBooks] = useState<UserBook[]>([])
  const [filter, setFilter] = useState<
    "all" | "unread" | "in-progress" | "done"
  >("all")
  const [selectedBook, setSelectedBook] =
    useState<UserBook | null>(null)

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
    filter === "all"
      ? books
      : books.filter((b) => b.status === filter)

  return (
    <>
      <h2>My library</h2>

      <select
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

      <div>
        {filteredBooks.map((book) => (
          <div key={book._id}>
            <img
              src={book.imageUrl}
              alt={book.title}
              onClick={() => setSelectedBook(book)}
            />
            <p>{book.title}</p>
            <p>{book.author}</p>
            <button onClick={() => handleDelete(book._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  )
}
