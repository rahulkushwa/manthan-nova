import clsx from "clsx";

export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl",
        "border border-white/20",
        "bg-white/70",
        "backdrop-blur-2xl",
        "shadow-xl",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}