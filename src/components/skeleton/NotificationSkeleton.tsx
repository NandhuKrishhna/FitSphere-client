
const NotificationsSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-bl from-indigo-400 to-black">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-[#1c1c1c] p-4">
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 w-full px-6 items-center">
        {/* Notifications List Skeleton */}
        <div className="h-[100%] bg-[#1c1c1c] rounded-lg overflow-y-auto transition-all duration-300 w-2/5">
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <div className="h-8 w-36 bg-gray-700 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
          </div>

          {/* Action Bar */}
          <div className="w-full h-[60px] bg-[#525252] flex items-center px-3 justify-between">
            <div className="flex space-x-4">
              <div className="h-4 w-16 bg-gray-600 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="h-4 w-28 bg-gray-600 rounded animate-pulse" />
          </div>

          {/* Notification Items */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="mt-3 w-full h-[80px] flex items-center px-3 space-x-3">
              <div className="w-14 h-14 bg-gray-700 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2" />
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Details Panel Skeleton */}
        <div className="h-[100%] bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl border border-[#2A2A2A] flex-1">
          {/* Profile Section */}
          <div className="bg-[#2C2C2C] p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse mx-auto mb-4" />
            <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mx-auto mb-2" />
            <div className="h-4 w-32 bg-gray-700 rounded animate-pulse mx-auto" />
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-700 rounded animate-pulse" />
              <div className="flex-1 h-20 bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-700 rounded animate-pulse" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-700 rounded animate-pulse w-20 mb-1" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-24" />
                  </div>
                </div>
              ))}
            </div>

            {/* Attachment Button */}
            <div className="h-10 w-32 bg-gray-700 rounded animate-pulse" />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mr-9 mt-4">
            <div className="h-10 w-24 bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-10 w-24 bg-gray-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSkeleton;