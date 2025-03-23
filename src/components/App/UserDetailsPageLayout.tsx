import ProgressBar from "@/components/App/ProgressBar";
import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  backAction?: () => void;
  nextAction?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  hideNext?: boolean;
};

export default function PageLayout({
  children,
  title,
  subtitle,
  step,
  totalSteps,
  backAction,
  nextAction,
  nextDisabled = false,
  nextLabel = "Next",
  hideNext = false,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <ProgressBar step={step} totalSteps={totalSteps} />

      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
        {subtitle && <p className="mb-10">{subtitle}</p>}

        {children}
      </div>

      <div className="w-full flex justify-between mt-8 mb-4 max-w-md">
        <button
          onClick={backAction}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50               disabled:cursor-not-allowed"
          disabled={!backAction}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        {!hideNext && (
          <button
            onClick={nextAction}
            className={`flex items-center justify-center gap-2 ${nextLabel === "Save" ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"
              } text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={nextDisabled}
          >
            {nextLabel}
            {nextLabel === "Save" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
