import { createContext, useReducer, ReactNode, useEffect } from "react"
import { Chat, ChatState, Message } from "../../components/types/message"
import { loadState, saveState } from "../../utils/storage"

export type Action =
  | { type: "CREATE_CHAT" }
  | { type: "SET_ACTIVE_CHAT"; payload: string }
  | { type: "ADD_MESSAGE"; payload: { chatId: string; message: Message } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "DELETE_CHAT"; payload: string }
  | { type: "RENAME_CHAT"; payload: { id: string; title: string } }

export const initialState: ChatState = {
  chats: [],
  activeChatId: null,
  isLoading: false,
}

export function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case "CREATE_CHAT": {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: "Новый чат",
        messages: [],
      }

      return {
        ...state,
        chats: [...state.chats, newChat],
        activeChatId: newChat.id,
      }
    }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_ACTIVE_CHAT":
      return { ...state, activeChatId: action.payload }

    case "ADD_MESSAGE":
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.chatId
            ? { ...chat, messages: [...chat.messages, action.payload.message] }
            : chat
        ),
      }

    case "DELETE_CHAT": {
      const filteredChats = state.chats.filter(chat => chat.id !== action.payload)

      return {
        ...state,
        chats: filteredChats,
        activeChatId:
          state.activeChatId === action.payload
            ? filteredChats[0]?.id || null
            : state.activeChatId,
      }
    }

    case "RENAME_CHAT":
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.id
            ? { ...chat, title: action.payload.title }
            : chat
        ),
      }

    default:
      return state
  }
}

export const ChatContext = createContext<{
  state: ChatState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const persistedState = loadState()
  const [state, dispatch] = useReducer(reducer, persistedState || initialState)

  useEffect(() => {
    saveState(state)
  }, [state])

  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>
}
