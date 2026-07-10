import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Manthan Academy
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 font-medium text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/admission">Admission</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Button */}
        <Link
          to="/admission"
          className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Enroll Now
        </Link>

      </div>
    </header>
  );
}