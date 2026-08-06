import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "There is nothing to display right now.",
  action,
  icon,
}) {

  const Icon = icon || Inbox;

  return (

    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">

      <div className="rounded-full bg-slate-100 p-5">

        <Icon
          size={42}
          className="text-slate-500"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">

        {title}

      </h2>

      <p className="mt-3 max-w-md text-slate-500">

        {description}

      </p>

      {action && (

        <div className="mt-8">

          {action}

        </div>

      )}

    </div>

  );

}