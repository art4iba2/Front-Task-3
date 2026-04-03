export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}
export type Chat = {
  id: string
  title: string
  messages: Message[]
}

export type ChatState = {
  chats: Chat[]
  activeChatId: string | null
  isLoading: boolean
}