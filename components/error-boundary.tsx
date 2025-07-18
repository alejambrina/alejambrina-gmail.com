"use client"

import type React from "react"
import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)

    // Track error in analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: false,
      })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-red-100">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Algo salió mal</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">Ocurrió un error inesperado. Por favor, intenta recargar la página.</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-techitoPurple hover:bg-techitoPurple/90 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Recargar página
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Property-specific error fallback
export const PropertyErrorFallback = () => (
  <Card className="bg-white border border-red-200 shadow-sm">
    <CardContent className="p-6 text-center">
      <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-3" />
      <h3 className="font-semibold text-gray-900 mb-2">Error al cargar propiedad</h3>
      <p className="text-sm text-gray-600 mb-4">No pudimos cargar esta propiedad. Intenta nuevamente más tarde.</p>
      <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
        Reintentar
      </Button>
    </CardContent>
  </Card>
)

export default ErrorBoundary
