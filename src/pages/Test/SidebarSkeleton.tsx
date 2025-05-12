const SidebarSkeleton = () => {
  return (
    <aside className="h-full w-20 lg:w-80 border-r border-slate-700/50 flex flex-col transition-all duration-200 bg-slate-900/40">
      <div className="border-b border-slate-700/50 w-full p-5">
        <div className="flex items-center gap-2">
          <div className="bg-slate-700 p-2 rounded-lg animate-pulse h-9 w-9" />
          <div className="h-5 w-24 bg-slate-700 rounded animate-pulse hidden lg:block" />
        </div>

        <div className="mt-4 relative hidden lg:block">
          <div className="h-10 w-full bg-slate-700 rounded-md animate-pulse" />
        </div>

        <div className="mt-4 hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-28 bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="h-5 w-16 bg-slate-700 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="w-full p-3 flex items-center gap-3">
            <div className="flex items-center gap-3 w-full">
              <div className="relative">
                <div className="size-10 rounded-full bg-slate-700 animate-pulse" />
              </div>

              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="h-5 w-32 bg-slate-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-40 bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton
