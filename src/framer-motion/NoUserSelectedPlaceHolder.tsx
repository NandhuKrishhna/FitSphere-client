import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function NoUserSelectedPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center text-zinc-400 px-4">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="flex justify-center"
      >
        <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-zinc-500" />
      </motion.div>
      <p className="mt-4 text-base sm:text-lg font-medium">Select a user to start chatting!</p>
      <p className="mt-2 text-xs sm:text-sm text-zinc-500">Or continue browsing in the sidebar</p>
    </div>
  );
}

export default NoUserSelectedPlaceholder;
