import clsx from "clsx";

export default function GlassButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-2xl",
        "bg-gradient-to-r",
        "from-blue-600",
        "to-indigo-700",
        "px-5",
        "py-3",
        "font-semibold",
        "text-white",
        "shadow-lg",
        "transition-all duration-300",
        "hover:-translate-y-0.5",
        "hover:scale-[1.02]",
        "hover:shadow-blue-500/30",
        "active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}