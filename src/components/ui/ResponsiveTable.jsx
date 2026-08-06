import clsx from "clsx";

import EmptyState from "../common/EmptyState";

export default function ResponsiveTable({
  columns = [],
  data = [],
  renderRow,
  renderCard,
  emptyTitle = "No Records Found",
  emptyDescription = "Nothing to display.",
  className = "",
}) {

  if (!data.length) {

    return (

      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />

    );

  }

  return (

    <div className={clsx("w-full", className)}>

      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                {columns.map((column) => (

                  <th
                    key={column.key}
                    className={clsx(
                      "px-6 py-4 text-sm font-semibold text-slate-700",
                      column.align === "center" &&
                        "text-center",
                      column.align === "right" &&
                        "text-right",
                      (!column.align ||
                        column.align === "left") &&
                        "text-left"
                    )}
                  >

                    {column.title}

                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {data.map((item, index) => (

                <tr
                  key={item.id || index}
                  className="border-t border-slate-200 transition hover:bg-slate-50"
                >

                  {renderRow(item)}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">

        {data.map((item, index) => (

          <div
            key={item.id || index}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            {renderCard(item)}

          </div>

        ))}

      </div>

    </div>

  );

}