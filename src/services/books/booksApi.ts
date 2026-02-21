export type Book = {
  _id: string
  title: string
  author: string
  imageUrl: string
  totalPages: number
}

type RecommendResponse = {
  results: Book[]
  totalPages: number
  page: number
  perPage: number
}

export async function getRecommendedBooks(
  page: number,
  limit: number = 2
): Promise<RecommendResponse> {
  const res = await fetch(
    `/books/recommend?page=${page}&limit=${limit}`
  )

  if (!res.ok) {
    throw new Error("Failed to fetch books")
  }

  return res.json()
}
