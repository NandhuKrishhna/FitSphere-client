import { useGetWalletQuery } from "@/redux/api/appApi"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ArrowUpRight, Wallet } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ChartDataItem, TotalEarningsProps, Transaction } from "@/types/Slot"

export default function TotalEarnings({ selectedView, onViewChange }: TotalEarningsProps) {
  const user = useSelector(selectCurrentUser)
  const userId = user?._id
  const role = user?.role

  const { data: walletData, error, isLoading } = useGetWalletQuery({ userId, role })

  const balance = walletData?.response?.wallet?.balance || 0
  const transactions: Transaction[] = walletData?.response?.transactions || []
  const chartData: ChartDataItem[] = transactions
    .reduce<ChartDataItem[]>((acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const existing = acc.find((item) => item.date === date)

      if (existing) {
        existing.amount += transaction.amount
      } else {
        acc.push({ date, amount: transaction.amount })
      }

      return acc
    }, [])
    .slice(-7)

  const totalEarnings = transactions.reduce((sum, tx) => sum + (tx.amount > 0 ? tx.amount : 0), 0)
  const previousPeriodEarnings = totalEarnings * 0.8
  const growthPercentage =
    previousPeriodEarnings > 0
      ? Math.round(((totalEarnings - previousPeriodEarnings) / previousPeriodEarnings) * 100)
      : 0

  return (
    <Card className="overflow-hidden border-none shadow-lg rounded-xl bg-white dark:bg-gray-900">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Total Earnings</CardTitle>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            <ArrowUpRight className="mr-1 h-3 w-3" />
            {growthPercentage}% growth
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 mb-4 mt-2">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <Wallet className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800 dark:text-white">
              {isLoading ? (
                <Skeleton className="h-10 w-32" />
              ) : (
                <>
                  {balance.toLocaleString()}{" "}
                  <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">INR</span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-48 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading transaction data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full h-48 flex items-center justify-center">
            <div className="text-center py-6 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg w-full">
              <p className="font-medium">Error loading data</p>
              <p className="text-sm mt-1">Please try again later</p>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <div className="flex justify-end mb-2">
              <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {["Weekly", "Monthly", "Yearly"].map((view) => (
                  <button
                    key={view}
                    onClick={() => onViewChange(view)}
                    className={`px-3 py-1 text-xs rounded-md ${selectedView === view
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <ChartContainer
              config={{
                earnings: {
                  label: "Earnings",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-48"
            >
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 15 }} accessibilityLayer>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={11}
                  className="fill-muted-foreground"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={11}
                  className="fill-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar dataKey="amount" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ChartContainer>

          </div>
        )}
      </CardContent>
    </Card>
  )
}

