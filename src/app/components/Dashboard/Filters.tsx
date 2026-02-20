"use client"

import { useState } from "react"
import DarkButton from "@/app/components/ui/DarkButton"
import css from "./Dashboard.module.css"
import TextInput from "../ui/TextInput"

export default function Filters() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault()
}

  return (
    <form onSubmit={handleSubmit} className={css.filters}>
        <div className={css.top}>
      <p className={css.filtersTitle}>Filters:</p>

      <TextInput
        type="text"
        label="Book title:"
        placeholder="Enter text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={css.input}
      />

      <TextInput
        type="text"
        label="The author:"
        placeholder="Enter text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={css.input}
      />
      </div>

      <DarkButton type="submit">To apply</DarkButton>
    </form>
  )
}
