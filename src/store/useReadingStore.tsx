import { create } from "zustand"

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
  bookId: string | null
  totalPages: number
  currentPage: number
  isReading: boolean
  progress: number
  sessions: ReadingSession[]
  isCompleted: boolean

  setBook: (bookId: string, totalPages: number) => void
  startReadingLocal: (page: number) => void
  finishReadingLocal: (page: number, session: ReadingSession) => void
  deleteSessionLocal: (id: string) => void
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  bookId: null,
  totalPages: 0,
  currentPage: 0,
  isReading: false,
  progress: 0,
  sessions: [],
  isCompleted: false,

  setBook: (bookId, totalPages) =>
    set({ bookId, totalPages }),

  startReadingLocal: (page) =>
    set({
      currentPage: page,
      isReading: true,
    }),

  finishReadingLocal: (page, session) => {
    const total = get().totalPages
    const progress = Math.round((page / total) * 100)

    set((state) => ({
      currentPage: page,
      isReading: false,
      sessions: [...state.sessions, session],
      progress,
      isCompleted: page === total,
    }))
  },

  deleteSessionLocal: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s._id !== id),
    })),
}))
