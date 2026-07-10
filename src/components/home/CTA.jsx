import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#07152E] via-[#0B2A66] to-[#102F7A]" />

      <div className="absolute -left-32 -top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-amber-400/15 blur-[120px]" />

      <Container>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[40px] border border-white/15 bg-white/10 px-8 py-16 text-center shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl lg:px-20"
        >

          <span className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900">
            Admissions Open 2026–27
          </span>

          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold leading-tight text-white lg:text-6xl">
            Give Your Child The Right Guidance
            <br />
            For A Brighter Future.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-blue-100">
            Join Manthan Nova and experience concept-based learning,
            personal attention and a structured approach that helps
            students build confidence and score better.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Button to="/admission">
              <span className="flex items-center gap-2">
                Book Free Demo
                <ArrowRight size={18} />
              </span>
            </Button>

            <a
              href="tel:+91XXXXXXXXXX"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              <Phone size={18} />
              Call Now
            </a>

            <a
              href="https://wa.me/919064911725"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/15 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-green-500"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

          </div>

        </motion.div>

      </Container>

    </section>
  );
}