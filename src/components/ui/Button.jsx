import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Button({
  children,
  to,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) {
  const styles = {
    primary:
      "group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 px-8 py-3.5 font-semibold text-slate-900 shadow-[0_12px_30px_rgba(245,158,11,.35)]",

  secondary:
  "group relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-100 px-8 py-3.5 font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:bg-blue-200 hover:text-blue-800",};

  const content = (
    <motion.div
      whileHover={
        disabled
          ? {}
          : {
              y: -3,
              scale: 1.03,
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.97,
            }
      }
      transition={{
        duration: 0.2,
      }}
      className={clsx(
        styles[variant],
        disabled &&
          "cursor-not-allowed opacity-60",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/25 to-white/10 opacity-0 transition duration-500 group-hover:opacity-100" />

      {!disabled && (
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
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? "Please wait..." : children}
      </span>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full"
    >
      {content}
    </button>
  );
}