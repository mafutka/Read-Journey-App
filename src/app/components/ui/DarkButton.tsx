"use client"

import React from "react"
import css from "./DarkButton.module.css"

type DarkButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
}

export default function DarkButton({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: DarkButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${css.button} ${className}`}
    >
      {children}
    </button>
  )
}
