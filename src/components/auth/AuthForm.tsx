import { useState } from "react"
import ErrorMessage from "../ui/ErrorMessage"

interface Props {
  onLogin: () => void
}

export default function AuthForm({ onLogin }: Props) {

  const [cred, setCred] = useState("")
  const [error, setError] = useState("")

  const submit = () => {

    if (!cred) {
      setError("Credentials обязательны")
      return
    }

    onLogin()
  }

  return (
    <div className="auth">

      <h2>Авторизация</h2>

      <input
        type="password"
        placeholder="Credentials"
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

      <button onClick={submit}>
        Войти
      </button>

    </div>
  )
}