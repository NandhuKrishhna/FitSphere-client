
import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from "react"
import { Lock } from "lucide-react"
import { useVerfiyEmailMutation } from "../redux/api/apiSlice"
import { useNavigate } from "react-router-dom"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [verfiyEmail, { isLoading }] = useVerfiyEmailMutation()
 const navigate = useNavigate()
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp]
      pastedData.split("").forEach((value, index) => {
        newOtp[index] = value
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = value
        }
      })
      setOtp(newOtp)
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }
  
  const handleSubmit = async () => {
    const otpString = otp.join("")
    console.log(otpString)
    console.log(typeof otpString)
    if (otpString.length === 6) {
       verfiyEmail(otpString).unwrap().then(() => navigate("/home"))
    
    }
  }

  const handleResendCode = async () => {

    console.log("Resending code...")
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-4 bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Reset your password</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Enter the 6-digit code sent to your email. This code is valid for the next 10 minutes.
          </p>
          <div className="flex gap-2 justify-center my-4">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={otp[index]}
                onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg bg-transparent border border-zinc-700 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            ))}
          </div>
          <button
  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center h-10"
  onClick={handleSubmit}
  disabled={isLoading} // Prevent multiple clicks
>
  {isLoading ? (
   <span className="loading loading-spinner loading-md"></span>
  ) : (
    <>
      <Lock className="mr-2 h-4 w-4" />
      <span>Verify OTP</span>
    </>
  )}
</button>


        </div>
        <div className="border-t border-zinc-800 p-6">
          <div className="text-sm text-center w-full mb-4">
            Didn't get the code?{" "}
            <button onClick={handleResendCode} className="text-indigo-500 hover:text-indigo-400 font-medium">
              Resend code
            </button>
          </div>
          <div className="flex justify-center gap-6 text-sm text-zinc-400">
            <button className="hover:text-white transition duration-300 ease-in-out">Need help?</button>
          </div>
        </div>
      </div>
    </div>
  )
}

