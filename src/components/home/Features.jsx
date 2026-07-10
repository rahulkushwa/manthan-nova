import {
  GraduationCap,
  Users,
  ClipboardCheck,
  Brain,
  Trophy,
  BookOpen,
} from "lucide-react";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const features = [
  {
    icon: GraduationCap,
    title: "Experienced Faculty",
    description:
      "Learn from experienced teachers who focus on building strong concepts instead of rote learning.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: Users,
    title: "Small Batch Size",
    description:
      "20–30 students per batch ensures individual attention for every learner.",
    color: "from-violet-600 to-purple-500",
  },
  {
    icon: ClipboardCheck,
    title: "Weekly Tests",
    description:
      "Regular assessments, report cards and revision sessions keep students exam-ready.",
    color: "from-emerald-600 to-green-500",
  },
  {
    icon: Brain,
    title: "Concept Learning",
    description:
      "Every topic is taught from fundamentals so students truly understand what they study.",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: Trophy,
    title: "Excellent Results",
    description:
      "Our students consistently improve their confidence and academic performance.",
    color: "from-pink-600 to-rose-500",
  },
  {
    icon: BookOpen,
    title: "Study Material",
    description:
      "Premium notes, worksheets, PYQs and revision material provided throughout the year.",
    color: "from-indigo-600 to-blue-500",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-28">

      <Container>

        <SectionTitle
          badge="Why Choose Manthan Nova?"
          title="Everything Your Child Needs To Excel"
          subtitle="A premium learning experience focused on concepts, confidence and consistent academic growth."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
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
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,.08)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(15,23,42,.15)]"
              >

                <div
                  className={`mb-8 flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.color}`}
                >

                  <Icon
                    size={34}
                    className="text-white"
                  />

                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {feature.description}
                </p>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${feature.color} scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                />

              </motion.div>

            );

          })}

        </div>

      </Container>

    </section>
  );
}