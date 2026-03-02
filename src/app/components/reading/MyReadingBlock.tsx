"use client"

import { useReadingStore } from "@/store/useReadingStore"
import css from "./AddReading.module.css"

export default function MyReadingBlock() {
  const { activeBook, isReading, toggleForm } =
    useReadingStore()

  if (!activeBook) return null

  return (
    <div className={css.card}>
      <h2>My reading</h2>

      <img
        className={css.myReadingImg}
        src={activeBook.imageUrl}
        alt={activeBook.title}
      />

      <div className={css.bookInfo}>
        <h3>{activeBook.title}</h3>
        <p>{activeBook.author}</p>
      </div>

      <button
        className={css.redBtn1}
        onClick={toggleForm}
      >
        {isReading ? (
          <svg className={css.redIcon}>
            <use href="/symbol-defs.svg#icon-block" />
          </svg>
        ) : (
          <svg className={css.redIcon}>
            <use href="/symbol-defs.svg#icon-block-1" />
          </svg>
        )}
      </button>
    </div>
  )
}