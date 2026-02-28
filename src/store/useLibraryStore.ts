import { create } from "zustand"
import {
  getUserBooks,
  addBook,            
  addBookToLibrary,     
  deleteBook,
  UserBook,
} from "@/services/books/booksApi"
import toast from "react-hot-toast"

type AddCustomBookData = {
  title: string
  author: string
  totalPages: number
}

type LibraryState = {
  books: UserBook[]
  loading: boolean

  fetchBooks: () => Promise<void>

  addBookById: (bookId: string) => Promise<void>

  addCustomBook: (data: AddCustomBookData) => Promise<void>

  removeBook: (id: string) => Promise<void>
}

export const useLibraryStore = create<LibraryState>((set) => ({
  books: [],
  loading: false,

  fetchBooks: async () => {
    set({ loading: true })
    try {
      const data = await getUserBooks()
      set({ books: data })
    } catch (e) {
      console.error("Fetch books error:", e)
    } finally {
      set({ loading: false })
    }
  },

  addBookById: async (bookId) => {
    try {
      const newBook = await addBookToLibrary(bookId)

      set((state) => ({
        books: [...state.books, newBook],
      }))
      toast.success("Book added successfully!")
    } catch {
     toast.error("Something went wrong")
    }
  },

  addCustomBook: async (data) => {
    try {
      const newBook = await addBook(data)

      set((state) => ({
        books: [...state.books, newBook],
      }))
      toast.success("Book added successfully!")
    } catch (e) {
      toast.error("Something went wrong")
    }
  },

  removeBook: async (id) => {
    try {
      await deleteBook(id)

      set((state) => ({
        books: state.books.filter((b) => b._id !== id),
      }))
    } catch (e) {
       console.error("Delete error:", e)
  toast.error("Delete failed")
    }
  },
}))
