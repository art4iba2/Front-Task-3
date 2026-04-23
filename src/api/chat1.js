const GIGACHAT_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const token = typeof req.body?.token === "string" ? req.body.token.trim() : ""
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : []

  if (!token) {
    return res.status(400).json({ error: "Токен GigaChat не установлен" })
  }

  if (messages.length === 0) {
    return res.status(400).json({ error: "Сообщения не переданы" })
  }

  try {
    const response = await fetch(GIGACHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "GigaChat",
        messages,
      }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || data?.message || "Ошибка GigaChat API",
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Ошибка сервера" })
  }
}