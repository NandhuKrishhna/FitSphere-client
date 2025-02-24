import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthChecker from "../../components/PasswordStrengthChecker";
import { childVariants, containerVariants } from "../../framer-motion/form-motion";
import InputField from "../../components/Input";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface AuthFormInputs {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthForgotPasswordInputs {
  email: string;
}

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  isSignUp?: boolean;
  resetPassword?: boolean;
  forgotPassword?: boolean;
  onSubmit: () => void;
  register: UseFormRegister<AuthFormInputs>;
  errors: FieldErrors<AuthFormInputs>;
  watch?: UseFormWatch<AuthFormInputs>;
  isLoading: boolean;
  footerQuestion?: string;
  footerLinkText?: string;
  footerLinkPath?: string;
  submitButtonText?: string;
}

const AuthLayout = ({
  title,
  subtitle,
  isSignUp = false,
  resetPassword = false,
  forgotPassword = false,
  onSubmit,
  register,
  errors,
  watch,
  isLoading,
  footerQuestion,
  footerLinkText,
  footerLinkPath,
  submitButtonText,
}: AuthLayoutProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Forgot Password: Only show email input */}
              {forgotPassword ? (
                <motion.div className="space-y-2" variants={childVariants}>
                  <InputField
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    register={register("email")}
                    icon={<Mail size={18} />}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </motion.div>
              ) : resetPassword ? (
                <>
                  {/* Reset Password: Only show password & confirm password fields */}
                  <motion.div className="space-y-2" variants={childVariants}>
                    <div className="relative">
                      <InputField
                        id="password"
                        placeholder="Enter new password"
                        type={showPassword ? "text" : "password"}
                        register={register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[50px] transform -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {watch && <PasswordStrengthChecker password={watch("password")} />}
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </motion.div>

                  <motion.div className="space-y-2" variants={childVariants}>
                    <div className="relative">
                      <InputField
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        type={showPassword ? "text" : "password"}
                        register={register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[50px] transform -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Sign Up Form */}
                  {isSignUp && (
                    <motion.div className="space-y-2" variants={childVariants}>
                      <InputField
                        id="name"
                        placeholder="Full Name"
                        register={register("name")}
                        icon={<User size={18} />}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </motion.div>
                  )}

                  {/* Email Input */}
                  <motion.div className="space-y-2" variants={childVariants}>
                    <InputField
                      id="email"
                      placeholder="Email"
                      type="email"
                      register={register("email")}
                      icon={<Mail size={18} />}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </motion.div>

                  {/* Password Input */}
                  <motion.div className="space-y-2" variants={childVariants}>
                    <div className="relative">
                      <InputField
                        id="password"
                        placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                        type={showPassword ? "text" : "password"}
                        register={register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[50px] transform -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {isSignUp && watch && <PasswordStrengthChecker password={watch("password")} />}
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    {!isSignUp && (
                      <motion.div className="flex items-center justify-between" variants={childVariants}>
                        <Link to="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-400">
                          Forgot password?
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Confirm Password for Sign Up */}
                  {isSignUp && (
                    <motion.div className="space-y-2" variants={childVariants}>
                      <div className="relative">
                        <InputField
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          type={showPassword ? "text" : "password"}
                          register={register("confirmPassword")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[50px] transform -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                      )}
                    </motion.div>
                  )}
                </>
              )}

              <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium transition duration-300"
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? <span className="loading loading-ring loading-md"></span> : submitButtonText}
              </motion.button>
            </form>
          </div>

          {footerQuestion && footerLinkText && footerLinkPath && (
            <motion.div className="border-t border-zinc-800 p-6" variants={childVariants}>
              <p className="text-sm text-center text-zinc-400">
                {footerQuestion}{" "}
                <Link to={footerLinkPath} className="text-indigo-500 hover:text-indigo-400 font-medium">
                  {footerLinkText}
                </Link>
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
