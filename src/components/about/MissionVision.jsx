import { Target, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";

export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-28">

      <Container>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Mission */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] bg-white p-10 shadow-[0_15px_50px_rgba(15,23,42,.08)]"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <Target
                size={32}
                className="text-blue-700"
              />
            </div>

            <h2 className="mt-8 text-3xl font-bold text-slate-900">
              Our Mission
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              To provide quality education through concept-based
              teaching, personal attention and continuous
              motivation so that every student develops confidence,
              discipline and academic excellence.
            </p>

          </motion.div>

          {/* Vision */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-[32px] bg-white p-10 shadow-[0_15px_50px_rgba(15,23,42,.08)]"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
              <Eye
                size={32}
                className="text-amber-600"
              />
            </div>

            <h2 className="mt-8 text-3xl font-bold text-slate-900">
              Our Vision
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              To become one of the most trusted coaching institutes
              by inspiring students to think independently,
              understand concepts deeply and achieve success in
              academics as well as life.
            </p>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}