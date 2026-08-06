export default function PageLoader({
  rows = 4,
}) {

  return (

    <div className="space-y-6">

      <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200" />

      {Array.from({
        length: rows,
      }).map((_, index) => (

        <div
          key={index}
          className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div className="mb-5 h-6 w-52 rounded-lg bg-slate-200" />

          <div className="space-y-3">

            <div className="h-4 rounded bg-slate-200" />

            <div className="h-4 w-5/6 rounded bg-slate-200" />

            <div className="h-4 w-2/3 rounded bg-slate-200" />

          </div>

        </div>

      ))}

    </div>

  );

}