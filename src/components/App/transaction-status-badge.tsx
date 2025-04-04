import { Badge } from "@/components/ui/badge"
import { TransactionTypeBadgeProps } from "@/types/types"


export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  return (
    <Badge
      variant={type === "credit" ? "default" : "secondary"}
      className={`${type === "credit"
        ? "bg-green-300 text-green-800 hover:bg-indigo-100"
        : "bg-red-400 text-black hover:bg-red-400 hover:bg-opacity-90"
        }`}
    >
      {type}
    </Badge>
  )
}

