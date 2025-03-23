import type React from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { ToastType } from "./toast-container"


interface ToastProps {
    id: string
    message: string
    type: ToastType
    duration?: number
    onClose: () => void
    avatar?: string
    title?: string
}

const toastIcons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
}

const toastStyles = {
    info: "border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-950",
    success: "border-green-100 bg-green-50 dark:border-green-900 dark:bg-green-950",
    error: "border-red-100 bg-red-50 dark:border-red-900 dark:bg-red-950",
    warning: "border-amber-100 bg-amber-50 dark:border-amber-900 dark:bg-amber-950",
}

export const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000, onClose, avatar, title }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg ${toastStyles[type as keyof typeof toastStyles]}`}
        >
            <div className="flex-shrink-0">
                {avatar ? (
                    <Avatar>
                        <img src={avatar || "/placeholder.svg"} alt="User avatar" className="h-8 w-8 rounded-full object-cover" />
                    </Avatar>
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800">
                        {toastIcons[type as keyof typeof toastIcons]}
                    </div>
                )}
            </div>
            <div className="flex-1 pt-0.5">
                {title && <h4 className="font-medium text-gray-900 dark:text-gray-100">{title}</h4>}
                <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
        </motion.div>
    )
}

