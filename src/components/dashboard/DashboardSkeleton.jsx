export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse p-8">

      {/* Hero */}

      <div className="h-48 rounded-3xl bg-slate-300"></div>

      {/* Stats */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 rounded-3xl bg-slate-300"
          />
        ))}

      </div>

      {/* Chart + Status */}

      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        <div className="h-96 rounded-3xl bg-slate-300"></div>

        <div className="h-96 rounded-3xl bg-slate-300"></div>

      </div>

      {/* Recent Notes + Students */}

      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        <div className="h-96 rounded-3xl bg-slate-300"></div>

        <div className="h-96 rounded-3xl bg-slate-300"></div>

      </div>

    </div>
  );
}