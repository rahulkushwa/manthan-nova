import {
  BookOpen,
  Brain,
  ClipboardCheck,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const steps = [
  {
    icon: BookOpen,
    title: "Learn",
    description:
      "Every chapter starts with strong conceptual understanding using simple explanations.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Practice",
    description:
      "Students solve worksheets, NCERT questions and additional practice problems.",
    color: "from-violet-600 to-purple-500",
  },
  {
    icon: ClipboardCheck,
    title: "Test",
    description:
      "Weekly assessments identify weak areas and improve exam confidence.",
    color: "from-emerald-600 to-green-500",
  },
  {
    icon: Trophy,
    title: "Excel",
    description:
      "Consistent revision and feedback help students achieve excellent academic results.",
    color: "from-orange-500 to-amber-400",
  },
];

export default function TeachingMethod() {
  return (
    <section className="bg-white py-28">

      <Container>

        <SectionTitle
          badge="Our Teaching Process"
          title="How Students Improve Every Week"
          subtitle="A structured learning system designed to build concepts, confidence and academic excellence."
        />

        <div className="relative mt-20">

          {/* Desktop Line */}

          <div className="absolute left-0 right-0 top-12 hidden h-1 rounded-full bg-slate-200 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (

                <motion.div
                  key={step.title}
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
                    delay: index * 0.1,
                  }}
                  className="relative text-center"
                >

                  <div
                    className={`relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-xl`}
                  >
                    <Icon
                      size={36}
                      className="text-white"
                    />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    {step.description}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </Container>

    </section>
  );
}