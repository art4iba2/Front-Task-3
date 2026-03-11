export type MessageRole = "user" | "assistant";

export interface Message {
  id: string
  role: MessageRole
  content: string
  createdAt: string
}

export interface Chat {
  id: string
  title: string
  lastMessageDate: string
}