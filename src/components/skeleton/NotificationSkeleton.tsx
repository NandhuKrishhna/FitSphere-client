import type React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell } from "lucide-react"

const NotificationSkeleton: React.FC = () => {
  return (
    <div>

      <div className="flex min-h-screen bg-gradient-to-br from-indigo-900 to-black">
        <div className="flex gap-6 w-full p-6 items-start">

          <div className="h-[calc(100vh-3rem)] bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex-1 w-2/5">

            <div className="flex justify-between items-center p-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Bell className="text-indigo-400 h-6 w-6" />
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
              </div>
              <Skeleton className="w-8 h-8 rounded-full bg-indigo-500/30" />
            </div>


            <div className="w-full bg-gray-800 flex items-center px-5 py-4 justify-between sticky top-0 z-10">
              <div className="flex space-x-6 items-center">
                <Skeleton className="h-9 w-20 bg-gray-700 rounded-lg" />
                <Skeleton className="h-9 w-28 bg-gray-700 rounded-lg" />
              </div>
              <Skeleton className="h-6 w-36 bg-gray-700 rounded-lg" />
            </div>


            <div className="overflow-y-auto h-[calc(100%-8rem)]">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="border-b border-gray-800 p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full bg-gray-800" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-5 w-32 bg-gray-800 mb-2" />
                        <Skeleton className="h-4 w-16 bg-gray-800" />
                      </div>
                      <Skeleton className="h-4 w-full bg-gray-800" />
                      <Skeleton className="h-4 w-3/4 bg-gray-800 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[calc(100vh-3rem)] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300 flex-1 flex flex-col">

            <div className="bg-gray-800 p-6 relative">
              <Skeleton className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-700" />

              <div className="flex items-center gap-5">
                <Skeleton className="w-20 h-20 rounded-full bg-indigo-600/30" />
                <div>
                  <Skeleton className="h-7 w-48 bg-gray-700 mb-2" />
                  <Skeleton className="h-5 w-32 bg-gray-700" />
                </div>
              </div>
            </div>


            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              <Skeleton className="h-24 w-full rounded-lg bg-gray-800/50" />


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Skeleton key={item} className="h-20 rounded-lg bg-gray-800/50" />
                ))}
              </div>


              <Skeleton className="h-10 w-40 rounded-lg bg-indigo-600/30" />
            </div>


            <div className="bg-gray-800 p-4 border-t border-gray-700 flex justify-end gap-3">
              <Skeleton className="h-10 w-24 rounded-lg bg-gray-700" />
              <Skeleton className="h-10 w-24 rounded-lg bg-indigo-600/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSkeleton
