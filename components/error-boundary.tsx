"use client"

import React from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return (
        <Card className="w-full max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Algo salió mal
            </CardTitle>
            <CardDescription>Ha ocurrido un error inesperado. Por favor, intenta recargar la página.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={this.resetError} className="w-full bg-transparent" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar de nuevo
            </Button>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

export function PropertyErrorFallback({ error, resetError }: { error?: Error; resetError?: () => void }) {
  return (
    <Card className="w-full">
      <CardContent className="p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error al cargar la propiedad</h3>
        <p className="text-gray-600 mb-4">No pudimos cargar esta propiedad. Por favor, intenta de nuevo.</p>
        {resetError && (
          <Button onClick={resetError} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ErrorBoundary
