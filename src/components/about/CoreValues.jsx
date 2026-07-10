import {
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";

const values = [
  {
    icon: HeartHandshake,
    title: "Personal Attention",
    description:
      "Every student receives individual guidance to strengthen concepts and boost confidence.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Concept First",
    description:
      "We focus on understanding instead of memorization, making learning meaningful and long-lasting.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: ShieldCheck,
    title: "Discipline & Consistency",
    description:
      "Regular practice, weekly assessments and structured learning create strong academic habits.",
    color: "from-emerald-600 to-green-500",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description:
      "Our goal is to inspire students to improve every day and reach their highest potential.",
    color: "from-violet-600 to-purple-500",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-slate-50 py-28">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Core Values
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            What Defines Manthan Nova
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every class, every interaction and every lesson is guided
            by values that help students become confident learners.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {values.map((value, index) => {

            const Icon = value.icon;

            return (

              <motion.div
                key={value.title}
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
                transition={{
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_45px_rgba(15,23,42,.08)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(15,23,42,.15)]"
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color}`}
                >
                  <Icon
                    size={30}
                    className="text-white"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {value.description}
                </p>

              </motion.div>

            );

          })}

        </div>

      </Container>

    </section>
  );
}