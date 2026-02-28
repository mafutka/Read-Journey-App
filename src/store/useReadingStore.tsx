import { create } from "zustand"
import { UserBook } from "@/services/books/booksApi"
import { startReadingApi, finishReadingApi, deleteReadingApi } from "@/services/books/readingApi"


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
  progress: number
  sessions: ReadingSession[]
  isCompleted: boolean

  setActiveBook: (book: UserBook) => void
  setBook: (bookId: string, totalPages: number) => void

  startReading: (page: number) => Promise<void>
  finishReading: (page: number) => Promise<void>
  deleteSession: (readingId: string) => Promise<void>
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  activeBook: null,
  bookId: null,
  totalPages: 0,
  currentPage: 0,
  isReading: false,
  progress: 0,
  sessions: [],
  isCompleted: false,

  setActiveBook: (book) =>
    set({
      activeBook: book,
      bookId: book._id,
      totalPages: book.totalPages,
    }),

  setBook: (bookId, totalPages) =>
    set({ bookId, totalPages }),

  startReading: async (page) => {
    const { bookId } = get()
    if (!bookId) return

    try {
      await startReadingApi(bookId, page)

      set({
        currentPage: page,
        isReading: true,
      })
    } catch (e) {
      throw e
    }
  },

  finishReading: async (page) => {
    const { bookId, totalPages } = get()
    if (!bookId) return

    try {
      const session = await finishReadingApi(bookId, page)

      const progress = Math.round((page / totalPages) * 100)

      set((state) => ({
        currentPage: page,
        isReading: false,
        sessions: [...state.sessions, session],
        progress,
        isCompleted: page === totalPages,
      }))
    } catch (e) {
      throw e
    }
  },

  deleteSession: async (readingId) => {
    const { bookId } = get()
    if (!bookId) return

    try {
      await deleteReadingApi(bookId, readingId)

      set((state) => ({
        sessions: state.sessions.filter(
          (s) => s._id !== readingId
        ),
      }))
    } catch (e) {
      throw e
    }
  },
}))