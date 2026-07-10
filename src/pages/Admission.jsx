import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import { User, Phone, School, BookOpen } from "lucide-react";

export default function Admission() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 pt-36 pb-24">
        <Container>

          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
              Admissions Open
            </span>

            <h1 className="mt-6 text-5xl font-bold text-slate-900">
              Book Your Free Demo Class
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Fill in the details below. We'll contact you shortly to schedule
              your free demo class.
            </p>

          </div>

          <div className="mx-auto mt-16 max-w-4xl rounded-3xl bg-white p-8 shadow-2xl lg:p-12">

            <form className="grid gap-8 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Student Name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Enter student name"
                    className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-700"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Parent Phone
                </label>

                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-slate-400" />

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-700"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Class
                </label>

                <div className="relative">
                  <School className="absolute left-4 top-4 text-slate-400" />

                  <select className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-700">
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Subject
                </label>

                <div className="relative">
                  <BookOpen className="absolute left-4 top-4 text-slate-400" />

                  <select className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-700">
                    <option>English</option>
                    <option>Social Science</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>Computer</option>
                    <option>All Subjects</option>
                   </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-slate-700">
                  Message (Optional)
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us anything you'd like us to know..."
                  className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-700"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 py-4 text-lg font-semibold text-white transition hover:scale-[1.02]"
                >
                  Submit Enquiry
                </button>
              </div>

            </form>

          </div>

        </Container>
      </section>

      <Footer />
    </>
  );
}