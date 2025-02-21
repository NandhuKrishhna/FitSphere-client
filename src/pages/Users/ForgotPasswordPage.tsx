import {  Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import useForgotPasswordHook from "../../hooks/enterForgotPasswordHook"
import { childVariants, containerVariants } from "../../framer-motion/form-motion"
import InputField from "../../components/Input"
const ForgotPasswordPage = () => {
   const {handleSubmit,errors , register , isLoading} = useForgotPasswordHook();

    return ( 
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-black ">
        <motion.div className="w-full max-w-md mx-4" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            className="bg-zinc-900 rounded-xl border border-zinc-800 text-white shadow-lg overflow-hidden"
            variants={childVariants}
          >
            <div className="p-6">
              <motion.h2 className="text-2xl font-semibold mb-2" variants={childVariants}>
              Reset Your Password
              </motion.h2>
              <motion.p className="text-zinc-400 text-sm mb-6" variants={childVariants}>
              Enter your email address to receive password reset instructions
              </motion.p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div className="space-y-2" variants={childVariants}>
                <InputField id="email" placeholder="Email" type="email" register={register("email")} icon={<Mail size={18} />} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium transition duration-300"
                  variants={childVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading? <span className="loading loading-ring loading-md"></span> : "Send Verification Code"}
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

export default ForgotPasswordPage
