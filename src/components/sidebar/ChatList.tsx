import { chats } from "../../mockData"
import ChatItem from "./ChatItem"

export default function ChatList() {
  return (
      <div>
        {chats.map((chat) => (
            <ChatItem
                key={chat.id}
                id={chat.id}
                title={chat.title}
                isActive={false}
                isEditing={false}
                editTitle={chat.title}
                onSelect={() => undefined}
                onStartEdit={() => undefined}
                onEditTitleChange={() => undefined}
                onCommitRename={() => undefined}
                onDelete={() => undefined}
            />
        ))}
      </div>
  )
}