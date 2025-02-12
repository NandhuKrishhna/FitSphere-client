
import { useState } from "react"
import { Eye, EyeOff, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import useAdminLoginHook from "../../hooks/Admin/adminLoginHook"
import { childVariants, containerVariants } from "../../framer-motion/form-motion"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const {email, password, errors, handleInputChange, handleSubmit, isLoading} =useAdminLoginHook();



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-500 to-black ">
      <motion.div className="w-full max-w-md mx-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          className="bg-zinc-900 rounded-xl border border-zinc-800 text-white shadow-lg overflow-hidden"
          variants={childVariants}
        >
          <div className="p-6">
            <motion.h2 className="text-2xl font-semibold mb-2" variants={childVariants}>
              Login to your account
            </motion.h2>
            <motion.p className="text-zinc-400 text-sm mb-6" variants={childVariants}>
              Enter your email and password to access your account
            </motion.p>
            <form onSubmit={handleSubmit} className="space-y-4">
  {/* Email Field */}
  <motion.div className="space-y-2" variants={childVariants}>
    <label htmlFor="email" className="text-sm font-medium text-zinc-300">
      Email
    </label>
    <div className="relative">
      <input
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter your email"
      />
      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
    </div>
    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
  </motion.div>

  {/* Password Field */}
  <motion.div className="space-y-2" variants={childVariants}>
    <label htmlFor="password" className="text-sm font-medium text-zinc-300">
      Password
    </label>
    <div className="relative">
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={password}
        onChange={handleInputChange}
        className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter your password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
  </motion.div>

  {/* Forgot Password Link */}
  <motion.div className="flex items-center justify-between" variants={childVariants}>
    <Link to="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-400">
      Forgot password?
    </Link>
  </motion.div>

  {/* Submit Button */}
  <motion.button
    type="submit"
    className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium transition duration-300"
    variants={childVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={isLoading}
  >
    {isLoading ? <span className="loading loading-ring loading-md"></span> : "Login"}
  </motion.button>
</form>

          </div>
          <motion.div className="border-t border-zinc-800 p-6" variants={childVariants}>
            
          </motion.div>
        </motion.div>
        
      </motion.div>
    </div>
  )
}

