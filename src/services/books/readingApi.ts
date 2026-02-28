import axios from "axios"

export const startReadingApi = async (
  bookId: string,
  page: number
) => {
  const { data } = await axios.post("/books/reading/start", {
    bookId,
    page,
  })
  return data
}

export const finishReadingApi = async (
  bookId: string,
  page: number
) => {
  const { data } = await axios.post("/books/reading/finish", {
    bookId,
    page,
  })
  return data
}

export const deleteReadingApi = async (
  bookId: string,
  readingId: string
) => {
  await axios.delete(
    `/books/reading?bookId=${bookId}&readingId=${readingId}`
  )
}
