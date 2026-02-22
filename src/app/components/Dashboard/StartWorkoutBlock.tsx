import Link from "next/link"
import css from "./Dashboard.module.css"

export default function StartWorkoutBlock() {
  return (
    <div className={css.startBlock}>
      <h2>Start your workout</h2>

      <div className={css.step}>
        <div className={css.circle}>1</div>
        <p>
          Create a personal library:
          <span className={css.gray}>
            {" "}
            add the books you intend to read to it.
          </span>
        </p>
      </div>

      <div className={css.step}>
        <div className={css.circle}>2</div>
        <p>
          Create your first workout:
          <span className={css.gray}>
            {" "}
            define a goal, choose a period, start training.
          </span>
        </p>
      </div>

      <div className={css.bottom}>
        <Link href="/library" className={css.link}>
          My library
        </Link>
        <Link href="/library">
          <svg className={css.arrowIcon}>
            <use href="/symbol-defs.svg#icon-log-in" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
