import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Receipt,
} from "lucide-react";

import GlassPanel from "../../ui/GlassPanel";

function StatusBadge({ status }) {
  const styles = {
    Paid: {
      icon: CheckCircle2,
      className:
        "bg-emerald-100 text-emerald-700",
    },
    Partial: {
      icon: Clock3,
      className:
        "bg-amber-100 text-amber-700",
    },
    Pending: {
      icon: AlertTriangle,
      className:
        "bg-red-100 text-red-700",
    },
  };

  const config =
    styles[status] || styles.Pending;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${config.className}`}
    >
      <Icon size={15} />
      {status}
    </span>
  );
}

export default function FeeHistoryTable({
  fees = [],
  onViewReceipt,
}) {
  return (
    <GlassPanel className="overflow-hidden p-0">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-bold">
          Fee History
        </h2>

        <p className="mt-1 text-slate-500">
          Your monthly payment records.
        </p>
      </div>

      {/* Desktop Table */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="px-6 py-4">
                Month
              </th>

              <th className="px-6 py-4">
                Total
              </th>

              <th className="px-6 py-4">
                Paid
              </th>

              <th className="px-6 py-4">
                Due
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Payment Date
              </th>

              <th className="px-6 py-4">
                Mode
              </th>

              <th className="px-6 py-4">
                Receipt
              </th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr
                key={fee.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-semibold">
                  {fee.month} {fee.year}
                </td>

                <td className="px-6 py-5">
                  ₹{fee.totalAmount}
                </td>

                <td className="px-6 py-5 text-emerald-600 font-semibold">
                  ₹{fee.paidAmount}
                </td>

                <td className="px-6 py-5 text-red-600 font-semibold">
                  ₹{fee.dueAmount}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge
                    status={fee.status}
                  />
                </td>

                <td className="px-6 py-5">
                  {fee.paymentDate?.toDate
                    ? fee.paymentDate
                        .toDate()
                        .toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-5">
                  {fee.paymentMode || "-"}
                </td>

                <td className="px-6 py-5">
                  <button
                    onClick={() => onViewReceipt?.(fee)
                    }
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                  >
                    <Receipt size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {fees.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No fee records found.
          </div>
        )}
      </div>

      {/* Mobile Cards */}

      <div className="space-y-4 p-4 lg:hidden">
        {fees.length === 0 && (
          <div className="rounded-2xl bg-slate-100 p-8 text-center text-slate-500">
            No fee records found.
          </div>
        )}

        {fees.map((fee) => (
          <div
            key={fee.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {fee.month} {fee.year}
              </h3>

              <StatusBadge
                status={fee.status}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">
                  Total
                </p>

                <p className="font-bold">
                  ₹{fee.totalAmount}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Paid
                </p>

                <p className="font-bold text-emerald-600">
                  ₹{fee.paidAmount}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Due
                </p>

                <p className="font-bold text-red-600">
                  ₹{fee.dueAmount}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Mode
                </p>

                <p className="font-medium">
                  {fee.paymentMode || "-"}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onViewReceipt?.(fee)
              }
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Receipt size={18} />
              View Receipt
            </button>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}