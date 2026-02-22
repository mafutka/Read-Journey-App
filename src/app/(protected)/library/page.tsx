import Dashboard from "@/app/components/Dashboard/Dashboard"
import AddBook from "@/app/components/Dashboard/AddBook"
import RecommendedPreview from "../../components/RecommendedBooks/RecommendedPreview"


export default function LibraryPage() {
    return (
       <Dashboard>
  <AddBook />
  <RecommendedPreview />
</Dashboard>


    )
}