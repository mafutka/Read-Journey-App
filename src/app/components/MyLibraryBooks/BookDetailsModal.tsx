"use client"

import { useRouter } from "next/navigation"
import { UserBook } from "@/services/books/booksApi"
type Props = {
  book: UserBook
  onClose: () => void
}
export default function BookDetailsModal({ book, onClose }: Props) {
  const router = useRouter()

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✕</button>

        <img src={book.imageUrl} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>

        <button onClick={() => router.push(`/reading/${book._id}`)}>
          Start reading
        </button>
      </div>
    </div>
  )
}
