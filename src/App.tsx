import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react"
import AuthForm from "./components/auth/AuthForm"
import { ChatProvider } from "./app/providers/ChatProvider"
import AppLayout from "./components/layout/AppLayout"
import "./styles/theme.css"

const HomePage = lazy(() => import("./routes/HomePage"))
const ChatPage = lazy(() => import("./routes/ChatPage"))

type RouteState =
  | { name: "home" }
  | {
      name: "chat"
      chatId: string
    }

const parseRoute = (path: string): RouteState => {
  if (path === "/") return { name: "home" }

  const match = path.match(/^\/chat\/([^/]+)$/)
  if (match) {
    return { name: "chat", chatId: decodeURIComponent(match[1]) }
  }

  return { name: "home" }
}

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener("popstate", onPopState)

    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const navigate = useCallback((path: string, replace = false) => {
    if (replace) {
      window.history.replaceState({}, "", path)
    } else {
      window.history.pushState({}, "", path)
    }
    setPathname(path)
  }, [])

  const route = useMemo(() => parseRoute(pathname), [pathname])

  if (!isAuth) {
    return <AuthForm onLogin={() => setIsAuth(true)} />
  }

  return (
    <ChatProvider>
      <Suspense fallback={<div className="app-loading">Загрузка приложения...</div>}>
        <AppLayout navigate={navigate}>
          {route.name === "home" ? (
            <HomePage navigate={navigate} />
          ) : (
            <ChatPage chatId={route.chatId} navigate={navigate} />
          )}
        </AppLayout>
      </Suspense>
    </ChatProvider>
  )
}

export default App