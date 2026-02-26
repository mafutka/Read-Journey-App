"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { logoutUser } from "../../../services/auth/authApi"
import { useAuthStore } from "@/store/useAuthStore" 
import MobileSidebar from "../MobileSidebar/MobileSidebar"
import DarkButton from "../ui/DarkButton"
import Link from "next/link"
import css from "./Header.module.css"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const userInitial =
  typeof window !== "undefined"
    ? localStorage.getItem("userName")?.charAt(0).toUpperCase() || "U"
    : "U"
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    await logoutUser()
    logout()
    router.push("/login")
  }
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <svg className={css.logoIcon}>
          <use href="/symbol-defs.svg#icon-icon" />
        </svg>
        <p className={css.logoText}> READ JOURNEY</p>
      </div>

      {/* Десктоп навігація */}
      <nav className={css.navigationDesktop}>
        <Link
          href="/recommended"
          className={pathname === "/recommended" ? css.active : css.navItem}
        >
          Home
        </Link>
        <Link
          href="/library"
          className={pathname === "/library" ? css.active : css.navItem}
        >
          My library
        </Link>
      </nav>

      <div className={css.userBar}>
        <div className={css.avatar}>{userInitial}</div>
        <DarkButton className={css.button} onClick={handleLogout}>Log out</DarkButton>
      </div>
      <div className={css.mobileRight}>
        <div className={css.avatar}>{userInitial}</div>
      <button className={css.burger} onClick={() => setMenuOpen(!menuOpen)}>
        <svg className={css.burgerIcon}>
          <use href="/symbol-defs.svg#icon-Icon_burger" />
        </svg>
      </button>
      </div>
      <MobileSidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        userInitial={userInitial}
        onLogout={handleLogout}
      />
    </div>
  )
}
