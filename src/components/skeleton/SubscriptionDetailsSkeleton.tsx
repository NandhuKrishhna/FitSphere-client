import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SubscriptionDetailsSkeleton: React.FC = () => {
    return (
        <Card className="bg-zinc-800 border-zinc-700 text-white mb-6">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-indigo-400">Subscription</CardTitle>
                    <Skeleton className="h-6 w-16 bg-zinc-700 rounded-full" />
                </div>
                <CardDescription className="text-zinc-400">Your current subscription plan details</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Plan</span>
                        <Skeleton className="h-5 w-24 bg-zinc-700" />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Price</span>
                        <Skeleton className="h-5 w-20 bg-zinc-700" />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Start Date</span>
                        <Skeleton className="h-5 w-32 bg-zinc-700" />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">End Date</span>
                        <Skeleton className="h-5 w-32 bg-zinc-700" />
                    </div>

                    <div className="pt-2">
                        <h4 className="text-sm font-medium text-zinc-400 mb-2">Features:</h4>
                        <ul className="space-y-1">
                            {[1, 2, 3].map((_, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full bg-zinc-700" />
                                    <Skeleton className="h-4 w-full max-w-[200px] bg-zinc-700" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SubscriptionDetailsSkeleton