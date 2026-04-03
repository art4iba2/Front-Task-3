import MessageList from "./MessageList"
import InputArea from "./InputArea"
import SettingsPanel from "../settings/SettingsPanel"
import { Message } from '../types/message'
import { useState, useEffect } from "react"
import { useContext } from "react"
import { ChatContext } from "../../app/providers/ChatProvider"



interface Props{
  toggleSidebar: () => void
}

export default function ChatWindow({toggleSidebar}:Props) {

    const [openSettings, setOpenSettings] = useState(false)
    const stopGeneration = () => {
  dispatch({ type: "SET_LOADING", payload: false })
}

  const { state, dispatch } = useContext(ChatContext)!
  const activeChat = state.chats.find(c => c.id === state.activeChatId)

    useEffect(() => {
  if (state.chats.length === 0) {
    dispatch({ type: "CREATE_CHAT" })
  }
}, [state.chats.length, dispatch])

    const sendMessage = (text: string) => {
  if (!state.activeChatId) return

  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: text,
    timestamp: new Date().toLocaleTimeString(),
  }

  dispatch({
    type: "ADD_MESSAGE",
    payload: {
      chatId: state.activeChatId,
      message: userMessage,
    },
  })

  dispatch({ type: "SET_LOADING", payload: true })

  setTimeout(() => {
    const botMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: "Ответ бота 🤖",
      timestamp: new Date().toLocaleTimeString(),
    }

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        chatId: state.activeChatId!,
        message: botMessage,
      },
    })

    dispatch({ type: "SET_LOADING", payload: false })
  }, 1500)
}

  return (
    <main className="chat-window">

      <header className="chat-header">

        <button className="burger" onClick={toggleSidebar}>
          ☰
        </button>

        <h3>{activeChat?.title || "Новый чат"}</h3>

        <button onClick={() => setOpenSettings(true)}>
          ⚙
        </button>

      </header>

      <MessageList
          messages={activeChat?.messages || []}
          isLoading={state.isLoading}
      />
      <InputArea
          onSend={sendMessage}
          isLoading={state.isLoading}
          onStop={stopGeneration}
      />

      {openSettings && (
        <SettingsPanel onClose={() => setOpenSettings(false)} />
      )}

    </main>
  )
}