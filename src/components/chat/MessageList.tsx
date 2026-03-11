import { messages } from "../../mockData"
import Message from "./Message"
import TypingIndicator from "./TypingIndicator"

export default function MessageList() {

  return (
    <div className="message-list">

      {messages.map(msg => (
        <Message
          key={msg.id}
          role={msg.role}
          content={msg.content}
        />
      ))}

      <TypingIndicator isVisible={true} />

    </div>
  )
}