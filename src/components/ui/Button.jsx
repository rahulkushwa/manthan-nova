import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Button({
  children,
  to,
  variant = "primary",
}) {
  const primary =
    "relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-7 py-3 font-semibold text-slate-900 shadow-lg";

  const secondary =
    "relative overflow-hidden rounded-xl border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur";

  const content = (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -2,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.2,
      }}
      className={variant === "primary" ? primary : secondary}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      <motion.div
        initial={{
          x: "-120%",
        }}
        whileHover={{
          x: "220%",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute inset-y-0 w-16 rotate-12 bg-white/40 blur-md"
      />
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return <button>{content}</button>;
}