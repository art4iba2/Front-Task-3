import { useState } from "react"
import AppLayout from "./components/layout/AppLayout"
import AuthForm from "./components/auth/AuthForm"
import { ChatProvider } from "./app/providers/ChatProvider"

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <>
      {isAuth ? (
        <ChatProvider>
          <AppLayout />
        </ChatProvider>
      ) : (
        <AuthForm onLogin={() => setIsAuth(true)} />
      )}
    </>
  )
}

export default App