export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`group rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}