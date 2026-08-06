import BackButton from "./BackButton";

export default function PageHeader({
  title,
  subtitle,
  fallback,
  showBack = true,
  actions,
}) {

  return (

    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-start gap-4">

        {showBack && (

          <BackButton fallback={fallback} />

        )}

        <div>

          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">

            {title}

          </h1>

          {subtitle && (

            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">

              {subtitle}

            </p>

          )}

        </div>

      </div>

      {actions && (

        <div className="flex w-full flex-wrap gap-3 lg:w-auto lg:justify-end">

          {actions}

        </div>

      )}

    </div>

  );

}