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
  startPage: number | string
  finishPage?: number | string
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

const mapSessions = (progress: BackendProgress[]): ReadingSession[] =>
  progress
    .filter((p) => p.finishPage !== undefined)
    .map((p) => {
      const start = Number(p.startPage)
      const finish = Number(p.finishPage)

      return {
        _id: p.startReading,
        startPage: start,
        finishPage: finish,
        pagesRead: Math.max(finish - start + 1, 0),
        date: p.finishReading!,
        speed: p.speed,
      }
    })

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
      sessions: [],
      isReading: false,
      currentPage: 0,
    }),

  hydrateFromBook: (book) => {
    const activeSession = book.progress.find((p) => !p.finishPage)

    const finishedSessions = mapSessions(book.progress)

    const lastFinished = book.progress
      .filter((p) => p.finishPage !== undefined)
      .sort((a, b) => Number(b.finishPage) - Number(a.finishPage))[0]

    set({
      bookId: book._id,
      totalPages: book.totalPages,
      sessions: finishedSessions,
      isReading: !!activeSession,
      currentPage: activeSession
        ? Number(activeSession.startPage)
        : Number(lastFinished?.finishPage ?? 0),
    })
  },

  startReading: async (page) => {
    const { bookId } = get()
    if (!bookId) return

    const updatedBook: BackendBookResponse = await startReadingApi(bookId, page)

    const activeSession = updatedBook.progress.find((p) => !p.finishPage)

    set({
      isReading: true,
      currentPage: activeSession ? Number(activeSession.startPage) : page,
      sessions: mapSessions(updatedBook.progress),
    })
  },

  finishReading: async (page) => {
    const { bookId } = get()
    if (!bookId) return

    const updatedBook: BackendBookResponse = await finishReadingApi(
      bookId,
      page,
    )

    set({
      isReading: false,
      currentPage: page,
      sessions: mapSessions(updatedBook.progress),
    })
  },

  deleteSession: async (readingId) => {
    const { bookId } = get()
    if (!bookId) return

    await deleteReadingApi(bookId, readingId)

    set((state) => ({
      sessions: state.sessions.filter((s) => s._id !== readingId),
    }))
  },
}))
