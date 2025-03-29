import { Lock } from "lucide-react"
import { useState, useRef, type KeyboardEvent, type ClipboardEvent, useEffect } from "react"
import useDoctorEmailOtpVerificatio from "../../hooks/DoctorHooks/doctorVerifyEmailByOtp"
const DoctorOtpVerification = () => {
  const { otp, setOtp, handleSubmit, isLoading, } = useDoctorEmailOtpVerificatio()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(300)
  const [canResend, setCanResend] = useState(false)


  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }



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



  const handleResendCode = async () => {

    console.log("Resending code...")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-black">
      <div className="w-full max-w-md mx-4 bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Enter OTP</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Enter the 6-digit code sent to your email. This code is valid for the next 5 minutes.
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
            <button
              onClick={handleResendCode}
              className={`${canResend ? "text-indigo-500 hover:text-indigo-400" : "text-zinc-500 cursor-not-allowed"} font-medium`}
              disabled={!canResend}
            >
              Resend code {!canResend && `(${formatTime(timeLeft)})`}
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

export default DoctorOtpVerification
