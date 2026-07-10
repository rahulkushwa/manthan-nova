import { motion } from "framer-motion";

export default function LoginCard({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .6,
      }}
      className="rounded-[34px] border border-white/15 bg-white/10 p-10 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl"
    >
      {children}
    </motion.div>
  );
}