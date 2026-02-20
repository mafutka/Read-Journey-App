"use client"

import Header from "../components/Header/Header"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import css from "./protected.module.css"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [])

  return (
    <div className={css.container}>
      <Header />
      <main className={css.main}>{children}</main>
    </div>
  )
}