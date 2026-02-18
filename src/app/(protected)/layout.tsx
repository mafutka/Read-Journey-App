"use client"

import Header from "../components/Header/Header"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

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
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}