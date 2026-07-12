import clsx from "clsx";

export default function GlassInput({
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full",
        "rounded-2xl",
        "border border-white/30",
        "bg-white/60",
        "px-4",
        "py-3",
        "backdrop-blur-xl",
        "outline-none",
        "transition-all duration-300",
        "focus:border-blue-500",
        "focus:bg-white/80",
        "focus:shadow-lg",
        className
      )}
    />
  );
}