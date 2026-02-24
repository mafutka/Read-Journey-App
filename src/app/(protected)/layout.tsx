"use client"

import Header from "../components/Header/Header"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import css from "./protected.module.css"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
   const { token, isInitialized } = useAuthStore()

  useEffect(() => {
    if (isInitialized && !token) {
      router.replace("/login")
    }
  }, [token, isInitialized, router])

  if (!isInitialized) return null
  if (!token) return null

  return (
    <div className={css.container}>
      <Header />
      <main className={css.main}>{children}</main>
    </div>
  )
}