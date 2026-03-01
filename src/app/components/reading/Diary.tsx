"use client"

import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"

export default function Diary() {
  const { sessions, deleteSession } = useReadingStore()

  const handleDelete = async (id: string) => {
    try {
      await deleteSession(id)
      toast.success("Session deleted")
    } catch {
      toast.error("Delete failed")
    }
  }

  return (
    <div
      style={{
        maxHeight: 400,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginTop: 20,
      }}
    >
      {sessions.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #eee",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <p>{new Date(s.date).toLocaleDateString()}</p>
          <p>{s.pagesRead} pages</p>
          <p>{s.speed} pages/hour</p>
          <p>{s.readingTime} min</p>

          <button onClick={() => handleDelete(s._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}