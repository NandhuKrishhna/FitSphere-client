import { useState, useRef, type KeyboardEvent, type ClipboardEvent, useEffect, ReactNode } from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { childVariants, containerVariants } from "../../framer-motion/form-motion";

interface OTPVerificationLayoutProps {
  title?: string;
  subtitle?: string;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  otp: string[];
  setOtp: (otp: string[]) => void;
  isLoading: boolean;
  email?: string;
  handleResendOtp?: (email: string) => Promise<string | undefined>;
  footerComponent?: ReactNode;
  submitButtonText?: string;
  otpLength?: number;
}

const OTPVerificationLayout = ({
  title = "Enter OTP",
  subtitle = "Enter the 6-digit code sent to your email. This code is valid for the next 5 minutes.",
  onSubmit,
  otp,
  setOtp,
  isLoading,
  email,
  handleResendOtp,
  footerComponent,
  submitButtonText = "Verify OTP",
  otpLength = 6,
}: OTPVerificationLayoutProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, otpLength);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((value, index) => {
        newOtp[index] = value;
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = value;
        }
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, otpLength - 1)]?.focus();
    }
  };

  const handleResend = async () => {
    if (!email || !handleResendOtp) return;
    await handleResendOtp(email);
    setTimeLeft(300);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-black">
      <motion.div className="w-full max-w-md mx-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          className="bg-zinc-900 rounded-xl border border-zinc-800 text-white shadow-lg overflow-hidden"
          variants={childVariants}
        >
          <div className="p-6">
            <motion.h2 className="text-2xl font-semibold mb-2" variants={childVariants}>
              {title}
            </motion.h2>
            <motion.p className="text-zinc-400 text-sm mb-6" variants={childVariants}>
              {subtitle}
            </motion.p>
            <motion.div className="flex gap-2 justify-center my-4" variants={childVariants}>
              {Array.from({ length: otpLength }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={otp[index] || ""}
                  onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg bg-transparent border border-zinc-700 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              ))}
            </motion.div>
            <motion.button
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center h-10"
              onClick={(e) => onSubmit(e)}
              disabled={isLoading}
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>{submitButtonText}</span>
                </>
              )}
            </motion.button>
          </div>

          <motion.div className="border-t border-zinc-800 p-6" variants={childVariants}>
            {footerComponent ? (
              footerComponent
            ) : (
              <>
                <div className="text-sm text-center w-full mb-4">
                  Didn't get the code?{" "}
                  <button
                    onClick={handleResend}
                    className={`${
                      canResend ? "text-indigo-500 hover:text-indigo-400" : "text-zinc-500 cursor-not-allowed"
                    } font-medium`}
                    disabled={!canResend}
                  >
                    Resend code {!canResend && `(${formatTime(timeLeft)})`}
                  </button>
                </div>

                <div className="flex justify-center gap-6 text-sm text-zinc-400">
                  <button className="hover:text-white transition duration-300 ease-in-out">Need help?</button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OTPVerificationLayout;
