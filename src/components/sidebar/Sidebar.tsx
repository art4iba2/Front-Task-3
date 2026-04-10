import SearchInput from "./SearchInput"
import { useContext, useMemo, useState } from "react"
import { ChatContext } from "../../app/providers/ChatProvider"

interface Props {
  open: boolean
}

export default function Sidebar({ open }: Props) {
  const { state, dispatch } = useContext(ChatContext)!
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [query, setQuery] = useState("")

  const filteredChats = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return state.chats

    return state.chats.filter((chat) => chat.title.toLowerCase().includes(search))
  }, [query, state.chats])

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <button className="new-chat" onClick={() => dispatch({ type: "CREATE_CHAT" })}>
        + Новый чат
      </button>

      <SearchInput value={query} onChange={setQuery} />
      <div>
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === state.activeChatId ? "active" : ""}`}
          >
            <div
              className="chat-info"
              onClick={() => dispatch({ type: "SET_ACTIVE_CHAT", payload: chat.id })}
            >
              {editingId === chat.id ? (
                <input
                  value={title}
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => {
                    dispatch({
                      type: "RENAME_CHAT",
                      payload: {
                        id: chat.id,
                        title: title.trim() || "Новый чат",
                      },
                    })
                    setEditingId(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch({
                        type: "RENAME_CHAT",
                        payload: {
                          id: chat.id,
                          title: title.trim() || "Новый чат",
                        },
                      })
                      setEditingId(null)
                    }
                  }}
                />
              ) : (
                <span className="chat-title">{chat.title}</span>
              )}
            </div>

            <div className="actions">
              <button
                onClick={() => {
                  setEditingId(chat.id)
                  setTitle(chat.title)
                }}
              >
                ✏️
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Удалить чат?")) {
                    dispatch({ type: "DELETE_CHAT", payload: chat.id })
                  }
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
