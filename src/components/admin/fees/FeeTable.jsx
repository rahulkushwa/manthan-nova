import {
  Pencil,
  Trash2,
  Eye,
  CreditCard,
  Receipt,
} from "lucide-react";

import { Link } from "react-router-dom";

import GlassPanel from "../../ui/GlassPanel";

import {
  formatCurrency,
  getStatusColor,
} from "../../../utils/feeUtils";

export default function FeeTable({
  fees = [],
  loading = false,
  onDelete,
}) {
  if (loading) {
    return (
      <GlassPanel>
        <div className="py-20 text-center text-slate-500">
          Loading fee records...
        </div>
      </GlassPanel>
    );
  }

  if (!fees.length) {
    return (
      <GlassPanel>
        <div className="py-20 text-center text-slate-500">
          No fee records found.
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="overflow-hidden p-0">

      {/* Desktop */}

      <div className="hidden overflow-x-auto lg:block">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Month
              </th>

              <th className="px-6 py-4 text-right">
                Total
              </th>

              <th className="px-6 py-4 text-right">
                Paid
              </th>

              <th className="px-6 py-4 text-right">
                Due
              </th>

              <th className="px-6 py-4 text-center">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Payment
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {fees.map((fee) => (

              <tr
                key={fee.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <h3 className="font-semibold">
                    {fee.studentName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Class {fee.class}
                  </p>

                </td>

                <td className="px-6 py-5">
                  {fee.month} {fee.year}
                </td>

                <td className="px-6 py-5 text-right font-semibold">
                  {formatCurrency(
                    fee.totalAmount
                  )}
                </td>

                <td className="px-6 py-5 text-right font-semibold text-green-600">
                  {formatCurrency(
                    fee.paidAmount
                  )}
                </td>

                <td className="px-6 py-5 text-right font-semibold text-red-600">
                  {formatCurrency(
                    fee.dueAmount
                  )}
                </td>

                <td className="px-6 py-5 text-center">

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${getStatusColor(
                      fee.status
                    )}`}
                  >

                    {fee.status}

                  </span>

                </td>

                <td className="px-6 py-5 text-center">

                  {fee.paymentMode || "--"}

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">
                                        {fee.status !== "Paid" && (

                      <Link
                        to={`/admin/fees/payment/${fee.id}`}
                        className="rounded-xl bg-emerald-600 p-2 text-white transition hover:bg-emerald-700"
                        title="Record Payment"
                      >

                        <CreditCard size={18} />

                      </Link>

                    )}

                    <Link
                      to={`/admin/fees/edit/${fee.id}`}
                      className="rounded-xl bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                      title="Edit Fee"
                    >

                      <Pencil size={18} />

                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(fee.id)
                      }
                      className="rounded-xl bg-red-600 p-2 text-white transition hover:bg-red-700"
                      title="Delete Fee"
                    >

                      <Trash2 size={18} />

                    </button>

                    <Link
  to={`/admin/fees/receipt/${fee.id}`}
  className="rounded-xl bg-amber-600 p-2 text-white transition hover:bg-amber-700"
  title="Receipt"
>
  <Receipt size={18} />
</Link>

<Link
  to="/admin/fees/history"
  className="rounded-xl bg-slate-700 p-2 text-white transition hover:bg-slate-800"
  title="History"
>
  <Eye size={18} />
</Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="space-y-4 p-4 lg:hidden">

        {fees.map((fee) => (

          <div
            key={fee.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-lg font-bold">

                  {fee.studentName}

                </h3>

                <p className="text-sm text-slate-500">

                  Class {fee.class}

                </p>

                <p className="text-sm text-slate-500">

                  {fee.month} {fee.year}

                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                  fee.status
                )}`}
              >

                {fee.status}

              </span>

            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">

              <div>

                <p className="text-xs text-slate-500">

                  Total

                </p>

                <p className="font-semibold">

                  {formatCurrency(
                    fee.totalAmount
                  )}

                </p>

              </div>

              <div>

                <p className="text-xs text-slate-500">

                  Paid

                </p>

                <p className="font-semibold text-green-600">

                  {formatCurrency(
                    fee.paidAmount
                  )}

                </p>

              </div>

              <div>

                <p className="text-xs text-slate-500">

                  Due

                </p>

                <p className="font-semibold text-red-600">

                  {formatCurrency(
                    fee.dueAmount
                  )}

                </p>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <span className="text-sm text-slate-500">

                {fee.paymentMode || "--"}

              </span>

              <div className="flex gap-2">                {fee.status !== "Paid" && (

                  <Link
                    to={`/admin/fees/payment/${fee.id}`}
                    className="rounded-xl bg-emerald-600 p-2 text-white transition hover:bg-emerald-700"
                    title="Record Payment"
                  >

                    <CreditCard size={18} />

                  </Link>

                )}

                <Link
                  to={`/admin/fees/edit/${fee.id}`}
                  className="rounded-xl bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                  title="Edit Fee"
                >

                  <Pencil size={18} />

                </Link>

                <button
                  type="button"
                  onClick={() =>
                    onDelete(fee.id)
                  }
                  className="rounded-xl bg-red-600 p-2 text-white transition hover:bg-red-700"
                  title="Delete Fee"
                >

                  <Trash2 size={18} />

                </button>

                <Link
  to={`/admin/fees/receipt/${fee.id}`}
  className="rounded-xl bg-amber-600 p-2 text-white"
  title="Receipt"
>
  <Receipt size={18} />
</Link>

<Link
  to="/admin/fees/history"
  className="rounded-xl bg-slate-700 p-2 text-white"
  title="History"
>
  <Eye size={18} />
</Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </GlassPanel>
  );
}