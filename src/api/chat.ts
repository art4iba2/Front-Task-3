const API_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") || ""

console.log("API_URL:", API_URL)
const makeUrl = (path: string) => `${API_URL}${path}`

let currentToken = ""

try {
  const saved = localStorage.getItem("gigachat_token")
  if (saved) currentToken = saved
} catch {}

async function setGigaChatToken(token: string) {
  console.log("setGigaChatToken called with:", token)
  const normalizedToken = token.trim()

  if (!normalizedToken) {
    throw new Error("Токен обязателен")
  }

  currentToken = normalizedToken

  try {
    localStorage.setItem("gigachat_token", normalizedToken)
  } catch {}
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