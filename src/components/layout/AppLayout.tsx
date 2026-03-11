import { useState } from "react"
import Sidebar from "../sidebar/Sidebar"
import ChatWindow from "../chat/ChatWindow"

export default function AppLayout() {

  const [sidebarOpen,setSidebarOpen] = useState(false)

  return (
    <div className="layout">

      <Sidebar open={sidebarOpen} />

      <ChatWindow toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

    </div>
  )
}