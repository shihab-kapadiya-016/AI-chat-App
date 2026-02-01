import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

interface AlertDestructiveProps {
  title: string
  description: string
}

export function AlertDestructive({title, description}: AlertDestructiveProps) {
  return (
    <Alert 
      variant="destructive" 
      className="max-w-md bg-rose-500/5 border-rose-500/20 backdrop-blur-md text-rose-50 shadow-2xl shadow-rose-500/10"
    >
      <AlertCircleIcon className="h-5 w-5 text-rose-400" />
      <AlertTitle className="font-bold tracking-tight text-rose-400">
        {title}
      </AlertTitle>
      <AlertDescription className="text-rose-200/80">
        {description || "A neural link error occurred. Please retry."}
      </AlertDescription>
    </Alert>
  )
}