import { useContext, useCallback } from "react"
import { ChatContext } from "../app/providers/ChatProvider"

interface Props {
  navigate: (path: string, replace?: boolean) => void
  toggleSidebar?: () => void
}

export default function HomePage({ navigate, toggleSidebar }: Props) {
  const { dispatch } = useContext(ChatContext)!

  const handleCreate = useCallback(() => {
    const newId = Date.now().toString()
    dispatch({ type: "CREATE_CHAT", payload: newId })
    navigate(`/chat/${newId}`)
  }, [dispatch, navigate])

  return (
    <main className="chat-window home-page">
      <header className="chat-header">
        <button className="burger" onClick={toggleSidebar}>
          ☰
        </button>
        <h3>Новый чат</h3>
      </header>
      <div className="home-empty">
        <h2>Добро пожаловать</h2>
        <p>Выберите существующий чат или создайте новый.</p>
        <button onClick={handleCreate}>Создать чат</button>
      </div>
    </main>
  )
}