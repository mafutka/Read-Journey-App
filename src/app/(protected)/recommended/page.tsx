import Dashboard from "@/app/components/Dashboard/Dashboard"
import Filters from "@/app/components/Dashboard/Filters"
import Recommended from "../../components/RecommendedBooks/Recommended"
import StartWorkoutBlock from "@/app/components/Dashboard/StartWorkoutBlock"
import css from "./recommended.module.css"

export default function RecommendedPage() {
  return (
    <div className={css.page}>
      <Dashboard className={css.desktopLimit}>
        <Filters />
        <StartWorkoutBlock />
      </Dashboard>
      <Recommended />
    </div>
  )
}
