import MessageList from "./MessageList"
import InputArea from "./InputArea"
import SettingsPanel from "../settings/SettingsPanel"
import { useState } from "react"

interface Props{
  toggleSidebar: () => void
}

export default function ChatWindow({toggleSidebar}:Props) {

  const [openSettings, setOpenSettings] = useState(false)

  return (
    <main className="chat-window">

      <header className="chat-header">

        <button className="burger" onClick={toggleSidebar}>
          ☰
        </button>

        <h3>React помощь</h3>

        <button onClick={() => setOpenSettings(true)}>
          ⚙
        </button>

      </header>

      <MessageList />

      <InputArea />

      {openSettings && (
        <SettingsPanel onClose={() => setOpenSettings(false)} />
      )}

    </main>
  )
}