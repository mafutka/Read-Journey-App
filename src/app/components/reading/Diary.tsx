"use client"

import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"
import css from "./Details.module.css"

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
        const percent = Math.round((s.finishPage / totalPages) * 100)

        return (
          <div
            key={s._id}
            className={css.diaryContainer}
            // style={{
            //   border: "1px solid #eee",
            //   padding: 16,
            //   borderRadius: 12,
            // }}
          >
            <p>
              <strong>Date:</strong> {new Date(s.date).toLocaleDateString()}
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
            <p>
              <strong>Time:</strong> {s.time} min
            </p>

            <button className={css.deleteBtn}
              onClick={() => handleDelete(s._id)}
            >
              <img src="/trash-2.png" alt="delete diary" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
