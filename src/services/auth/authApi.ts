const BASE_URL = "https://readjourney.b.goit.study";

export const signup = (data: {
  name: string;
  email: string;
  password: string;
}) =>
  fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const signin = (data: {
  email: string;
  password: string;
}) =>
  fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getCurrentUser = (token: string) =>
  fetch(`${BASE_URL}/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());