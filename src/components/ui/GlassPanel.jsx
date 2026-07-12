import clsx from "clsx";

export default function GlassPanel({
  children,
  className = "",
}) {
  return (
    <section
      className={clsx(
        "rounded-[32px]",
        "border border-white/20",
        "bg-white/60",
        "backdrop-blur-3xl",
        "shadow-xl",
        "p-6",
        className
      )}
    >
      {children}
    </section>
  );
}