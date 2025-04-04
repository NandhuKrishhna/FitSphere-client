import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { SubscriptionDetailsProps } from "@/types/types"



const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ subscriptionDetails, isLoading }) => {
    if (isLoading || !subscriptionDetails) return null
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }
    const startDate = formatDate(subscriptionDetails.startDate)
    const endDate = formatDate(subscriptionDetails.endDate)

    return (
        <Card className="bg-zinc-800 border-zinc-700 text-white mb-6">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-indigo-400">Subscription</CardTitle>
                    <Badge
                        variant="outline"
                        className={`${subscriptionDetails.status === "active"
                            ? "border-green-500 text-green-500"
                            : "border-yellow-500 text-yellow-500"
                            }`}
                    >
                        {subscriptionDetails.status}
                    </Badge>
                </div>
                <CardDescription className="text-zinc-400">Your current subscription plan details</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Plan</span>
                        <span className="font-medium">{subscriptionDetails.planName}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Price</span>
                        <span className="font-medium">{subscriptionDetails.price}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Start Date</span>
                        <span className="font-medium">{startDate}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">End Date</span>
                        <span className="font-medium">{endDate}</span>
                    </div>

                    <div className="pt-2">
                        <h4 className="text-sm font-medium text-zinc-400 mb-2">Features:</h4>
                        <ul className="space-y-1">
                            {subscriptionDetails.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-indigo-400" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SubscriptionDetails

