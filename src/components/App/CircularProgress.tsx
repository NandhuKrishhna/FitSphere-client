import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  current: number;
  total: number;
  size?: "sm" | "md" | "lg" | "xl";
  showPercentage?: boolean;
  showValues?: boolean;
  className?: string;
  strokeWidth?: number;
  gradientStart?: string;
  gradientEnd?: string;
}

export function CircularProgress({
  current,
  total,
  size = "md",
  showPercentage = true,
  showValues = false,
  className,
  strokeWidth = 10,
  gradientStart = "#4f46e5",
  gradientEnd = "#8b5cf6",
}: CircularProgressProps) {
  const [percentage, setPercentage] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const dimensions = {
    sm: { size: 110, fontSize: "text-xs", valueSize: "text-[10px]" },
    md: { size: 160, fontSize: "text-sm", valueSize: "text-xs" },
    lg: { size: 210, fontSize: "text-base", valueSize: "text-sm" },
    xl: { size: 260, fontSize: "text-lg", valueSize: "text-base" },
  };

  const { size: dimensionSize, fontSize, valueSize } = dimensions[size];
  const radius = (dimensionSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const newPercentage = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;
    setPercentage(newPercentage);
  }, [current, total]);

  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();
    const startValue = animatedPercentage;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);

      const currentValue = startValue + (percentage - startValue) * easeOutQuad;
      setAnimatedPercentage(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage]);

  const strokeDashoffset = circumference - (circumference * animatedPercentage) / 100;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={dimensionSize}
        height={dimensionSize}
        viewBox={`0 0 ${dimensionSize} ${dimensionSize}`}
        className="transform -rotate-90"
      >
        {/* Define gradient */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>

        <circle
          cx={dimensionSize / 2}
          cy={dimensionSize / 2}
          r={radius}
          fill="none"
          stroke="#8787d1"
          strokeWidth={strokeWidth}
          className="opacity-100"
        />

        <circle
          cx={dimensionSize / 2}
          cy={dimensionSize / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />

        {percentage === 100 && (
          <circle
            cx={dimensionSize / 2}
            cy={dimensionSize / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            className="opacity-100"
          />
        )}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && <span className={cn("font-bold", fontSize)}>{Math.round(animatedPercentage)}%</span>}
        {showValues && (
          <span className={cn("text-muted-foreground", valueSize)}>
            {Math.round(current)} / {total}
          </span>
        )}
      </div>
    </div>
  );
}
