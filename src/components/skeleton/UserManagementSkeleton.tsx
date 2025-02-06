import React from 'react';

const UserManagementSkeleton: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar Skeleton */}
      <div className="h-screen bg-zinc-800 border-r shadow-lg w-64 flex flex-col animate-pulse">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="p-3 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="h-5 w-24 bg-gray-300 rounded"></div>
            </li>
            <li className="p-3 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="h-5 w-24 bg-gray-300 rounded"></div>
            </li>
            <li className="p-3 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="h-5 w-24 bg-gray-300 rounded"></div>
            </li>
          </ul>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-grow p-6 bg-gradient-to-br from-gray-500 to-black">
        <div className="bg-black shadow-md rounded-lg p-6 animate-pulse">
          <div className="h-8 w-48 bg-zinc-800 rounded mb-6"></div>

          {/* Filters and Search Skeleton */}
          <div className="flex mb-4 space-x-4 ">
            <div className="relative flex-grow">
              <div className="w-full h-10 bg-zinc-800 rounded"></div>
            </div>
            <div className="w-32 h-10 bg-zinc-800 rounded"></div>
            <div className="w-32 h-10 bg-zinc-800 rounded"></div>
          </div>

          {/* Table Skeleton */}
          <div className="space-y-4">
            <div className="h-10 bg-zinc-800 rounded"></div>
            <div className="h-10 bg-zinc-800 rounded"></div>
            <div className="h-10 bg-zinc-800 rounded"></div>
            <div className="h-10 bg-zinc-800 rounded"></div>
            <div className="h-10 bg-zinc-800 rounded"></div>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-between items-center mt-4">
            <div className="h-5 w-24 bg-zinc-800 rounded"></div>
            <div className="flex space-x-2">
              <div className="w-20 h-8 bg-zinc-800 rounded"></div>
              <div className="w-20 h-8 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementSkeleton;