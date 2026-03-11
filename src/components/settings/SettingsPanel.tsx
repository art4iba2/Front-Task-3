import { useState } from "react"
import Toggle from "../ui/Toggle"

interface Props {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: Props) {

  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {

    const newTheme = theme === "light" ? "dark" : "light"

    setTheme(newTheme)

    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <div className="settings">

      <h3>Настройки</h3>

      <label>Model</label>

      <select>

        <option>GigaChat</option>

        <option>GigaChat-Plus</option>

        <option>GigaChat-Pro</option>

        <option>GigaChat-Max</option>

      </select>

      <label>Temperature</label>

      <input type="range" min="0" max="2" step="0.1" />

      <label>Top-P</label>

      <input type="range" min="0" max="1" step="0.1" />

      <label>Max Tokens</label>

      <input type="number" />

      <label>System Prompt</label>

      <textarea />

      <Toggle onToggle={toggleTheme} />

      <button>Сохранить</button>

      <button onClick={onClose}>Закрыть</button>

    </div>
  )
}