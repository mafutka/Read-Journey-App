import axios from "axios"

export const startReadingApi = async (page: number,) => {
  const { data } = await axios.post("/books/reading/start", {
    page,
    
  })
  return data
}

export const finishReadingApi = async (page: number,) => {
  const { data } = await axios.post("/books/reading/finish", {
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
