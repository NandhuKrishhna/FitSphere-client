import useResendPasswordHook from "@/hooks/ResendOtpHook";
import OTPVerificationLayout from "@/components/App/OTPVerificationLayout";
import useDoctorResetPasswordHook from "@/hooks/DoctorHooks/useForgotPasswordOTP";

export default function DoctorForgotPasswordOTPPage() {
  const { otp, setOtp, handleSubmit, isLoading } = useDoctorResetPasswordHook();
  const { handleResendOtp } = useResendPasswordHook();
  const email = localStorage.getItem("ForgotPasswordEmail");

  return (
    <OTPVerificationLayout
      title="Verify Your Email"
      subtitle="We've sent a 6-digit code to your email. Enter it below to reset your password."
      onSubmit={handleSubmit}
      otp={otp}
      setOtp={setOtp}
      isLoading={isLoading}
      email={email || ""}
      handleResendOtp={handleResendOtp}
      submitButtonText="Reset Password"
    />
  );
}
