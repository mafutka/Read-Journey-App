"use client"

import { useRouter } from "next/navigation"
import { useReadingStore } from "@/store/useReadingStore"
import { UserBook } from "@/services/books/booksApi"

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
    <div className="backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>✕</button>

        <img src={book.imageUrl} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>

        <button onClick={handleStartReading}>
          Start reading
        </button>
      </div>
    </div>
  )
}
//  return (
//     <Modal onClose={onClose}>
//       <div className={css.modalContainer}>
//         <img
//           className={css.image}
//           src={book.imageUrl}
//           alt={book.title}
//         />

//         <div className={css.textBlock}>
//           <h2>{book.title}</h2>
//           <p className={css.author}>{book.author}</p>
//         </div>

//         <DarkButton
//           className={css.addBtn}
//           onClick={handleAdd}
//         >
//           Add to library
//         </DarkButton>
//       </div>
//     </Modal>
//   )
// }