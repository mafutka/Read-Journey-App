"use client"

import { UserBook } from "@/services/books/booksApi"
import css from "./LibraryBookCard.module.css"

type Props = {
  book: UserBook
  onDelete: (id: string) => void
  onOpen: (id: string) => void
}

export default function LibraryBookCard({ book, onDelete, onOpen }: Props) {
  return (
    <div className={css.card}>
      <div>
        <img
          src={book.imageUrl}
          alt={book.title}
          className={css.image}
          onClick={() => onOpen(book._id)}
        />
      </div>
      <div className={css.bottom}>
        <div className={css.info}>
          <p className={css.title}>{book.title}</p>
          <p className={css.author}>{book.author}</p>
        </div>

        <button className={css.deleteBtn} onClick={() => onDelete(book._id)}>
          <img className={css.img} src="/delete.png" alt="delete" />
        </button>
      </div>
    </div>
  )
}
