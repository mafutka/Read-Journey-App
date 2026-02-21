"use client"

import { useEffect } from "react"
import css from "./RecommendedBooks.module.css"
import { Book } from "../../../services/books/booksApi"

type Props = {
  book: Book
  onClose: () => void
}

export default function BookModal({ book, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)

    return () =>
      document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>✕</button>

        <img src={book.imageUrl} alt={book.title} />
        <h2>{book.title}</h2>
        <p>{book.author}</p>

        <button>Add to library</button>
      </div>
    </div>
  )
}
