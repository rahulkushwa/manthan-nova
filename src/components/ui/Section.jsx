import clsx from "clsx";

export default function Section({
  children,
  className = "",
  background = "bg-white",
}) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden py-24 lg:py-32",
        background,
        className
      )}
    >
      {children}
    </section>
  );
}