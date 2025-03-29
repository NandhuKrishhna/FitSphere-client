const WalletSkeleton = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mt-10 mx-auto">
        <div className="bg-zinc-800 shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6 bg-gradient-to-r from-indigo-700 to-indigo-900">
            <div className="h-6 w-24 bg-indigo-600 rounded animate-pulse"></div>
            <div className="mt-2 h-8 w-32 bg-indigo-600 rounded animate-pulse"></div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-6 w-48 bg-zinc-700 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between bg-zinc-700 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-zinc-600 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-zinc-600 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 w-16 bg-zinc-600 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <div className="px-3 py-2 rounded-l-md border border-zinc-600 bg-zinc-700 w-20"></div>
                <div className="px-3 py-2 border-t border-b border-zinc-600 bg-zinc-700 w-24"></div>
                <div className="px-3 py-2 rounded-r-md border border-zinc-600 bg-zinc-700 w-20"></div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSkeleton;
