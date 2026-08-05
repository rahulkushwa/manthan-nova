import clsx from "clsx";

export default function GlassCard({
  children,
  className = "",
  onClick,
  ...props
}) {
  return (
    <div
      {...props}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={clsx(
        "rounded-3xl",
        "border border-white/20",
        "bg-white/70",
        "backdrop-blur-2xl",
        "shadow-xl",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-2xl",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}