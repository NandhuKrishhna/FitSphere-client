import type React from "react"
import { motion } from "framer-motion"

interface PasswordStrengthCheckerProps {
  password: string
}

const PasswordStrengthChecker: React.FC<PasswordStrengthCheckerProps> = ({ password }) => {
  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: "", color: "bg-zinc-600" }
    if (password.length < 6) return { strength: "Weak", color: "bg-red-500" }
    if (password.length < 10) return { strength: "Medium", color: "bg-yellow-500" }
    return { strength: "Strong", color: "bg-green-500" }
  }

  const { strength, color } = getPasswordStrength(password)

  return (
    <motion.div className="mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="h-1 w-full bg-zinc-600 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: "0%" }}
          animate={{ width: password ? `${(password.length / 12) * 100}%` : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
      {strength && <p className={`text-xs mt-1 ${color.replace("bg-", "text-")}`}>Password strength: {strength}</p>}
    </motion.div>
  )
}

export default PasswordStrengthChecker

