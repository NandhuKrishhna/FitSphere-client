import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import PasswordStrengthChecker from "../components/PasswordStrengthChecker";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/signUpHook";
const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    isLoading,
  } = useSignUp();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

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
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-300"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your full name"
                  />
                  <User
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={childVariants}>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-300"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                  <Mail
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={childVariants}>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <PasswordStrengthChecker password={password} />
              </motion.div>
              <motion.div className="space-y-2" variants={childVariants}>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-zinc-300"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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

export default SignupForm;
