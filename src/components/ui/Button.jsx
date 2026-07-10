import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  variant = "primary",
}) {
  const styles = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800",

    secondary:
      "border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition duration-300 ${styles[variant]}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition duration-300 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}