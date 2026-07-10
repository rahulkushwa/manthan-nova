import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    name: "Parent of Class IX Student",
    review:
      "My child's confidence in Mathematics improved significantly. The teaching method is clear, disciplined and easy to understand.",
  },
  {
    name: "Parent of Class X Student",
    review:
      "Regular tests and personal attention helped my son improve his board exam preparation. Highly recommended.",
  },
  {
    name: "Parent of Class VIII Student",
    review:
      "The small batch size makes a huge difference. Every student receives proper guidance and support.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-28">

      <Container>

        <SectionTitle
          badge="Parents Trust Us"
          title="What Parents Say About Manthan Nova"
          subtitle="Our greatest achievement is the confidence and success of our students."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
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
                y: -10,
              }}
              className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,.08)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(15,23,42,.15)]"
            >

              <Quote
                size={42}
                className="text-blue-100"
              />

              <div className="mt-5 flex gap-1">

                {[...Array(5)].map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />

                ))}

              </div>

              <p className="mt-6 leading-8 text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h4 className="font-bold text-slate-900">
                  {item.name}
                </h4>

                <p className="text-sm text-slate-500">
                  Verified Parent
                </p>

              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 group-hover:w-full" />

            </motion.div>

          ))}

        </div>

      </Container>

    </section>
  );
}