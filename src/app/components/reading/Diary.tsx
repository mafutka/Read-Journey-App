"use client"

import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"

export default function Diary() {
  const sessions = useReadingStore((s) => s.sessions)
  const deleteSession = useReadingStore((s) => s.deleteSession)
  const totalPages = useReadingStore((s) => s.totalPages)

  const handleDelete = async (id: string) => {
    try {
      await deleteSession(id)
      toast.success("Session deleted")
    } catch {
      toast.error("Delete failed")
    }
  }

  if (!sessions.length) {
    return <p style={{ marginTop: 20 }}>No reading sessions yet</p>
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
      {sessions.map((s) => {
        const percent = Math.round(
          (s.pagesRead / totalPages) * 100
        )

        return (
          <div
            key={s._id}
            style={{
              border: "1px solid #eee",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <p>
              <strong>Date:</strong>{" "}
              {new Date(s.date).toLocaleDateString()}
            </p>

            <p>
              <strong>Pages read:</strong> {s.pagesRead}
            </p>

            <p>
              <strong>Speed:</strong> {s.speed} pages/hour
            </p>

            <p>
              <strong>Progress:</strong> {percent}%
            </p>

            <button
              onClick={() => handleDelete(s._id)}
              style={{ marginTop: 8 }}
            >
              Delete
            </button>
          </div>
        )
      })}
    </div>
  )
}