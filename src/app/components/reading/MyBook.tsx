"use client"

import { useReadingStore } from "@/store/useReadingStore"
import AddReading from "./AddReading"
import Details from "./Details"

export default function MyBook() {
  const { activeBook, sessions } = useReadingStore()

  if (!activeBook) return <p>No active book</p>

  const hasStartedReading = sessions.length > 0

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", gap: 20 }}>
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

      {!hasStartedReading ? (
        <div style={{ marginTop: 24 }}>
          <h3>Progress</h3>
          <p>
            Here you will see when and how much you read.
            To record, click on the red button above.
          </p>
        </div>
      ) : (
        <Details />
      )}
    </div>
  )
}