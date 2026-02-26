import { useAuthStore } from "@/store/useAuthStore";

const BASE = "https://readjourney.b.goit.study";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Register failed");
  }

  return result;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE}/api/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token")

  const response = await fetch(`${BASE}/api/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Unauthorized")
  }

  return response.json()
}

export async function logoutUser() {
  const token = localStorage.getItem("token")

  try {
    await fetch(`${BASE}/api/users/signout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error("Logout request failed")
  }

  localStorage.removeItem("token")
  useAuthStore.getState().logout()
}

