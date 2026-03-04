import axios from "axios"

export const startReadingApi = async (
  id: string,
  page: number
) => {
  const { data } = await axios.post("/books/reading/start", {
    id,
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
  id: string,
  readingId: string
) => {
  await axios.delete(
    `/books/reading?bookId=${id}&readingId=${readingId}`
  )
}
