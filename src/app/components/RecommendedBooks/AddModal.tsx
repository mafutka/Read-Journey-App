"use client"

import { useLibraryStore } from "@/store/useLibraryStore"
import Modal from "../ui/Modal"
import { Book } from "../../../services/books/booksApi"
import DarkButton from "../ui/DarkButton"
import css from "./AddModal.module.css"

type Props = {
  book: Book
  onClose: () => void
}

export default function AddModal({ book, onClose }: Props) {
  const { addBookById } = useLibraryStore()

  const handleAdd = async () => {
    try {
      await addBookById(book._id)
      onClose()
    } catch (e) {
      console.error("Add from modal error:", e)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className={css.modalContainer}>
        <img
          className={css.image}
          src={book.imageUrl}
          alt={book.title}
        />

        <div className={css.textBlock}>
          <h2>{book.title}</h2>
          <p className={css.author}>{book.author}</p>
        </div>

        <DarkButton
          className={css.addBtn}
          onClick={handleAdd}
        >
          Add to library
        </DarkButton>
      </div>
    </Modal>
  )
}
