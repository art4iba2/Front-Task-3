export default function TypingIndicator({ isVisible }: { isVisible: boolean }) {

  if (!isVisible) return null

  return (
    <div className="typing">

      <span></span>

      <span></span>

      <span></span>

    </div>
  )
}