"use client"

import css from "./BookModalLayout.module.css"

type Props = {
  imageUrl: string
  title: string
  author: string
  children: React.ReactNode
}

export default function BookModalLayout({
  imageUrl,
  title,
  author,
  children,
}: Props) {
  return (
    <div className={css.container}>
      <img
        className={css.image}
        src={imageUrl}
        alt={title}
      />

      <div className={css.textBlock}>
        <h2>{title}</h2>
        <p className={css.author}>{author}</p>
      </div>

      {children}
    </div>
  )
}