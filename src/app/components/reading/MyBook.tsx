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
      <AddReading />

      {!hasStartedReading ? (
        <p>No reading sessions yet</p>
      ) : (
        <Details />
      )}
    </div>
  )
}