import css from "./RecommendedBooks.module.css"
import { Book } from "../../../services/books/booksApi"

type Props = {
  book: Book
  onClick: () => void
}

export default function BookCard({ book, onClick }: Props) {
  return (
    <div onClick={onClick} className={css.card}>
      <img src={book.imageUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  )
}
