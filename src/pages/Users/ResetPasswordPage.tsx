import AuthLayout from "@/components/App/AuthLayout";
import useSetNewPasswordHook from "@/hooks/setNewPasswordHook";
import { AuthFormInputs } from "@/types/authentication.type";

import { UseFormRegister, UseFormWatch } from "react-hook-form";

const ResetPasswordPage = () => {
  const { handleSubmit, errors, watch, register, isLoading } = useSetNewPasswordHook();

  return (
    <AuthLayout
      title="Enter New Password"
      subtitle="Enter your new password"
      resetPassword={true}
      onSubmit={handleSubmit}
      register={register as UseFormRegister<AuthFormInputs>}
      errors={errors}
      watch={watch as UseFormWatch<AuthFormInputs>}
      isLoading={isLoading}
      footerQuestion="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
      submitButtonText="Reset Password"
    />
  );
};

export default ResetPasswordPage;
