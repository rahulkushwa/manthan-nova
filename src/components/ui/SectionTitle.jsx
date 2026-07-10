export default function SectionTitle({
  badge,
  title,
  description,
  center = true,
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {badge && (
        <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          {badge}
        </span>
      )}

      <h2 className="mt-5 text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-slate-600 mx-auto leading-7">
          {description}
        </p>
      )}
    </div>
  );
}