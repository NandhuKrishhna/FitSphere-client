import { Skeleton } from "@/components/ui/skeleton";

export function MessageSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div className={`max-w-[70%] rounded-lg p-3 ${index % 2 === 0 ? "bg-zinc-800" : "bg-violet-400/50"}`}>
            <Skeleton className="h-4 w-[200px] bg-zinc-700" />
            <Skeleton className="mt-2 h-4 w-[150px] bg-zinc-700" />
            <div className="mt-1 flex justify-end">
              <Skeleton className="h-3 w-[40px] bg-zinc-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
