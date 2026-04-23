import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const app = express()

app.use(cors())
app.use(express.json())

let TOKEN = process.env.GIGACHAT_TOKEN || ""

app.post("/api/token", (req, res) => {
  const token = req.body?.token

  if (typeof token !== "string" || !token.trim()) {
    res.status(400).json({ error: "Токен обязателен" })
    return
  }

  TOKEN = token.trim()
  res.json({ ok: true })
})

app.post("/api/chat", async (req, res) => {
  try {
      if (!TOKEN) {
      res.status(400).json({ error: "Токен GigaChat не установлен" })
      return
    }
    const response = await fetch(
      "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          model: "GigaChat",
          messages: req.body.messages,
        }),
      }
    )

    const data = await response.json()

    res.json(data)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Ошибка сервера" })
  }
})

app.listen(3001, () => console.log("Server running on 3001"))