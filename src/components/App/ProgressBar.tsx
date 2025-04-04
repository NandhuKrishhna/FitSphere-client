import { ProgressBarProps } from "@/types/types";

export default function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="flex space-x-2 w-full max-w-md justify-center px-6">
        {[...Array(totalSteps)].map((_, i) => (
          <div key={i} className={`h-1 rounded-full flex-1 ${i < step ? "bg-purple-400" : "bg-gray-600"}`} />
        ))}
      </div>
    </div>
  );
}
