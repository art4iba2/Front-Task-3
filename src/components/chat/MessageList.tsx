import Message from "./Message"
import TypingIndicator from "./TypingIndicator"

interface Props {
  messages: any[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: Props) {
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

    </div>
  )
}