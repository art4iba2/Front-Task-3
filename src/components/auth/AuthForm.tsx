import { useState } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import chatApi from "../../api/chat"

interface Props {
  onLogin: () => void
}

export default function AuthForm({ onLogin }: Props) {
  const [cred, setCred] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    console.log("TOKEN из input:", cred)

    if (!cred.trim()) {
      setError("Токен обязателен")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      await chatApi.setGigaChatToken(cred)
      onLogin()
    } catch (e) {
      console.error(e)
      setError("Не удалось сохранить токен. Проверьте корректность токена и доступность API.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth">
      <h2>Авторизация</h2>

      <input
        type="password"
        placeholder="Введите токен GigaChat"
        value={cred}
        onChange={(e) => setCred(e.target.value)}
      />

      {error && <ErrorMessage text={error} />}

      <div>

        <label>
          <input type="radio" name="scope" />
          GIGACHAT_API_PERS
        </label>

        <label>
          <input type="radio" name="scope" />
          GIGACHAT_API_B2B
        </label>

        <label>
          <input type="radio" name="scope" />
          GIGACHAT_API_CORP
        </label>

      </div>

      <button onClick={submit} disabled={isSubmitting}>
        {isSubmitting ? "Сохранение..." : "Войти"}
      </button>

    </div>
  )
}