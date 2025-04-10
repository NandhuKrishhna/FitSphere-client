import type React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const WalletSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pb-10 bg-[#121212] text-white">
      {/* Header and Navigation placeholders */}
      <div className="h-16 w-full bg-zinc-900"></div>
      <div className="h-16 w-full bg-zinc-800 mb-10"></div>

      <div className="max-w-3xl mt-10 mx-auto px-4">
        <div className="bg-zinc-800 shadow-xl lg:rounded-lg overflow-hidden">
          {/* Wallet Header Skeleton */}
          <div className="px-4 py-5 sm:p-6 bg-purple-600/30 text-white">
            <Skeleton className="h-6 w-32 bg-purple-500/20 mb-2" />
            <Skeleton className="h-10 w-48 bg-purple-500/20" />
          </div>

          <div className="px-4 py-5 sm:p-6">
            {/* Title and Filters Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <Skeleton className="h-6 w-40 bg-zinc-700" />

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Skeleton className="h-10 w-48 bg-zinc-700" />
                <Skeleton className="h-10 w-24 bg-zinc-700" />
                <Skeleton className="h-10 w-24 bg-zinc-700" />
              </div>
            </div>

            {/* Transaction List Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 bg-zinc-700/50 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="space-y-2 mb-3 sm:mb-0">
                      <Skeleton className="h-5 w-48 bg-zinc-600" />
                      <Skeleton className="h-4 w-32 bg-zinc-600" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-6 w-24 bg-zinc-600 ml-auto" />
                      <Skeleton className="h-4 w-16 bg-zinc-600 mt-2 ml-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-6 flex justify-between items-center">
              <Skeleton className="h-8 w-24 bg-zinc-700" />
              <div className="flex gap-2">
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-8 w-8 bg-zinc-700" />
                ))}
              </div>
              <Skeleton className="h-8 w-24 bg-zinc-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletSkeleton
