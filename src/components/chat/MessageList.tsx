import Message from "./Message"
import TypingIndicator from "./TypingIndicator"
import { useRef, useEffect } from "react"

interface Props {
  messages: any[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="message-list">

      {messages.map(msg => (
        <Message
          key={msg.id}
          role={msg.role}
          content={msg.content}
        />
      ))}

      <TypingIndicator isVisible={isLoading} />

      <div ref={bottomRef} />

    </div>
  )
}