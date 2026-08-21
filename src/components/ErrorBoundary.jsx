import { Component } from 'react'

// Prevents one broken section from taking down the whole page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Section failed to render:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-px mx-auto max-w-6xl py-12 text-center text-sm text-muted-light dark:text-muted">
          This section couldn&apos;t load. Everything else on the page still works.
        </div>
      )
    }
    return this.props.children
  }
}
