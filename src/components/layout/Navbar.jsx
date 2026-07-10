import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Container from "../ui/Container";
import Button from "../ui/Button";
import { siteConfig } from "../../data/siteConfig";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Admission", path: "/admission" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const darkNavbar = !isHome || scrolled;

  return (
    <header className="fixed inset-x-0 top-5 z-50">

      <Container>

        <motion.div
          animate={{
            scale: scrolled ? 0.985 : 1,
            y: scrolled ? -2 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`rounded-2xl border transition-all duration-500 ${
            darkNavbar
              ? "border-white/30 bg-white/75 shadow-2xl backdrop-blur-2xl"
              : "border-white/15 bg-white/10 backdrop-blur-xl"
          }`}
        >

          <div className="flex h-20 items-center justify-between px-7">

            {/* Logo */}

            <Link to="/" className="leading-none">

              <h1
                className={`text-2xl font-extrabold tracking-tight transition ${
                  darkNavbar
                    ? "text-blue-900"
                    : "text-white"
                }`}
              >
                {siteConfig.name}
              </h1>

              <p
                className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.35em] transition ${
                  darkNavbar
                    ? "text-amber-600"
                    : "text-amber-300"
                }`}
              >
                {siteConfig.tagline}
              </p>

            </Link>

            {/* Desktop */}

            <nav className="hidden items-center gap-9 lg:flex">

              {navLinks.map((item) => (

                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative py-1 text-[15px] font-semibold transition ${
                      darkNavbar
                        ? isActive
                          ? "text-blue-800"
                          : "text-slate-700 hover:text-blue-700"
                        : isActive
                        ? "text-amber-300"
                        : "text-white hover:text-amber-300"
                    }`
                  }
                >

                  {({ isActive }) => (
                    <>
                      {item.name}

                      {isActive && (
                        <motion.div
                          layoutId="active-nav"
                          className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-amber-400"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 28,
                          }}
                        />
                      )}
                    </>
                  )}

                </NavLink>

              ))}

            </nav>

            {/* Right */}

            <div className="hidden lg:block">
              <Button to="/admission">
                Book Free Demo
              </Button>
            </div>

            {/* Mobile */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden ${
                darkNavbar
                  ? "text-slate-900"
                  : "text-white"
              }`}
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

          </div>

        </motion.div>

        <AnimatePresence>

          {menuOpen && (

            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.25,
              }}
              className="mt-3 overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-2xl lg:hidden"
            >

              <div className="flex flex-col gap-5 p-6">

                {navLinks.map((item) => (

                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="font-semibold text-slate-700"
                  >
                    {item.name}
                  </NavLink>

                ))}

                <Button to="/admission">
                  Book Free Demo
                </Button>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </Container>

    </header>
  );
}