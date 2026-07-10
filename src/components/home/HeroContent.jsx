import { CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { siteConfig } from "../../data/siteConfig";

const highlights = [
  "Small Batches (20–30)",
  "6+ Years Experience",
  "Weekly Assessments",
  "Free Demo Class",
];

export default function HeroContent() {
  return (
    <div>

      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl"
      >
        <Sparkles
          size={16}
          className="text-amber-300"
        />

        Admissions Open • 2026–27

      </motion.div>

      {/* Heading */}

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl"
      >
        Learn Smarter.
        <br />

        <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
          Score Higher.
        </span>

      </motion.h1>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-8 max-w-xl text-lg leading-8 text-blue-100"
      >
        {siteConfig.name} provides premium coaching for
        Classes VI–X with experienced guidance,
        concept-based learning and individual attention
        to help every student achieve academic excellence.
      </motion.p>

      {/* Highlights */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-10 grid grid-cols-2 gap-4"
      >

        {highlights.map((item) => (

          <div
            key={item}
            className="flex items-center gap-3"
          >

            <CheckCircle
              size={20}
              className="text-amber-300"
            />

            <span className="text-white">
              {item}
            </span>

          </div>

        ))}

      </motion.div>

      {/* Buttons */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-12 flex flex-wrap gap-4"
      >

        <Button to="/admission">
          Book Free Demo
        </Button>

        <Button
          variant="secondary"
          to="/courses"
        >
          Explore Courses
        </Button>

      </motion.div>

      {/* Trust Numbers */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-14 flex flex-wrap items-center gap-8"
      >

        <div>

          <p className="text-3xl font-bold text-white">
            500+
          </p>

          <span className="text-blue-200">
            Students Guided
          </span>

        </div>

        <div className="h-10 w-px bg-white/20" />

        <div>

          <p className="text-3xl font-bold text-white">
            6+
          </p>

          <span className="text-blue-200">
            Years Teaching
          </span>

        </div>

        <div className="h-10 w-px bg-white/20" />

        <div>

          <p className="text-3xl font-bold text-white">
            100%
          </p>

          <span className="text-blue-200">
            Concept Based
          </span>

        </div>

      </motion.div>

    </div>
  );
}