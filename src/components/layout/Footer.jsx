import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import Container from "../ui/Container";
import { siteConfig } from "../../data/siteConfig";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#08152E] text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(245,180,0,.15),transparent_35%)]" />

      <Container className="relative py-20">

        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr_1fr]">

          {/* Left */}

          <div>

            <h2 className="text-4xl font-bold">
              {siteConfig.name}
            </h2>

            <p className="mt-3 text-amber-400">
              {siteConfig.tagline}
            </p>

            <p className="mt-8 max-w-md leading-8 text-blue-100">
              Premium coaching for Classes VI–X with concept-based learning,
              individual attention and consistent academic excellence.
            </p>

            <div className="mt-8 flex gap-4">

           <a
                href="https://www.instagram.com/manthanova?igsh=czVxb2FlZXRibzNp"
                target="_blank"
                rel="noopener noreferrer"
                 className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-orange-500"
>
  <FaInstagram size={22} />
</a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-blue-600"
              >
                <FaFacebookF size={22} />
              </a>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold">
              Contact
            </h3>

            <div className="mt-8 space-y-6">

              <div className="flex gap-4">

                <Phone className="mt-1 text-amber-400" />

                <span>{siteConfig.phone}</span>

              </div>

              <div className="flex gap-4">

                <Mail className="mt-1 text-amber-400" />

                <span>
                  your@email.com
                </span>

              </div>

              <div className="flex gap-4">

                <MapPin className="mt-1 text-amber-400" />

                <span>
                  {siteConfig.location}
                </span>

              </div>

            </div>

          </div>

          {/* Subjects */}

          <div>

            <h3 className="text-2xl font-bold">
             Focused Subjects
            </h3>

            <div className="mt-8 space-y-5">

              {siteConfig.subjects.map((subject) => (

                <div
                  key={subject}
                  className="flex items-center gap-3"
                >

                  <GraduationCap
                    size={18}
                    className="text-amber-400"
                  />

                  <span>{subject}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-blue-200">

          © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.

        </div>

      </Container>

    </footer>
  );
}