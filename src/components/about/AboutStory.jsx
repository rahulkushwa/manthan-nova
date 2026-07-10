import {
  CheckCircle2,
  Award,
  Users,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import teacherImage from "../../assets/images/teacher.png";

const highlights = [
  "6+ Years of Teaching Experience",
  "500+ Students Guided",
  "Small Batch Size (20–30 Students)",
  "Concept-Based Learning Approach",
];

export default function AboutStory() {
  return (
    <section className="bg-white py-28">

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            <img
              src={teacherImage}
              alt="Teacher"
              className="rounded-[36px] shadow-[0_30px_70px_rgba(0,0,0,.12)]"
            />

            <div className="absolute -bottom-8 -right-8 rounded-3xl bg-white p-6 shadow-2xl">

              <Award
                size={36}
                className="text-amber-500"
              />

              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                6+
              </h3>

              <p className="text-slate-500">
                Years Experience
              </p>

            </div>

          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
              Our Story
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
              Inspiring Students To
              Learn With Confidence.
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              Manthan Nova was founded with one simple mission:
              to make learning enjoyable, meaningful and
              concept-driven. We believe every student can
              achieve excellence when they receive personal
              guidance, structured learning and continuous
              motivation.
            </p>

            <div className="mt-10 space-y-5">

              {highlights.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <CheckCircle2
                    size={22}
                    className="text-blue-600"
                  />

                  <span className="text-lg text-slate-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            <div className="mt-12 flex gap-8">

              <div>

                <Users
                  size={32}
                  className="text-blue-700"
                />

                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  500+
                </h3>

                <p className="text-slate-500">
                  Students
                </p>

              </div>

              <div>

                <BookOpen
                  size={32}
                  className="text-blue-700"
                />

                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  VI–X
                </h3>

                <p className="text-slate-500">
                  Classes
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}