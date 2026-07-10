import {
  CheckCircle2,
  Users,
  GraduationCap,
  ClipboardCheck,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";

const reasons = [
  "Concept-based teaching instead of rote learning",
  "Individual attention in every batch",
  "Weekly tests with performance analysis",
  "Small batches for better interaction",
  "Regular doubt-clearing sessions",
  "Friendly and disciplined learning environment",
];

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Students",
  },
  {
    icon: GraduationCap,
    value: "6+",
    label: "Years",
  },
  {
    icon: ClipboardCheck,
    value: "100+",
    label: "Weekly Tests",
  },
  {
    icon: Award,
    value: "100%",
    label: "Concept Focus",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-28">

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
              Why Parents Choose Us
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
              Building Confidence,
              One Student At A Time.
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              We believe success comes from understanding,
              consistency and personal guidance. Every student
              receives the attention they deserve.
            </p>

            <div className="mt-10 space-y-5">

              {reasons.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <CheckCircle2
                    size={22}
                    className="text-blue-700"
                  />

                  <span className="text-lg text-slate-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >

            {stats.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.label}
                  className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-center transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700">

                    <Icon
                      size={30}
                      className="text-white"
                    />

                  </div>

                  <h3 className="mt-6 text-4xl font-extrabold text-slate-900">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-slate-500">
                    {item.label}
                  </p>

                </div>

              );

            })}

          </motion.div>

        </div>

      </Container>

    </section>
  );
}