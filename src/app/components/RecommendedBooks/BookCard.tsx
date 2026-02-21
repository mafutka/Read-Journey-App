import css from "./Recommended.module.css"
import { Book } from "../../../services/books/booksApi"

type Props = {
  book: Book
  onClick: () => void
}

export default function BookCard({ book, onClick }: Props) {
  return (
    <div onClick={onClick} className={css.card}>
      <img className={css.bookImj} src={book.imageUrl} alt={book.title} />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
    </div>
  )
}
