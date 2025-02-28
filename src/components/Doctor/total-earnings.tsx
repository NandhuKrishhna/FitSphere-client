import { ChevronDown, ChevronRight } from "lucide-react";

interface TotalEarningsProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

export default function TotalEarnings({ selectedView }: TotalEarningsProps) {
  const items = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, veniam, quis nostrud...",
      color: "bg-purple-600",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, veniam, quis nostrud...",
      color: "bg-pink-600",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, veniam, quis nostrud...",
      color: "bg-yellow-300",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Total Earnings</h2>
        <div className="bg-gray-500 text-white rounded-md px-3 py-1 flex items-center gap-2">
          <span className="text-sm">{selectedView}</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* Circular progress background */}
          <div className="w-full h-full rounded-full border-[15px] border-gray-200"></div>

          {/* Circular progress */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-[15px] border-transparent border-t-yellow-300 border-r-yellow-300 border-b-yellow-300"
            style={{ transform: "rotate(45deg)" }}
          ></div>

          {/* Content in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">34,600</span>
            <span className="text-xs text-gray-500">monthly</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
            <p className="text-sm flex-grow">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button className="flex items-center text-sm font-medium">
          <span>See All</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
