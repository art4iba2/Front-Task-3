import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallbackTitle?: string
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("UI render error:", error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p>{this.props.fallbackTitle || "Не удалось отрисовать сообщения."}</p>
          <button onClick={this.handleRetry}>Повторить</button>
        </div>
      )
    }

    return this.props.children
  }
}