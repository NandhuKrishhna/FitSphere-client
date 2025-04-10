import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const TableSkeleton = () => {
    return (
        <Card className="w-full bg-zinc-900 text-white border-gray-800">
            <CardHeader className="pb-2 border-b border-gray-800">
                <CardTitle className="text-2xl font-bold">
                    <Skeleton className="h-6 w-40 bg-zinc-700" />
                </CardTitle>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
                    <Skeleton className="h-10 w-full md:w-72 bg-zinc-700" />
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
                        <Skeleton className="h-10 w-[130px] bg-zinc-700" />
                        <Skeleton className="h-10 w-[130px] bg-zinc-700" />
                        <Skeleton className="h-10 w-[180px] bg-zinc-700" />
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4 mt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex justify-between items-center bg-zinc-800 p-4 rounded-md">
                            <Skeleton className="h-4 w-24 bg-zinc-600" />
                            <Skeleton className="h-4 w-24 bg-zinc-600" />
                            <Skeleton className="h-4 w-20 bg-zinc-600" />
                            <Skeleton className="h-4 w-28 bg-zinc-600" />
                            <Skeleton className="h-4 w-16 bg-zinc-600" />

                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-6">
                    <Skeleton className="h-4 w-40 bg-zinc-700" />
                    <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-8 w-8 bg-zinc-700" />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
