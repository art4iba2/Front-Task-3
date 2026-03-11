import { chats } from "../../mockData"
import ChatItem from "./ChatItem"

export default function ChatList() {

  return (
    <div>

      {chats.map(chat => (
        <ChatItem
          key={chat.id}
          title={chat.title}
          date={chat.lastMessageDate}
        />
      ))}

    </div>
  )
}