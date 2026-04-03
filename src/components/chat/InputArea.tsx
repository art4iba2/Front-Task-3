import { useState } from "react"

  interface Props {
  onSend: (text: string) => void
  isLoading: boolean
}

export default function InputArea({ onSend, isLoading }: Props) {

  const [text, setText] = useState("")

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const send = () => {
  if (!text.trim()) return

  onSend(text)
  setText("")
}


  return (
    <div className="input-area">

    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKey}
      disabled={isLoading}
    />

    <button onClick={send} disabled={!text || isLoading}>
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