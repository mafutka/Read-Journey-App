const BASE = "https://readjourney.b.goit.study"

export type Book = {
  _id: string
  title: string
  author: string
  imageUrl: string
  totalPages: number
}

export async function getRecommendedBooks(page: number, limit = 2) {
  const token = localStorage.getItem("token")

  const res = await fetch(
    `${BASE}/api/books/recommend?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    return
  }

  if (!res.ok) {
    throw new Error("Failed to fetch books")
  }

  return res.json()
}

