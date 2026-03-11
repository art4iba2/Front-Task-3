interface Props {
  title: string
  date: string
}

export default function ChatItem({ title, date }: Props) {

  return (
    <div className="chat-item">

      <div className="chat-info">

        <span className="chat-title">{title}</span>

        <span className="chat-date">{date}</span>

      </div>

      <div className="chat-actions">

        <button>✏️</button>

        <button>🗑</button>

      </div>

    </div>
  )
}