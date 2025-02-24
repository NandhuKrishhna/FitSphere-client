import AuthLayout from "@/components/App/AuthLayout";
import useAdminLoginHook from "@/hooks/Admin/adminLoginHook";

export default function AdminLoginPage() {
  const { register, errors, handleSubmit, isLoading } = useAdminLoginHook();

  return (
    <AuthLayout
      title="Admin Login"
      subtitle="Fill in your details to get started"
      isSignUp={false}
      onSubmit={handleSubmit}
      register={register}
      errors={errors}
      isLoading={isLoading}
      submitButtonText="Login"
    />
  );
}
