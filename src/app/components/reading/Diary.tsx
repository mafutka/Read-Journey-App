"use client"

import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"
import css from "./Details.module.css"
import SpeedChart from "./SpeedChart"

export default function Diary() {
  const sessions = useReadingStore((s) => s.sessions)
  const deleteSession = useReadingStore((s) => s.deleteSession)
  const totalPages = useReadingStore((s) => s.totalPages)

  const handleDelete = async (id: string) => {
     console.log("DELETE SESSION:", id)
    try {
      await deleteSession(id)
      toast.success("Session deleted")
    } catch (e) {
      console.error(e)
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
            key={`${s._id}-${s.finishPage}`}
            className={css.diaryContainer}
          >
            <div className={css.dateBlock}>
              <img src="/quadrado.png" alt="quadrado" />
            <p>
              {new Date(s.date).toLocaleDateString()}
            </p>
            </div>
                 <p>
              {percent}%
            </p>


            <p>
             {s.pagesRead}
            </p>

            <p>
             {s.speed} pages per hour
            </p>

       
            <p>
             {s.time} minutes
            </p>

            <button
              className={css.deleteBtn}
              onClick={() => handleDelete(String(s._id))}
            >
              <img src="/trash-2.png" alt="delete diary" />
            </button>
          </div>
        )
      })}
    </div>
  )
}