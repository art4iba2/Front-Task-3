import { useState } from "react"

export default function InputArea() {

  const [text, setText] = useState("")

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault()

      console.log("send:", text)

      setText("")
    }
  }

  return (
    <div className="input-area">

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Введите сообщение..."
      />

      <button disabled={!text}>
        Отправить
      </button>

      <button>
        Стоп
      </button>

      <button>
        📎
      </button>

    </div>
  )
}