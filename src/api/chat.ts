const rawApiUrl = process.env.REACT_APP_API_URL?.trim()

const API_URL = rawApiUrl
  ? rawApiUrl.replace(/\/$/, "")
  : window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : ""

const makeUrl = (path: string) => `${API_URL}${path}`

let currentToken = ""

async function setGigaChatToken(token: string) {
  const normalizedToken = token.trim()

  if (!normalizedToken) {
    throw new Error("Токен обязателен")
  }

  currentToken = normalizedToken

  try {
    localStorage.removeItem("gigachat_token")
  } catch {
    // ignore
  }
}

async function sendMessage(messages: any[]) {
  if (!currentToken) {
    throw new Error("Токен GigaChat не установлен")
  }
  const res = await fetch(makeUrl("/api/chat"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages, token: currentToken }),
  })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || "Ошибка ответа")
  }

  return data.choices?.[0]?.message?.content || "Ошибка ответа"
}

const chatApi = {
  setGigaChatToken,
  sendMessage,
}

export default chatApi
export { setGigaChatToken, sendMessage }