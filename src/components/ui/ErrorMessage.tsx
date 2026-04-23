interface Props {
  text: string
  onRetry?: () => void
}

export default function ErrorMessage({ text, onRetry }: Props) {
  return (
    <div className="error">
      <span>❌ {text}</span>
      {onRetry && (
        <button className="error-retry" onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  )
}