import { motion } from "framer-motion";
import { features } from "../../data/features";

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-700 font-semibold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            Why Choose Manthan Academy?
          </h2>

          <p className="text-slate-600 mt-5 max-w-2xl mx-auto">
            We focus on building strong concepts, disciplined learning habits,
            and confidence so students perform consistently in school and board
            examinations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-blue-700" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}