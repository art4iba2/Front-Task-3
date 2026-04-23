import MessageList from "./MessageList"
import InputArea from "./InputArea"
import { lazy, Suspense, useState, useEffect, useContext, useCallback } from "react"
import ErrorBoundary from "../ui/ErrorBoundary"
import ErrorMessage from "../ui/ErrorMessage"
import { Message } from "../types/message"
import { ChatContext } from "../../app/providers/ChatProvider"
import { sendMessage as sendToApi } from "../../api/chat"

const SettingsPanel = lazy(() => import("../settings/SettingsPanel"))

interface Props {
  toggleSidebar: () => void
  chatId: string
  navigate: (path: string, replace?: boolean) => void
}

export default function ChatWindow({ toggleSidebar, chatId, navigate }: Props) {
  const [openSettings, setOpenSettings] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)
  const [lastText, setLastText] = useState<string>("")

  const { state, dispatch } = useContext(ChatContext)!
  const activeChat = state.chats.find((c) => c.id === state.activeChatId)

  useEffect(() => {
    if (state.chats.length === 0) {
      navigate("/", true)
      return
    }

    const exists = state.chats.some((chat) => chat.id === chatId)
    if (!exists) {
      navigate("/", true)
      return
    }

if (state.activeChatId !== chatId) {
      dispatch({ type: "SET_ACTIVE_CHAT", payload: chatId })
    }
  }, [chatId, dispatch, navigate, state.activeChatId, state.chats])


  const stopGeneration = useCallback(() => {
    dispatch({ type: "SET_LOADING", payload: false })
  }, [dispatch])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!state.activeChatId) return

      setRequestError(null)
      setLastText(text)

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

      try {
        const currentChat = state.chats.find((c) => c.id === state.activeChatId)

        const response = await sendToApi([
          ...(currentChat?.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })) || []),
          {
            role: "user",
            content: text,
          },
        ])

        const botMessage: Message = {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: response,
          timestamp: new Date().toLocaleTimeString(),
        }

        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            chatId: state.activeChatId,
            message: botMessage,
          },
        })
      } catch (error) {
        console.error(error)
        setRequestError("Не удалось получить ответ от API.")
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    },
    [dispatch, state.activeChatId, state.chats]
  )

  const retryLastRequest = useCallback(() => {
    if (lastText) {
      void sendMessage(lastText)
    }
  }, [lastText, sendMessage])

  return (
    <main className="chat-window">
      <header className="chat-header">
        <button className="burger" onClick={toggleSidebar}>
          ☰
        </button>

        <h3>{activeChat?.title || "Новый чат"}</h3>

        <button onClick={() => setOpenSettings(true)}>⚙</button>

      </header>

      <ErrorBoundary fallbackTitle="Ошибка рендера списка сообщений.">
        <MessageList messages={activeChat?.messages || []} isLoading={state.isLoading} />
      </ErrorBoundary>

      <InputArea onSend={sendMessage} isLoading={state.isLoading} onStop={stopGeneration} />

      {requestError && <ErrorMessage text={requestError} onRetry={retryLastRequest} />}

      {openSettings && (
        <Suspense fallback={<div className="settings-loading">Загрузка настроек...</div>}>
          <SettingsPanel onClose={() => setOpenSettings(false)} />
        </Suspense>
      )}
    </main>
  )
}