import Container from "./Container";

export default function Section({
  children,
  className = "",
  background = "bg-white",
}) {
  return (
    <section className={`${background} py-20 lg:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}