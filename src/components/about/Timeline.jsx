import { motion } from "framer-motion";
import Container from "../ui/Container";

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "Started with a vision to make quality education simple, engaging and concept-driven.",
  },
  {
    year: "2022",
    title: "Growing Community",
    description:
      "More students joined because of our personal attention and strong academic results.",
  },
  {
    year: "2024",
    title: "Trusted By Parents",
    description:
      "Built a reputation for disciplined teaching, regular assessments and student improvement.",
  },
  {
    year: "2026",
    title: "Manthan Nova",
    description:
      "A modern coaching institute focused on creating confident learners and future achievers.",
  },
];

export default function Timeline() {
  return (
    <section className="bg-white py-28">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Our Journey
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            Every Great Journey Starts
            With One Step
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our growth has always been driven by one purpose —
            helping students understand concepts deeply and
            achieve academic success.
          </p>

        </div>

        <div className="relative mx-auto mt-24 max-w-5xl">

          {/* Vertical Line */}

          <div className="absolute left-6 top-0 h-full w-1 rounded-full bg-slate-200 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-20">

            {timeline.map((item, index) => (

              <motion.div
                key={item.year}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12,
                }}
                className={`relative flex flex-col lg:flex-row ${
                  index % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                }`}
              >

                <div className="w-full lg:w-1/2 lg:px-12">

                  <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_15px_45px_rgba(15,23,42,.08)]">

                    <span className="text-sm font-bold uppercase tracking-wider text-blue-700">
                      {item.year}
                    </span>

                    <h3 className="mt-3 text-3xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-5 leading-8 text-slate-600">
                      {item.description}
                    </p>

                  </div>

                </div>

                {/* Timeline Dot */}

                <div className="absolute left-6 top-10 z-10 h-6 w-6 rounded-full border-4 border-white bg-blue-700 shadow-xl lg:left-1/2 lg:-translate-x-1/2" />

              </motion.div>

            ))}

          </div>

        </div>

      </Container>

    </section>
  );
}