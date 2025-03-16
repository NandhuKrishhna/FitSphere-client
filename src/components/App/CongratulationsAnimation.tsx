import { useEffect, useState } from "react"
import { X, Award, Star } from "lucide-react"
import confetti from "canvas-confetti"

interface CongratulationsAnimationProps {
  isVisible: boolean
  onClose: () => void
}
export default function CongratulationsAnimation({ isVisible, onClose }: CongratulationsAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && isAnimating) {
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)

      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => {
          if (isVisible) { 
            onClose()
          }
        }, 500) 
      }, 5000)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
  }, [isVisible, isAnimating, onClose])
  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(onClose, 300) 
  }
  if (!isVisible && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-500 scale-100">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute -top-3 -left-3 animate-ping">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            </div>
            <div className="absolute -top-2 -right-3 animate-ping delay-300">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </div>
            <Award className="w-20 h-20 text-yellow-300 fill-yellow-300 animate-pulse" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
          <p className="text-white/90 mb-4">
            You've hit your calorie goal for today! Keep up the great work on your fitness journey.
          </p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleClose}
              className="px-5 py-2 bg-white text-purple-700 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Thanks!
            </button>
            <button
              onClick={handleClose}
              className="px-5 py-2 bg-purple-500/30 text-white rounded-full font-medium hover:bg-purple-500/40 transition-colors border border-white/20"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}