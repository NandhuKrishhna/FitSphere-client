import type React from "react"

import { useEffect, useState } from "react"
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

type ImagePreviewModalProps = {
    src: string
    alt: string
    onClose: () => void
}

const ImagePreviewModal = ({ src, alt, onClose }: ImagePreviewModalProps) => {
    const [scale, setScale] = useState(1)
    const [rotation, setRotation] = useState(0)

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    const zoomIn = (e: React.MouseEvent) => {
        e.stopPropagation()
        setScale((prev) => Math.min(prev + 0.25, 3))
    }

    const zoomOut = (e: React.MouseEvent) => {
        e.stopPropagation()
        setScale((prev) => Math.max(prev - 0.25, 0.5))
    }

    const rotate = (e: React.MouseEvent) => {
        e.stopPropagation()
        setRotation((prev) => (prev + 90) % 360)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-preview-title"
        >
            <div
                className="relative max-w-[95%] max-h-[95%] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with title and close button */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between z-10 px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-t-lg">
                    <h2 id="image-preview-title" className="text-slate-200 text-sm font-medium truncate max-w-[80%]">
                        {alt || "Image Preview"}
                    </h2>
                    <button
                        className="text-slate-400 hover:text-white transition-colors"
                        onClick={onClose}
                        aria-label="Close preview"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Image container with glow effect */}
                <div className="relative group mt-10">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <img
                        src={src || "/placeholder.svg"}
                        alt={alt}
                        className="relative max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-slate-700/50 transition-all duration-300 ease-in-out"
                        style={{
                            transform: `scale(${scale}) rotate(${rotation}deg)`,
                        }}
                    />
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                    <button
                        onClick={zoomIn}
                        className="p-2 text-slate-400 hover:text-violet-400 hover:bg-slate-800/50 rounded-full transition-colors"
                        aria-label="Zoom in"
                    >
                        <ZoomIn size={18} />
                    </button>
                    <button
                        onClick={zoomOut}
                        className="p-2 text-slate-400 hover:text-violet-400 hover:bg-slate-800/50 rounded-full transition-colors"
                        aria-label="Zoom out"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <button
                        onClick={rotate}
                        className="p-2 text-slate-400 hover:text-violet-400 hover:bg-slate-800/50 rounded-full transition-colors"
                        aria-label="Rotate image"
                    >
                        <RotateCw size={18} />
                    </button>
                    <div className="text-xs text-slate-400 ml-1">
                        {Math.round(scale * 100)}% | {rotation}°
                    </div>
                </div>

                {/* Keyboard hint */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full">
                    Press ESC to close
                </div>
            </div>
        </div>
    )
}

export default ImagePreviewModal
