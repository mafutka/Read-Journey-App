
"use client"

import { useRouter } from "next/navigation"
import { useReadingStore } from "@/store/useReadingStore"
import { UserBook } from "@/services/books/booksApi"
import Modal from "../ui/Modal" 
import BookModalLayout from "../ui/BookModalLayout"
import DarkButton from "../ui/DarkButton"

type Props = {
  book: UserBook
  onClose: () => void
}

export default function BookDetailsModal({
  book,
  onClose,
}: Props) {
  const router = useRouter()
  const setActiveBook = useReadingStore(
    (state) => state.setActiveBook
  )

  const handleStartReading = () => {
    setActiveBook(book)
    onClose()
    router.push("/reading")
  }

  return (
    <Modal onClose={onClose}>
      <BookModalLayout
       imageUrl={book.imageUrl}
        title={book.title}
        author={book.author}>
      <DarkButton onClick={handleStartReading}>
        Start reading
      </DarkButton>
      </BookModalLayout>
    </Modal>
  )
}