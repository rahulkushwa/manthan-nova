export default function SectionTitle({
  badge,
  title,
  subtitle,
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
        {badge}
      </span>

      <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        {subtitle}
      </p>

    </div>
  );
}