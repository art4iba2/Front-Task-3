import SearchInput from "./SearchInput"
import { useContext, useMemo, useState, useCallback } from "react"
import { ChatContext } from "../../app/providers/ChatProvider"
import ChatItem from "./ChatItem"

interface Props {
  open: boolean
  navigate: (path: string, replace?: boolean) => void
}

export default function Sidebar({ open, navigate }: Props) {
  const { state, dispatch } = useContext(ChatContext)!

  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [query, setQuery] = useState("")

  const filteredChats = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return state.chats

    return state.chats.filter((chat) => chat.title.toLowerCase().includes(search))
  }, [query, state.chats])

  const handleCreateChat = useCallback(() => {
    const newId = Date.now().toString()
    dispatch({ type: "CREATE_CHAT", payload: newId })
    navigate(`/chat/${newId}`)
  }, [dispatch, navigate])

  const handleSelect = useCallback(
    (id: string) => {
      dispatch({ type: "SET_ACTIVE_CHAT", payload: id })
      navigate(`/chat/${id}`)
    },
    [dispatch, navigate]
  )

  const handleDelete = useCallback(
    (id: string) => {
      if (!window.confirm("Удалить чат?")) return

      dispatch({ type: "DELETE_CHAT", payload: id })
      if (state.activeChatId === id) {
        navigate("/")
      }
    },
    [dispatch, navigate, state.activeChatId]
  )

  const handleRename = useCallback(
    (id: string) => {
      dispatch({
        type: "RENAME_CHAT",
        payload: {
          id,
          title: title.trim() || "Новый чат",
        },
      })
      setEditingId(null)
    },
    [dispatch, title]
  )

  const handleStartEdit = useCallback((id: string, currentTitle: string) => {
    setEditingId(id)
    setTitle(currentTitle)
  }, [])

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <button className="new-chat" onClick={handleCreateChat}>
        + Новый чат
      </button>

      <SearchInput value={query} onChange={setQuery} />
      <div>
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.id}
            id={chat.id}
            title={chat.title}
            isActive={chat.id === state.activeChatId}
            isEditing={editingId === chat.id}
            editTitle={title}
            onSelect={handleSelect}
            onStartEdit={handleStartEdit}
            onEditTitleChange={setTitle}
            onCommitRename={handleRename}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </aside>
  )
}