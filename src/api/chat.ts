const rawApiUrl = process.env.REACT_APP_API_URL?.trim()

const API_URL = rawApiUrl
  ? rawApiUrl.replace(/\/$/, "")
  : window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : ""

const makeUrl = (path: string) => `${API_URL}${path}`

export async function setGigaChatToken(token: string) {
  const res = await fetch(makeUrl("/api/token"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || "Не удалось сохранить токен")
  }
}


export async function sendMessage(messages: any[]) {
  const res = await fetch(makeUrl("/api/chat"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Ошибка ответа")
  }

  return data.choices?.[0]?.message?.content || "Ошибка ответа"
}