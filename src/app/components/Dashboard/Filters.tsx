"use client"

import { useState } from "react"
import DarkButton from "@/app/components/ui/DarkButton"
import css from "./Dashboard.module.css"

export default function Filters() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Filters:", { title, author })

    // пізніше тут буде передача даних наверх
  }

  return (
    <form onSubmit={handleSubmit} className={css.filters}>
      <p className={css.filtersTitle}>Filters:</p>

      <input
        type="text"
        placeholder="Enter text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={css.input}
      />

      <input
        type="text"
        placeholder="Enter text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={css.input}
      />

      <DarkButton type="submit">To apply</DarkButton>
    </form>
  )
}
