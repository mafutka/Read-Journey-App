const BASE = "https://readjourney.b.goit.study"

export type Book = {
  _id: string
  title: string
  author: string
  imageUrl: string
  totalPages: number
}
export type UserBook = {
  _id: string
  title: string
  author: string
  imageUrl: string
  totalPages: number
  status: "unread" | "in-progress" | "done"
}

export type AddBookProps = {
  title: string
  author: string
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

export async function addBook(data: AddBookProps) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${BASE}/api/books/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Failed")

  return res.json()
}

export async function getUserBooks(): Promise<UserBook[]> {
  const token = localStorage.getItem("token")

  const res = await fetch(`${BASE}/api/books/own`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    return []
  }

  if (!res.ok) {
    throw new Error("Failed to fetch user books")
  }

  const data = await res.json()
  return data
}
export async function deleteBook(id: string) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${BASE}/api/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to delete book")
  }

  return res.json()
}


