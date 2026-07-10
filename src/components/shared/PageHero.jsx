import { motion } from "framer-motion";
import Container from "../ui/Container";

export default function PageHero({
  badge,
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#1e3a8a_0%,#10275d_45%,#08152e_100%)] pt-44 pb-28">

      {/* Background Glow */}

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-amber-400/15 blur-[120px]" />

      <Container>

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-4xl text-center"
        >

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-amber-300 backdrop-blur-xl">
            {badge}
          </span>

          <h1 className="mt-8 text-5xl font-extrabold text-white lg:text-7xl">
            {title}
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-100">
            {subtitle}
          </p>

        </motion.div>

      </Container>

    </section>
  );
}
