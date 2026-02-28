"use client"

import { useState } from "react"
import { useReadingStore } from "@/store/useReadingStore"
import {
  startReadingApi,
  finishReadingApi,
} from "../../../services/books/readingApi"
import toast from "react-hot-toast"

export default function AddReading() {
  const [page, setPage] = useState("")
  const { isReading, totalPages, startReadingLocal, finishReadingLocal } =
    useReadingStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const pageNumber = Number(page)

    if (!pageNumber || pageNumber < 1 || pageNumber > totalPages) {
      toast.error("Invalid page number")
      return
    }

    try {
      if (!isReading) {
        await startReadingApi(pageNumber)
        startReadingLocal(pageNumber)
        toast.success("Reading started")
      } else {
        const session = await finishReadingApi(pageNumber)

        finishReadingLocal(pageNumber, session)

        if (session.finishPage === totalPages) {
          toast.success("🎉 Book completed!")
        } else {
          toast.success("Reading session saved")
        }
      }

      setPage("")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Error")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <Input
        type="number"
        value={page}
        onChange={(e) => setPage(e.target.value)}
        placeholder="Page number"
      /> */}

      <button type="submit">{isReading ? "To stop" : "To start"}</button>
    </form>
  )
}
