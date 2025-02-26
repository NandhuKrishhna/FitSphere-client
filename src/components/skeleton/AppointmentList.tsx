import { Skeleton } from "@mui/material";

export const AppointmentSkeleton = () => (
  <div className="space-y-6">
    {[1, 2].map((i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-40" />
              <div className="flex items-center space-x-4 mt-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
