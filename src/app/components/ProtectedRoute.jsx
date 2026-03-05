import { useMe } from "../../hooks/useAuth";
import { Navigate } from 'react-router'
import { Loader2 } from 'lucide-react'

export function ProtectedRoute({children}) {
    const { isLoading, isError } = useMe()
  
    if (isLoading) {
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </div>
      )
    }
  
    if (isError) {
      return <Navigate to="/login" replace />
    }
  
    return children
  }