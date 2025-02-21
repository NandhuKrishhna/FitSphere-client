
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSetNewPasswordHook from "../../hooks/setNewPasswordHook";
import PasswordStrengthChecker from "../../components/PasswordStrengthChecker";
import { childVariants, containerVariants } from "../../framer-motion/form-motion";
import InputField from "../../components/Input";

const ResetPasswordPage = () => {
   const [showPassword, setShowPassword] = useState(false)
   const {handleSubmit , errors , watch , register, isLoading} = useSetNewPasswordHook()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-black">
      <motion.div className="w-full max-w-md mx-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          className="bg-zinc-900 rounded-xl border border-zinc-800 text-white shadow-lg overflow-hidden"
          variants={childVariants}
        >
          <div className="p-6">
            <motion.h2 className="text-2xl font-semibold mb-2" variants={childVariants}>
            Set New Password
            </motion.h2>
            <motion.p className="text-zinc-400 text-sm mb-6" variants={childVariants}>
            Enter your email address to receive password reset instructions
            </motion.p>
            <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div className="space-y-2" variants={childVariants}>
                <div className="relative">
                <InputField
                  id="password"
                  placeholder="Create a strong password"
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
                <PasswordStrengthChecker password={watch("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              </motion.div>
              <motion.div className="space-y-2" variants={childVariants}>
                <div className="relative">
                <InputField
                  id="confirmPassword"
                  placeholder="Create a strong password"
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

              <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium transition duration-300"
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              
                {isLoading? <span className="loading loading-ring loading-md"></span> : "Reset Password"}
              </motion.button>
            </form>
          </div>
          <motion.div className="border-t border-zinc-800 p-6" variants={childVariants}>
            <p className="text-sm text-center text-zinc-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-500 hover:text-indigo-400 font-medium">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
        
      </motion.div>
    </div>
  )
}

export default ResetPasswordPage
