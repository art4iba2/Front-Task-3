import { lazy, ReactElement, Suspense, useState, cloneElement } from "react"

const Sidebar = lazy(() => import("../sidebar/Sidebar"))

interface Props {
  children: ReactElement
  navigate: (path: string, replace?: boolean) => void
}

export default function AppLayout({ children, navigate }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
  <div className="layout">

    {/* overlay */}
    {sidebarOpen && (
      <div
        className="overlay"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    <Suspense fallback={<aside className="sidebar">Загрузка меню...</aside>}>
      <Sidebar
        open={sidebarOpen}
        navigate={navigate}
        onClose={() => setSidebarOpen(false)}
      />
    </Suspense>

    {cloneElement(children as ReactElement<any>, {
      toggleSidebar: () => setSidebarOpen(!sidebarOpen),
    })}
  </div>
)
}