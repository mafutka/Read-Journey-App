import { useReadingStore } from "@/store/useReadingStore"
import toast from "react-hot-toast"
import css from "./Details.module.css"

export default function Diary() {
  const sessions = useReadingStore((s) => s.sessions)
  const totalPages = useReadingStore((s) => s.totalPages)
  const deleteSessionUI = useReadingStore((s) => s.deleteSessionUI)

  if (!sessions.length) {
    return <p style={{ marginTop: 20 }}>No reading sessions yet</p>
  }

  return (
    <div className={css.diaryContainer}>
      {[...sessions].reverse().map((s, index: number) => {
        const percent = Math.round(
          ((s.finishPage - s.startPage + 1) / totalPages) * 100,
        )

        return (
          <div key={`${s._id}-${s.finishPage}`} className={css.session}>
            <div className={css.upper}>
              <div
                className={`${css.dateBlock} ${index === 0 ? css.dateBlockActive : css.dateBlockInactive}`}
              >
                <img
                  className={css.quadrado}
                  src="/quadrado.png"
                  alt="quadrado"
                />
                <h3>
                  {new Date(s.date)
                    .toLocaleDateString("uk-UA")
                    .replace(/\//g, ".")}
                </h3>
              </div>
              <p className={css.pages}>{s.pagesRead} pages</p>
            </div>
            <div className={css.bottom}>
              <div className={css.percents}>
                <h2>{percent}%</h2>
                <p className={css.pages}>{s.time} minutes</p>
              </div>
              <div className={css.chart}>
                <div className={css.deleteCharts}>
                  <img
                    src="/speedchart.png"
                    alt="speedchart"
                    className={css.speedChart}
                  />

                  <button
                    className={css.deleteBtn}
                    onClick={() => {
                      deleteSessionUI(s._id)
                      toast.success("Progress deleted")
                    }}
                  >
                    <img src="/trash-2.png" alt="delete diary" />
                  </button>
                </div>
                <p className={css.pages}>{s.speed} pages per hour</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
