import { memo } from "react"

interface Props {
  id: string
  title: string
  isActive: boolean
  isEditing: boolean
  editTitle: string
  onSelect: (id: string) => void
  onStartEdit: (id: string, title: string) => void
  onEditTitleChange: (value: string) => void
  onCommitRename: (id: string) => void
  onDelete: (id: string) => void
}

function ChatItem({
  id,
  title,
  isActive,
  isEditing,
  editTitle,
  onSelect,
  onStartEdit,
  onEditTitleChange,
  onCommitRename,
  onDelete,
}: Props) {
  return (
    <div className={`chat-item ${isActive ? "active" : ""}`}>
      <div className="chat-info" onClick={() => onSelect(id)}>
        {isEditing ? (
          <input
            value={editTitle}
            autoFocus
            onChange={(e) => onEditTitleChange(e.target.value)}
            onBlur={() => onCommitRename(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onCommitRename(id)
              }
            }}
          />
        ) : (
          <span className="chat-title">{title}</span>
        )}
      </div>
      <div className="actions">
        <button onClick={() => onStartEdit(id, title)}>✏️</button>

        <button onClick={() => onDelete(id)}>🗑</button>
      </div>
    </div>
  )
}

export default memo(ChatItem)