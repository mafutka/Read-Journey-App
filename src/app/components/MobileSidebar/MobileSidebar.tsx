"use client"

import Link from "next/link"
import DarkButton from "../ui/DarkButton"
import css from "./MobileSidebar.module.css"

type Props = {
  isOpen: boolean
  onClose: () => void
  pathname: string
  userInitial: string
  onLogout: () => void
}

export default function MobileSidebar({
  isOpen,
  onClose,
  pathname,
  onLogout,
}: Props) {
  return (
    <div className={`${css.sidebar} ${isOpen ? css.open : ""}`}>
      <button className={css.closeBtn} onClick={onClose}>
       <svg className={css.closeBtnIcon}>
          <use href="/symbol-defs.svg#icon-x" />
        </svg>
      </button>

      <nav className={css.navigation}>
        <Link
          href="/recommended"
          className={pathname === "/recommended" ? css.active : css.navItem}
          onClick={onClose}
        >
          Home
        </Link>

        <Link
          href="/library"
          className={pathname === "/library" ? css.active : css.navItem}
          onClick={onClose}
        >
          My library
        </Link>
      </nav>

      <div className={css.bottom}>
        <DarkButton onClick={onLogout}>
          Log out
        </DarkButton>
      </div>
        
      
    </div>
  )
}