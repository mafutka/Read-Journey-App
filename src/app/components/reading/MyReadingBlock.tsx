"use client"

import { useReadingStore } from "@/store/useReadingStore"
import css from "./AddReading.module.css"
import toast from "react-hot-toast"

export default function MyReadingBlock() {
  const activeBook = useReadingStore((s) => s.activeBook)
  const isReading = useReadingStore((s) => s.isReading)
  const startReading = useReadingStore((s) => s.startReading)
  const finishReading = useReadingStore((s) => s.finishReading)
  const currentPage = useReadingStore((s) => s.currentPage)
  const totalPages = useReadingStore((s) => s.totalPages)

  if (!activeBook) return null

  const handleClick = async () => {
    try {
      const nextPage = currentPage === 0 ? 1 : currentPage + 1

      if (!isReading) {
        await startReading(currentPage === 0 ? 1 : currentPage + 1)
        toast.success("Reading started")
      } else {
        await finishReading(currentPage)
        await finishReading(nextPage)
        toast.success("Reading stopped")
      }
    } catch {
      toast.error("Server error")
    }
  }

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
          <p className={css.author}>{activeBook.author}</p>
          <p className={css.pages}>{activeBook.totalPages}</p>
        </div>

        <button className={css.redBtn1} onClick={handleClick}>
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