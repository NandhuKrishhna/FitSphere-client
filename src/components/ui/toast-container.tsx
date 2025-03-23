import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { Toast } from "./toast"
import { AnimatePresence } from "framer-motion"

export type ToastType = "info" | "success" | "error" | "warning"

export interface ToastProps {
    id: string
    message: string
    type: ToastType
    duration?: number
    avatar?: string
    title?: string
}

interface ToastContextType {
    toasts: ToastProps[]
    addToast: (toast: Omit<ToastProps, "id">) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    const addToast = useCallback((toast: Omit<ToastProps, "id">) => {
        const id = Math.random().toString(36).substring(2, 9)
        setToasts((prevToasts) => [...prevToasts, { ...toast, id }])
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

