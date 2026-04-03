import {useState} from "react";

interface Props {
  onSend: (text: string) => void
  isLoading: boolean
  onStop?: () => void
}

export default function InputArea({ onSend, isLoading, onStop }: Props) {
  const [text, setText] = useState("")

  const send = () => {
    if (!text.trim()) return

    onSend(text)
    setText("")
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="input-area">

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Введите сообщение..."
        disabled={isLoading}
      />

      {isLoading ? (
        <button onClick={onStop}>
          Стоп
        </button>
      ) : (
        <button onClick={send} disabled={!text.trim()}>
          Отправить
        </button>
      )}

    </div>
  )
}