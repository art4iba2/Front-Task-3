import { lazy, Suspense, useState } from "react"

const MarkdownRenderer = lazy(() => import("./MarkdownRenderer"))

interface Props {
  role: "user" | "assistant"
  content: string
}

export default function Message({ role, content }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = content
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Ошибка копирования:", err)
    }
  }

  return (
    <div className={`message ${role}`}>

      <div className="bubble">
        <Suspense fallback={<p>{content}</p>}>
          <MarkdownRenderer content={content} />
        </Suspense>
      </div>

      {role === "assistant" && (
        <button className="copy" onClick={copy}>
          {copied ? "✅ Скопировано" : "📋"}
        </button>
      )}

    </div>
  )
}