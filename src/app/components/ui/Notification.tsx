"use client"

import Modal from "../ui/Modal"
import css from "./Notification.module.css"

type Props = {
  onClose: () => void
}

export default function SuccessModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className={css.wrapper}>
        <button className={css.close} onClick={onClose}>
          <svg className={css.closeBtnIcon}>
            <use href="/symbol-defs.svg#icon-x" />
          </svg>
        </button>

        <div className={css.emoji}>
          <img src="/like_small.png" alt="like" />
        </div>

        <h2 className={css.notificationHeading}>Good job</h2>

        <p className={css.notificationText}>
          Your book is now in the library! The joy knows no bounds and now you
          can start your training
        </p>
      </div>
    </Modal>
  )
}
