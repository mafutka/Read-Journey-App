import React from "react"
import css from "./Input.module.css"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function TextInput({
  label,
  className,
  ...props
}: Props) {
  return (
    <div className={css.wrapper}>
      {label && <span className={css.label}>{label}</span>}

      <input
        className={`${css.input} ${className ?? ""}`}
        {...props}
      />
    </div>
  )
}