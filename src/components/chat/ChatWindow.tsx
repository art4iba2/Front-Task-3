import MessageList from "./MessageList"
import InputArea from "./InputArea"
import SettingsPanel from "../settings/SettingsPanel"
import { Message } from '../types/message'
import { useState, useRef, useEffect } from "react"

interface Props{
  toggleSidebar: () => void
}

export default function ChatWindow({toggleSidebar}:Props) {

  const [openSettings, setOpenSettings] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isLoading])

  const sendMessage = (text: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user" as const,
    content: text,
    timestamp: new Date().toLocaleTimeString(),
  }

  setMessages(prev => [...prev, userMessage])
  setIsLoading(true)

  setTimeout(() => {
    const botMessage = {
      id: Date.now().toString(),
      role: "assistant" as const,
      content: "Это ответ бота",
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages(prev => [...prev, botMessage])
    setIsLoading(false)
  }, 1500)
}

  return (
    <main className="chat-window">

      <header className="chat-header">

        <button className="burger" onClick={toggleSidebar}>
          ☰
        </button>

        <h3>React помощь</h3>

        <button onClick={() => setOpenSettings(true)}>
          ⚙
        </button>

      </header>

      <MessageList messages={messages} isLoading={isLoading} />
      <div ref={bottomRef} />
      <InputArea onSend={sendMessage} isLoading={isLoading} />

      {openSettings && (
        <SettingsPanel onClose={() => setOpenSettings(false)} />
      )}

    </main>
  )
}