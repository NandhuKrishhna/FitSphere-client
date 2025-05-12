const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className={`flex ${item % 2 === 0 ? "justify-end" : "justify-start"}`}>
          <div className={`flex gap-3 ${item % 2 === 0 ? "flex-row-reverse" : ""}`}>
            <div className="flex-shrink-0">
              <div className="size-8 rounded-full bg-slate-700 animate-pulse" />
            </div>

            <div className={`flex flex-col ${item % 2 === 0 ? "items-end" : "items-start"}`}>
              <div className="h-4 w-20 bg-slate-700 rounded animate-pulse mb-1" />

              <div
                className={`rounded-2xl px-4 py-3 ${item % 2 === 0 ? "bg-violet-500/30 rounded-tr-none" : "bg-slate-700/50 rounded-tl-none"
                  }`}
              >
                <div className="h-4 w-40 bg-slate-600/50 rounded animate-pulse mb-2" />
                <div className="h-4 w-28 bg-slate-600/50 rounded animate-pulse" />
              </div>

              <div className="h-3 w-16 bg-slate-700 rounded animate-pulse mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageSkeleton
