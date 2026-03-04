"use client"

import { useReadingStore } from "@/store/useReadingStore"
import css from "./AddReading.module.css"

export default function MyReadingBlock() {
  const activeBook = useReadingStore((s) => s.activeBook)
  const isReading = useReadingStore((s) => s.isReading)

  if (!activeBook) return null

  return (
    <div className={css.card}>
      <h2 className={css.heading}>My reading</h2>
<div className={css.inner}>
      <img
        className={css.myReadingImg}
        src={activeBook.imageUrl}
        alt={activeBook.title}
      />

      <div className={css.bookInfo}>
        <h3>{activeBook.title}</h3>
        <p>{activeBook.author}</p>
      </div>

      <button className={css.redBtn1}>
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
    </div>
  )
}