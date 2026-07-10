import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Button({
  children,
  to,
  variant = "primary",
}) {
  const styles = {
    primary:
      "group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 px-8 py-3.5 font-semibold text-slate-900 shadow-[0_12px_30px_rgba(245,158,11,.35)]",

    secondary:
      "group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-xl",
  };

  const content = (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.2,
      }}
      className={styles[variant]}
    >
      {/* Hover Glow */}

      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/25 to-white/10 opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Shine */}

      <motion.div
        initial={{
          x: "-160%",
        }}
        whileHover={{
          x: "220%",
        }}
        transition={{
          duration: 0.8,
        }}
        className="absolute top-0 h-full w-14 rotate-12 bg-white/40 blur-lg"
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return (
    <button type="button">
      {content}
    </button>
  );
}