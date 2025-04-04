import { Skeleton } from "../ui/skeleton";

export function ReviewsSkeleton() {
    return (
        <div className="text-white">
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-7 w-48 bg-white/20" />
                <Skeleton className="h-5 w-5 bg-white/20" />
            </div>

            <div className="flex items-center gap-8 mb-8">
                <Skeleton className="h-16 w-16 bg-white/20" />
                <div className="space-y-2 w-full">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 bg-white/20" />
                            <Skeleton className="flex-grow h-2 bg-white/20 rounded-full" />
                            <Skeleton className="w-8 h-4 bg-white/20" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex gap-3">
                        <Skeleton className="w-8 h-8 rounded-full bg-white/20" />
                        <div className="w-full">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-24 bg-white/20" />
                                <Skeleton className="h-3 w-20 bg-white/20" />
                            </div>
                            <span className="text-sm text-gray-400">
                                <Skeleton className="h-3 w-full mt-2 bg-white/20" />
                            </span>
                            <Skeleton className="h-3 w-3/4 mt-1 bg-white/20" />
                            <div className="flex mt-2 gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="w-3.5 h-3.5 bg-white/20" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
