import {
  Calculator,
  Atom,
  Monitor,
  ArrowRight,
} from "lucide-react";
import Container from "../ui/Container";
import Reveal from "./Reveal";

const courses = [
  {
    title: "Mathematics",
    icon: Calculator,
    description:
      "Master concepts, shortcuts and problem-solving techniques for school and board exams.",
    color: "from-blue-600 to-blue-800",
  },
  {
    title: "Science",
    icon: Atom,
    description:
      "Concept-based Physics, Chemistry and Biology with practical understanding.",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    title: "Computer",
    icon: Monitor,
    description:
      "Programming, logical thinking and computer applications for modern learning.",
    color: "from-amber-500 to-orange-600",
  },
];

export default function Courses() {
  return (
    <section className="bg-white py-24">
      <Container>

        <Reveal>
          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700">
              Our Subjects
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900">
              Learn From The Best
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Interactive teaching with regular assessments and concept-based
              learning for Classes VI–X.
            </p>

          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {courses.map((course, index) => {

            const Icon = course.icon;

            return (

              <Reveal
                key={course.title}
                delay={index * 0.1}
              >

                <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

                  <div
                    className={`h-2 bg-gradient-to-r ${course.color}`}
                  />

                  <div className="p-8">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${course.color}`}
                    >

                      <Icon className="h-8 w-8 text-white" />

                    </div>

                    <h3 className="mt-8 text-3xl font-bold text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-5 leading-8 text-slate-600">
                      {course.description}
                    </p>

                    <button className="mt-8 flex items-center gap-2 font-semibold text-blue-700 transition-all duration-300 group-hover:gap-4">
                      Learn More
                      <ArrowRight className="h-5 w-5" />
                    </button>

                  </div>

                </div>

              </Reveal>

            );

          })}

        </div>

      </Container>
    </section>
  );
}