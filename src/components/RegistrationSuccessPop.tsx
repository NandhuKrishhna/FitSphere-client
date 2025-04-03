import { useEffect } from "react"
import { CheckCircle2, X } from "lucide-react"
import { Card } from "./ui/card"
import { useNavigate } from "react-router-dom"

export interface RegistrationSuccessPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegistrationSuccessPopup({ isOpen, onClose }: RegistrationSuccessPopupProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
        navigate("/")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, navigate])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <Card
        className="w-full max-w-md bg-[#E6E6FA] p-6 rounded-3xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => {
          onClose()
          navigate("/")
        }}>
          <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
        </div>

        <div className="flex flex-col items-center text-center space-y-2">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
          <h2 className="text-xl font-semibold">✨ Thank You for Registering! ✨</h2>
        </div>

        <div className="flex justify-center">
          <div className="bg-green-200/80 text-green-800 px-4 py-1 rounded-full text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Email Sent
            <span className="text-gray-600">Check your inbox for an email with all details.</span>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 space-y-3 text-gray-800">
          <p>Your application has been successfully submitted. Our team will review your details.</p>
          <p>The approval process may take 24-48 hours.</p>
          <p>
            Once approved, you will receive a confirmation email, and your account will be activated.
          </p>
          <p>
            If you have any questions, contact support at{" "}
            <a href="mailto:fitSpheresupport@gmail.com" className="text-blue-600 hover:underline">
              fitSpheresupport@gmail.com
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}
