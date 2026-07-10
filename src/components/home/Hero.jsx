import heroImage from "../../assets/images/hero.png";
import Container from "../ui/Container";
import HeroContent from "./HeroContent";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#1e3a8a_0%,#10275d_45%,#08152e_100%)] pt-36 pb-32">

      {/* Background Orbs */}

      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 -top-20 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-20 h-[340px] w-[340px] rounded-full bg-amber-400/15 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 30, -10, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[100px]"
      />

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

          <HeroContent />

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative flex justify-center"
          >

            <div className="relative">

              <img
                src={heroImage}
                alt="Manthan Nova"
                className="h-[560px] w-[430px] rounded-[36px] border border-white/20 object-cover shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              />

              {/* Experience */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -left-12 top-8 rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl"
              >
                <h3 className="text-4xl font-bold text-blue-900">
                  6+
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Years Experience
                </p>
              </motion.div>

              {/* Students */}

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
                className="absolute -right-12 top-36 rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl"
              >
                <h3 className="text-4xl font-bold text-blue-900">
                  500+
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Students
                </p>
              </motion.div>

              {/* Batch Size */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                className="absolute -left-8 bottom-20 rounded-3xl border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur-xl"
              >
                <h3 className="text-2xl font-bold text-blue-900">
                  20–30
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Students / Batch
                </p>
              </motion.div>

              {/* Free Demo */}

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }}
                className="absolute -right-10 bottom-8 rounded-3xl bg-gradient-to-r from-amber-400 to-yellow-300 px-8 py-5 shadow-2xl"
              >
                <p className="text-lg font-bold text-slate-900">
                  Free Demo
                </p>
              </motion.div>

            </div>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}