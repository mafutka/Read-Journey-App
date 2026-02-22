"use client"

import Modal from "../ui/Modal"
import { Book } from "../../../services/books/booksApi"
import css from "./AddModal.module.css"

type Props = {
  book: Book
  onClose: () => void
}

export default function AddModal({ book, onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <img
        className={css.image}
        src={book.imageUrl}
        alt={book.title}
      />

      <h2>{book.title}</h2>
      <p>{book.author}</p>

      <button className={css.addBtn}>
        Add to library
      </button>
    </Modal>
  )
}
