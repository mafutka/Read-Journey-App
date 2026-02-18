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

export async function logoutUser() {
  const token = localStorage.getItem("token")

  const response = await fetch(
    "https://readjourney.b.goit.study/api/users/signout",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const result = await response.json()
    throw new Error(result.message || "Logout failed")
  }
}
