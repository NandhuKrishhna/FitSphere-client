import { Badge } from "@/components/ui/badge"

interface TransactionTypeBadgeProps {
  type: "credit" | "debit"
}

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  return (
    <Badge
      variant={type === "credit" ? "default" : "secondary"}
      className={`${
        type === "credit"
          ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
          : "bg-red-400 text-black hover:bg-red-400 hover:bg-opacity-90"
      }`}
    >
      {type}
    </Badge>
  )
}

