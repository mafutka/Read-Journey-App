"use client"

import { useReadingStore } from "@/store/useReadingStore"
import { deleteReadingApi } from "../../../services/books/readingApi"
import toast from "react-hot-toast"

export default function Diary() {
  const { sessions, bookId, deleteSession} =
    useReadingStore()

  const handleDelete = async (readingId: string) => {
    try {
      await deleteReadingApi(bookId!, readingId)
      deleteSession(readingId)
      toast.success("Session deleted")
    } catch {
      toast.error("Delete failed")
    }
  } 

  return (
    <div>
      {sessions.map((s) => (
        <div key={s._id}>
          <p>{new Date(s.date).toLocaleDateString()}</p>
          <p>{s.pagesRead} pages</p>
          <button onClick={() => handleDelete(s._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
