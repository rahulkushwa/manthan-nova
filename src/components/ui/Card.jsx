
export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl bg-white p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}