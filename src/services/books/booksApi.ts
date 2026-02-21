const BASE = "https://readjourney.b.goit.study"

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
    const token = localStorage.getItem("token")
  const res = await fetch(
    `${BASE}/api/books/recommend?page=${page}&limit=${limit}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch books")
  }

  return res.json()
}
