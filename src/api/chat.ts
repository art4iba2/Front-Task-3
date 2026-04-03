export async function sendMessage(messages: any[]) {
  const res = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  })

  const data = await res.json()

  return data.choices?.[0]?.message?.content || "Ошибка ответа"
}