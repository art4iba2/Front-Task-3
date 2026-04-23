const API_URL = "http://localhost:3001"

export async function setGigaChatToken(token: string) {
  const res = await fetch(`${API_URL}/api/token`, {
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
  const res = await fetch(`${API_URL}/api/chat`, {
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