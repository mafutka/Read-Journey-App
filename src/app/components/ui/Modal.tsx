"use client"

import { useEffect } from "react"
import css from "./Modal.module.css"

type Props = {
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)

    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.closeBtn} onClick={onClose}>
       <svg className={css.closeBtnIcon}>
          <use href="/symbol-defs.svg#icon-x" />
        </svg>
      </button>

        {children}
      </div>
    </div>
  )
}