import Dashboard from "@/app/components/Dashboard/Dashboard"
import { Card } from "@/app/components/ui/Card"
import AddBook from "@/app/components/Dashboard/AddBook"
import RecommendedPreview from "../../components/RecommendedBooks/RecommendedPreview"
import MyLibraryBooks from "@/app/components/MyLibraryBooks/MyLibraryBooks"
import css from "../recommended/recommended.module.css"

export default function LibraryPage() {
  return (
    <div className={css.page}>
    <Dashboard className={css.desktopLimit}>
      <AddBook />
      <RecommendedPreview />
    </Dashboard>
     <Dashboard>
        <MyLibraryBooks />
     
    </Dashboard>
    </div>
  )
  
}
