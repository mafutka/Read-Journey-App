import { create } from "zustand"
import { persist } from "zustand/middleware"
import { UserBook } from "@/services/books/booksApi"
import {
  startReadingApi,
  finishReadingApi,
  deleteReadingApi,
} from "@/services/books/readingApi"

interface ReadingSession {
  _id: string
  startPage: number
  finishPage: number
  pagesRead: number
  readingTime: number
  date: string
  speed: number
}

interface ReadingState {
  activeBook: UserBook | null
  bookId: string | null
  totalPages: number
  currentPage: number
  isReading: boolean
  sessions: ReadingSession[]

  setActiveBook: (book: UserBook) => void
  startReading: (page: number) => Promise<void>
  finishReading: (page: number) => Promise<void>
  deleteSession: (readingId: string) => Promise<void>
}

interface BackendProgress {
  startPage: number
  finishPage?: number
  startReading: string
  finishReading?: string
  speed: number
}

interface BackendBookResponse {
  _id: string
  totalPages: number
  progress: BackendProgress[]
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      activeBook: null,
      bookId: null,
      totalPages: 0,
      currentPage: 0,
      isReading: false,
      sessions: [],

      setActiveBook: (book) =>
        set({
          activeBook: book,
          bookId: book._id,
          totalPages: book.totalPages,
        }),

      startReading: async (page) => {
        const { bookId } = get()
        if (!bookId) return

        await startReadingApi(bookId, page)

        set({
          currentPage: page,
          isReading: true,
        })
      },

      finishReading: async (page) => {
        const { bookId } = get()
        if (!bookId) return

        const updatedBook: BackendBookResponse =
          await finishReadingApi(bookId, page)

        const sessions: ReadingSession[] =
          updatedBook.progress
            .filter((p) => p.finishPage)
            .map((p) => ({
              _id: p.startReading,
              startPage: p.startPage,
              finishPage: p.finishPage!,
              pagesRead: p.finishPage! - p.startPage,
              readingTime: 0,
              date: p.finishReading!,
              speed: p.speed,
            }))

        set({
          isReading: false,
          sessions,
        })
      },

      deleteSession: async (readingId) => {
        const { bookId } = get()
        if (!bookId) return

        await deleteReadingApi(bookId, readingId)

        set((state) => ({
          sessions: state.sessions.filter(
            (s) => s._id !== readingId
          ),
        }))
      },
    }),
    {
      name: "reading-storage",
    }
  )
)