import { Badge } from "@/components/ui/badge"

interface TransactionStatusBadgeProps {
  status: string
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  let badgeStyles = ""

  switch (status) {
    case "success":
      badgeStyles = "bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-indigo-200"
      break
    case "pending":
      badgeStyles = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
      break
    case "failed":
      badgeStyles = "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      break
    default:
      badgeStyles = "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
  }

  return (
    <Badge variant="outline" className={badgeStyles}>
      {status}
    </Badge>
  )
}

