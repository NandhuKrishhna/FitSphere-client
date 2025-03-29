import ProgressBar from "@/components/App/ProgressBar"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

type PageLayoutProps = {
  children: ReactNode
  title: string
  subtitle?: string
  step: number
  totalSteps: number
  backAction?: () => void
  nextAction?: () => void
  nextDisabled?: boolean
  nextLabel?: string
  hideNext?: boolean
}

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
    <div className="flex flex-col items-center justify-between min-h-screen bg-black text-white p-6 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <ProgressBar step={step} totalSteps={totalSteps} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center flex-col w-full max-w-md z-10 my-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 text-purple-100 text-center"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full flex justify-between mt-8 mb-4 max-w-md z-10"
      >
        <button
          onClick={backAction}
          className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-700 disabled:hover:shadow-none"
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
            className={`flex items-center justify-center gap-2 ${nextLabel === "Save"
              ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400"
              : "bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400"
              } text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-indigo-500 disabled:hover:shadow-none transform hover:scale-105 active:scale-95`}
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
      </motion.div>
    </div>
  )
}

