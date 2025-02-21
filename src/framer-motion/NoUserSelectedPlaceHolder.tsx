import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
export function NoUserSelectedPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
      >
        <MessageCircle className="w-16 h-16 text-zinc-500" />
      </motion.div>
      <p className="mt-4 text-lg">Select a user to start chatting!</p>
    </div>
  );
}
