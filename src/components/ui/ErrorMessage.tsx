export default function ErrorMessage({ text }: { text: string }) {

  return (
    <div className="error">

      ❌ {text}

    </div>
  )
}