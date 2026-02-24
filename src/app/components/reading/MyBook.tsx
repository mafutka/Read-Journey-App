"use client"

import { useReadingStore } from "@/store/useReadingStore"
import AddReading from "./AddReading"
import Diary from "./Diary"

export default function MyBook() {
  const activeBook = useReadingStore(
    (state) => state.activeBook
  )

  if (!activeBook) {
    return <p>No active book</p>
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        {activeBook.imageUrl && (
          <img
            src={activeBook.imageUrl}
            alt={activeBook.title}
            width={150}
          />
        )}

        <div>
          <h2>{activeBook.title}</h2>
          <p>{activeBook.author}</p>
          <p>Total pages: {activeBook.totalPages}</p>
        </div>
      </div>

      <AddReading />
      <Diary />
    </div>
  )
}
