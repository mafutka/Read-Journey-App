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
  startReading: (page: number) => void
  stopReading: (page: number, session: ReadingSession) => void
  deleteSession: (id: string) => void
  calculateProgress: () => void
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

  startReading: (page) =>
    set({
      currentPage: page,
      isReading: true,
    }),

  stopReading: (page, session) => {
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

  deleteSession: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s._id !== id),
    })),

  calculateProgress: () => {
    const { currentPage, totalPages } = get()
    const progress = Math.round((currentPage / totalPages) * 100)
    set({ progress })
  },
}))
