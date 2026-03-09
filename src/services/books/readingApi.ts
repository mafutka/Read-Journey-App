import axios from "../auth/axiosInstance"

export const startReadingApi = async (
  bookId: string,
  page: number
) => {
  const { data } = await axios.post("/books/reading/start", {
    id: bookId,
    page,
  })

  return data
}

export const finishReadingApi = async (
  id: string,
  page: number
) => {
  const { data } = await axios.post("/books/reading/finish", {
    id,
    page,
  })

  return data
}

export const deleteReadingApi = async (
  bookId: string,
  readingId: string
) => {
  const { data } = await axios.delete(
    `/books/reading?bookId=${bookId}&readingId=${readingId}`
  )

  return data
}