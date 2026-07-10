import {
  GraduationCap,
  Users,
  Trophy,
  BookOpen,
} from "lucide-react";

import { motion } from "framer-motion";
import Container from "../ui/Container";

const stats = [
  {
    icon: Users,
    number: "500+",
    title: "Students Guided",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: GraduationCap,
    number: "6+",
    title: "Years Experience",
    color: "from-purple-600 to-violet-500",
  },
  {
    icon: BookOpen,
    number: "20–30",
    title: "Students Per Batch",
    color: "from-emerald-600 to-green-500",
  },
  {
    icon: Trophy,
    number: "100%",
    title: "Concept Learning",
    color: "from-orange-500 to-amber-400",
  },
];

export default function Stats() {
  return (
    <section className="relative -mt-20 z-20 pb-28">

      <Container>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
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
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group relative overflow-hidden rounded-[30px] border border-white/20 bg-white/95 p-8 shadow-[0_15px_50px_rgba(15,23,42,.12)] backdrop-blur-xl transition-all duration-500"
              >

                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color}`}
                >
                  <Icon
                    size={30}
                    className="text-white"
                  />
                </div>

                <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
                  {item.number}
                </h2>

                <p className="mt-3 text-slate-600">
                  {item.title}
                </p>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-gradient-to-r ${item.color} transition-transform duration-500 group-hover:scale-x-100`}
                />

              </motion.div>

            );

          })}

        </div>

      </Container>

    </section>
  );
}