"use client"

import { useState } from "react"
import { useLibraryStore } from "@/store/useLibraryStore"
import DarkButton from "@/app/components/ui/DarkButton"
import TextInput from "../ui/TextInput"
import css from "./Dashboard.module.css"

export default function AddBook() {
  const { addCustomBook } = useLibraryStore()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!title || !author || !pages) return

      await addCustomBook({
        title,
        author,
        totalPages: Number(pages),
      })

      // очищаємо форму
      setTitle("")
      setAuthor("")
      setPages("")
    }

  return (
    <form onSubmit={handleSubmit} className={css.filters}>
      <div className={css.top}>
        <p className={css.filtersTitle}>Add book:</p>

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

        <TextInput
          type="number"
          label="Number of pages:"
          placeholder="Enter number"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className={css.input}
        />
      </div>

      <DarkButton type="submit">
        Add book
      </DarkButton>
    </form>
  )
}
