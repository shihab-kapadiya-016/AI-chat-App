import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"

interface AlertBasicProps {
  title: string
  description: string
}

export function AlertBasic({title, description}: AlertBasicProps ) {
  return (
    <Alert className="w-full max-w-xl bg-emerald-500/5 border-emerald-500/20 backdrop-blur-md text-emerald-50">
      <CheckCircle2Icon className="h-5 w-5 text-emerald-400" />
      <AlertTitle className="font-bold tracking-tight text-emerald-400">
        {title}
      </AlertTitle>
      <AlertDescription className="text-emerald-200/80">
        {description}
      </AlertDescription>
    </Alert>
  )
}