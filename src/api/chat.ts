const rawApiUrl = process.env.REACT_APP_API_URL?.trim()

const API_URL = rawApiUrl
  ? rawApiUrl.replace(/\/$/, "")
  : window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : ""

const TOKEN_STORAGE_KEY = "gigachat_token"


const makeUrl = (path: string) => `${API_URL}${path}`

const readToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)?.trim() || ""


export async function setGigaChatToken(token: string) {
  const normalizedToken = token.trim()

  if (!normalizedToken) {
    throw new Error("Токен обязателен")
  }

  localStorage.setItem(TOKEN_STORAGE_KEY, normalizedToken)

  const res = await fetch(makeUrl("/api/token"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: normalizedToken }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || "Не удалось сохранить токен")
  }
}

export async function sendMessage(messages: any[]) {
  const token = readToken()

  if (!token) {
    throw new Error("Токен GigaChat не установлен")
  }

  const res = await fetch(makeUrl("/api/chat"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages, token }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Ошибка ответа")
  }

  return data.choices?.[0]?.message?.content || "Ошибка ответа"
}