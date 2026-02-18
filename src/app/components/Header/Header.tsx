'use client'

import { usePathname, useRouter } from "next/navigation"
import { useState,  useEffect } from "react"
import {logoutUser} from "../../../services/auth/authApi"
import Link from "next/link"
import css from "./Header.module.css"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const [userInitial, setUserInitial] = useState("U")

useEffect(() => {
  const name = localStorage.getItem("userName")
  if (name) {
    setUserInitial(name.charAt(0).toUpperCase())
  }
}, [])
  const handleLogout = async () => {
  try {
    await logoutUser()
  } catch (error) {
    alert("Logout error")
  } finally {
    localStorage.clear()
    router.push("/login")
  }
}
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <svg className={css.logoIcon}>
          <use href="/symbol-defs.svg#icon-icon" />
        </svg>
        <p className={css.logoText}> READ JOURNEY</p>
      </div>
      <button className={css.burger} onClick={() => setMenuOpen(!menuOpen)}>
       <svg className={css.burgerIcon}>
          <use href="/symbol-defs.svg#icon-Icon_burger" />
        </svg>
      </button>
       
      <nav className={`${css.navigation} ${menuOpen ? css.open : ""}`}>
        <Link
          href="/recommended"
          className={
            pathname === "/recommended"
              ? css.active
              : css.navItem
          }
        >
          Home
        </Link>

        <Link
          href="/library"
          className={
            pathname === "/library"
              ? css.active
              : css.navItem
          }
        >
          My library
        </Link>
      </nav>
      <div className={css.userBar}>
        <div className={css.avatar}>{userInitial}</div>

        <button onClick={handleLogout} className={css.logout}>
          Log out
        </button>
      </div>
    </div>
  )
}
