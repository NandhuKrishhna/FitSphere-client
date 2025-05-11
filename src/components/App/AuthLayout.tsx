import { motion } from "framer-motion"
import { Eye, EyeOff, Loader, Mail, User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import PasswordStrengthChecker from "../../components/PasswordStrengthChecker"
import { childVariants, containerVariants } from "../../framer-motion/form-motion"
import InputField from "../../components/Input"
import { AuthLayoutProps } from "@/types/authentication.type"

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
  forgotPasswordURL,
  googleLoginOption,
  handleGoogleLogin }: AuthLayoutProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center [background-image:linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom_right,rgba(107,114,128,1),black)] [background-size:10px_10px,10px_10px,auto]">
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
                    {!isSignUp && forgotPasswordURL && (
                      <motion.div className="flex items-center justify-between" variants={childVariants}>
                        <Link to={forgotPasswordURL} className="text-sm text-indigo-500 hover:text-indigo-400">
                          Forgot password?
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>

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
                {isLoading ? <Loader className="animate-spin mx-auto text-slate-400" size={20} /> : submitButtonText}
              </motion.button>
              {googleLoginOption && (
                <div className="relative mt-4 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-zinc-900 px-2 text-zinc-400">Or continue with</span>
                  </div>
                </div>
              )}
              {googleLoginOption && (
                <motion.button
                  type="button"
                  className="w-full mt-4 py-2 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white font-medium transition duration-300 flex items-center justify-center gap-2"
                  variants={childVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGoogleLogin}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  Sign in with Google
                </motion.button>
              )}
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
  )
}

export default AuthLayout

