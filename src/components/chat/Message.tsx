import ReactMarkdown from "react-markdown"

interface Props {
  role: "user" | "assistant"
  content: string
}

export default function Message({ role, content }: Props) {

  return (
    <div className={`message ${role}`}>

      <div className="bubble">

        <ReactMarkdown>
          {content}
        </ReactMarkdown>

      </div>

      <button className="copy">
        📋
      </button>

    </div>
  )
}