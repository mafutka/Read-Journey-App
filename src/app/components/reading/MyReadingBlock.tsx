"use client"

import { useReadingStore } from "@/store/useReadingStore"
import LibraryBookCard from "../MyLibraryBooks/LibraryBookCard"
import css from "./AddReading.module.css"

export default function MyReadingBlock() {
  const activeBook = useReadingStore((s) => s.activeBook)

  if (!activeBook) return null

  return (
    <div className={css.card}>
      <h2>My reading</h2>

      <img
        src={activeBook.imageUrl}
        alt={activeBook.title}
      />

      <h3>{activeBook.title}</h3>
      <p>{activeBook.author}</p>

      <button className={css.redBtn1} >
      
      <svg className={css.redIcon}>
          <use href="/symbol-defs.svg#icon-icon" />
        </svg>
        </button>
    </div>
  )
}