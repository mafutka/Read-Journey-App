import css from "./BookCardLibrary.module.css"
import { Book } from "../../../services/books/booksApi"

type Props = {
  book: Book
}

export default function BookCardLibrary({ book, }: Props) {
  return (
    <div className={css.card}>
      <img className={css.bookImj} src={book.imageUrl} alt={book.title} />
      <div className={css.textCard}>
      <h3>{book.title}</h3>
      <p className={css.author}>{book.author}</p>
      </div>
    </div>
  )
}