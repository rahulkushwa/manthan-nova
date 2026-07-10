import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
          Admissions Open 2026–27
        </span>

        <h1 className="text-5xl font-bold mt-6 leading-tight">
          Build Strong Foundations.<br />
          Achieve Academic Excellence.
        </h1>

        <p className="mt-6 text-lg text-blue-100 max-w-2xl">
          Premium coaching for Classes 6–10 with experienced teachers,
          small batches, regular tests, and personalized attention.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/admission"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Apply Now
          </Link>

          <Link
            to="/courses"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
          >
            View Courses
          </Link>
        </div>

      </div>
    </section>
  );
}