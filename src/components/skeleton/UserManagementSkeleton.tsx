
const DashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {/* Header Skeleton */}
        <div className="h-12 w-48 bg-gray-800 rounded animate-pulse mb-6" />

        {/* Stats Cards */}
        <div className="flex gap-6 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 w-1/3 rounded-lg shadow-lg p-4 border border-gray-700">
              <div className="h-6 w-24 bg-gray-700 rounded animate-pulse mb-4" />
              <div className="flex justify-center items-center h-[250px]">
                <div className="w-48 h-48 bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-gray-800 w-full rounded-lg shadow-lg h-[90vh] p-4 border border-gray-700">
          {/* Search and Filter Skeleton */}
          <div className="flex justify-between items-center mb-4">
            <div className="w-1/4 h-10 bg-gray-700 rounded animate-pulse" />
            <div className="w-32 h-10 bg-gray-700 rounded animate-pulse" />
          </div>

          {/* Table Skeleton */}
          <div className="mt-8">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 bg-gray-700 p-3 rounded-t-lg">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-6 bg-gray-600 rounded animate-pulse" />
              ))}
            </div>

            {/* Table Rows */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="grid grid-cols-6 gap-4 p-3 border-b border-gray-700">
                <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
                <div className="h-6 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-gray-700 rounded-full animate-pulse" />
                  <div className="h-8 w-24 bg-gray-700 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-between items-center mt-4 p-4 bg-gray-800">
            <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;