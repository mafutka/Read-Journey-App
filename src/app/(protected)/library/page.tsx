import Dashboard from "@/app/components/Dashboard/Dashboard"
import { Card } from "@/app/components/ui/Card"
import AddBook from "@/app/components/Dashboard/AddBook"
import RecommendedPreview from "../../components/RecommendedBooks/RecommendedPreview"
import MyLibraryBooks from "@/app/components/MyLibraryBooks/MyLibraryBooks"

export default function LibraryPage() {
  return (
    <>
    <Dashboard>
      <AddBook />
      <RecommendedPreview />
     
    </Dashboard>
     <Dashboard>
        <MyLibraryBooks />
     
    </Dashboard>
    </>
  )
  
}
