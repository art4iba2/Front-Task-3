import ChatWindow from "../components/chat/ChatWindow"

interface Props {
  chatId: string
  toggleSidebar?: () => void
  navigate: (path: string, replace?: boolean) => void
}

export default function ChatPage({ chatId, toggleSidebar, navigate }: Props) {
  return <ChatWindow chatId={chatId} toggleSidebar={toggleSidebar || (() => undefined)} navigate={navigate} />
}