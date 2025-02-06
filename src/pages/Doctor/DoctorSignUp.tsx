
import {motion}  from 'framer-motion'
import { Eye, EyeOff, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDoctorSignUp from '../../hooks/DoctorHooks/doctorSignUpHook';
import PasswordStrengthChecker from '../../components/PasswordStrengthChecker';
import { childVariants, containerVariants } from '../../framer-motion/form-motion';
import InputField from '../../components/Input';
const DoctorSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
     register,
     errors,
     watch,
      handleSubmit,
      isLoading,
    } = useDoctorSignUp();

  
    return (
      <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="w-full max-w-md mx-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-zinc-900 rounded-xl border border-zinc-800 text-white shadow-lg overflow-hidden"
          variants={childVariants}
        >
          <div className="p-6">
            <motion.h2
              className="text-2xl font-semibold mb-2"
              variants={childVariants}
            >
              Create your account
            </motion.h2>
            <motion.p
              className="text-zinc-400 text-sm mb-6"
              variants={childVariants}
            >
              Fill in your details to get started
            </motion.p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div className="space-y-2" variants={childVariants}>
              <InputField id="name" placeholder="Full Name" register={register("name")}  icon={<User size={18} />} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </motion.div>

              <motion.div className="space-y-2" variants={childVariants}>
              <InputField id="email" placeholder="Email" type="email" register={register("email")} icon={<Mail size={18} />} />
                
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </motion.div>
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
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </motion.div>
              <motion.p
                className="text-xs text-zinc-400"
                variants={childVariants}
              >
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </motion.p>

              <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium transition duration-300"
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>
          </div>
          <motion.div
            className="border-t border-zinc-800 p-6"
            variants={childVariants}
          >
            <p className="text-sm text-center text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-500 hover:text-indigo-400 font-medium"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    );
  };
  
export default DoctorSignUp
