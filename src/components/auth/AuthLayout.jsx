import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1d4ed8_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b_0%,transparent_25%)]" />

      {/* Floating Glow */}

      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px]"
      />

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* Content */}

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>

    </main>
  );
}
