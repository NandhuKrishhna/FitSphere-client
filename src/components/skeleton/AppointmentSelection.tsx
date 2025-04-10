import { Skeleton } from "@/components/ui/skeleton"

const AppointmentSectionSkeleton = () => {
    return (
        <div className="w-full bg-[#1e1e1e] rounded-xl p-6">

            <div className="pb-2 md:pb-4">
                <Skeleton className="h-5 w-3/4 mb-2 bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
            </div>


            <div className="flex gap-2 justify-between px-1 mt-4">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-24 flex-1 rounded-lg bg-gray-700" />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-10 rounded-md bg-gray-700" />
                ))}
            </div>

            <Skeleton className="w-full h-10 mt-4 rounded-lg bg-gray-700" />
        </div>
    )
}

export default AppointmentSectionSkeleton
