process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { messages, token } = req.body

    if (!token) {
      return res.status(400).json({ error: "Токен не передан" })
    }

    const response = await fetch(
      "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: "GigaChat",
          messages,
        }),
      }
    )

    const data = await response.json()

    return res.status(response.status).json(data)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: "Ошибка сервера" })
  }
}