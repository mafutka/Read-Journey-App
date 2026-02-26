"use client"

import { useLibraryStore } from "@/store/useLibraryStore"
import Modal from "../ui/Modal"
import { Book } from "../../../services/books/booksApi"
import DarkButton from "../ui/DarkButton"
import css from "./AddModal.module.css"
import BookModalLayout from "../ui/BookModalLayout"

type Props = {
  book: Book
  onClose: () => void
}

export default function AddModal({ book, onClose }: Props) {
  const { addBookById } = useLibraryStore()

  const handleAdd = async () => {
    await addBookById(book._id)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <BookModalLayout
        imageUrl={book.imageUrl}
        title={book.title}
        author={book.author}
      >
        <DarkButton className={css.addBtn} onClick={handleAdd}>
          Add to library
        </DarkButton>
      </BookModalLayout>
    </Modal>
  )
}
