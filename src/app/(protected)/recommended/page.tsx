import Dashboard from "@/app/components/Dashboard/Dashboard"
import Filters from "@/app/components/Dashboard/Filters"
import Recommended from "../../components/RecommendedBooks/Recommended"
import StartWorkoutBlock from "@/app/components/Dashboard/StartWorkoutBlock"

export default function RecommendedPage() {
  return (
    <>
      <Dashboard>
        <Filters />
        <StartWorkoutBlock />
      </Dashboard>
      <Recommended />
    </>
  )
}
