import { create } from "zustand"
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
  date: string
  speed: number
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

interface ReadingState {
  activeBook: UserBook | null
  bookId: string | null
  totalPages: number
  isReading: boolean
  currentPage: number
  sessions: ReadingSession[]

  setActiveBook: (book: UserBook) => void
  hydrateFromBook: (book: BackendBookResponse) => void

  startReading: (page: number) => Promise<void>
  finishReading: (page: number) => Promise<void>

  deleteSession: (readingId: string) => Promise<void>
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  activeBook: null,
  bookId: null,
  totalPages: 0,
  isReading: false,
  currentPage: 0,
  sessions: [],

  setActiveBook: (book) =>
  set({
    activeBook: book,
    bookId: book._id,
    totalPages: book.totalPages,
    isReading: false,
    sessions: [],
  }),
  hydrateFromBook: (book) => {
    const activeSession = book.progress.find(
      (p) => !p.finishPage
    )

const sessions: ReadingSession[] = book.progress
  .filter((p) => p.finishPage)
  .map((p) => ({
    _id: p.startReading,
    startPage: p.startPage,
    finishPage: p.finishPage!,
    pagesRead: p.finishPage! - p.startPage + 1,
    date: p.finishReading!,
    speed: p.speed,
  }))

    set({
      bookId: book._id,
      totalPages: book.totalPages,
      sessions,
      isReading: !!activeSession,
      currentPage: activeSession?.startPage ?? 0,
    })
  },

startReading: async (page) => {
  const { bookId } = get()
  if (!bookId) return

  const book = await startReadingApi(bookId, page)

  set({
    isReading: true,
    currentPage: page,
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
          pagesRead: p.finishPage! - p.startPage + 1,
          date: p.finishReading!,
          speed: p.speed,
        }))

    set({
      isReading: false,
      sessions,
      currentPage: page,
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
}))