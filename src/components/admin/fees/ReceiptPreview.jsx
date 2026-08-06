import logo from "../../../assets/images/teacher.png";

import {
  formatCurrency,
} from "../../../utils/feeUtils";

export default function ReceiptPreview({
  fee,
}) {

  if (!fee) return null;

  return (

    <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b-4 border-blue-700 px-10 py-8">

        <div className="flex items-center gap-5">

          <img
            src={logo}
            alt="Manthan Nova"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>

            <h1 className="text-3xl font-black tracking-wide text-blue-800">

              MANTHAN NOVA

            </h1>

            <p className="text-slate-500">

              Coaching Institute

            </p>

            <p className="text-sm text-slate-400">

              East College Para, Raniganj,
              West Bengal

            </p>

          </div>

        </div>

        <div className="rounded-2xl border-2 border-blue-700 px-6 py-4 text-center">

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">

            Fee Receipt

          </p>

          <h2 className="mt-2 text-lg font-black text-blue-700">

            {fee.receiptNo || fee.id}

          </h2>

        </div>

      </div>
            {/* Student Details */}

      <div className="grid gap-6 border-b border-slate-200 p-8 md:grid-cols-2">

        <div>

          <p className="text-sm text-slate-500">

            Student Name

          </p>

          <h3 className="mt-2 text-2xl font-bold">

            {fee.studentName}

          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Class

          </p>

          <h3 className="mt-2 text-2xl font-bold">

            {fee.class}

          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Board

          </p>

          <h3 className="mt-2 text-xl font-semibold">

            {fee.board || "--"}

          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Academic Month

          </p>

          <h3 className="mt-2 text-xl font-semibold">

            {fee.month} {fee.year}

          </h3>

        </div>

      </div>

      {/* Payment Details */}

      <div className="p-8">

        <h2 className="mb-6 text-2xl font-bold text-blue-800">

          Payment Details

        </h2>

        <div className="overflow-hidden rounded-2xl border border-slate-200">

          <table className="w-full">

            <tbody>

              <tr className="border-b">

                <td className="bg-slate-50 px-6 py-4 font-semibold">

                  Payment Mode

                </td>

                <td className="px-6 py-4">

                  {fee.paymentMode || "--"}

                </td>

              </tr>

              <tr className="border-b">

                <td className="bg-slate-50 px-6 py-4 font-semibold">

                  Payment Date

                </td>

                <td className="px-6 py-4">

                  {fee.paymentDate?.toDate
                    ? fee.paymentDate
                        .toDate()
                        .toLocaleDateString()
                    : "--"}

                </td>

              </tr>

              <tr>

                <td className="bg-slate-50 px-6 py-4 font-semibold">

                  Status

                </td>

                <td className="px-6 py-4 font-bold">

                  {fee.status}

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>
            {/* Fee Summary */}

      <div className="border-t border-slate-200 p-8">

        <h2 className="mb-6 text-2xl font-bold text-blue-800">

          Fee Summary

        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-slate-100 p-6 text-center">

            <p className="text-sm text-slate-500">

              Total Fee

            </p>

            <h3 className="mt-2 text-3xl font-black">

              {formatCurrency(
                fee.totalAmount
              )}

            </h3>

          </div>

          <div className="rounded-2xl bg-green-50 p-6 text-center">

            <p className="text-sm text-green-700">

              Amount Paid

            </p>

            <h3 className="mt-2 text-3xl font-black text-green-700">

              {formatCurrency(
                fee.paidAmount
              )}

            </h3>

          </div>

          <div className="rounded-2xl bg-red-50 p-6 text-center">

            <p className="text-sm text-red-700">

              Due Amount

            </p>

            <h3 className="mt-2 text-3xl font-black text-red-700">

              {formatCurrency(
                fee.dueAmount
              )}

            </h3>

          </div>

        </div>

      </div>

      {/* Remarks */}

      <div className="border-t border-slate-200 p-8">

        <h2 className="mb-4 text-2xl font-bold text-blue-800">

          Remarks

        </h2>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <p className="leading-7 text-slate-600">

            {fee.remarks || "No remarks available."}

          </p>

        </div>

      </div>
            {/* Footer */}

      <div className="border-t border-slate-200 px-8 py-10">

        <div className="flex items-end justify-between">

          <div>

            <h3 className="text-xl font-bold text-blue-800">

              Thank You!

            </h3>

            <p className="mt-3 max-w-md leading-7 text-slate-600">

              Thank you for your payment.

              We appreciate your trust in
              <span className="font-semibold">

                {" "}Manthan Nova Coaching Institute

              </span>.

              Please keep this receipt for future reference.

            </p>

          </div>

          <div className="w-56 text-center">

            <div className="mt-16 border-t-2 border-slate-700 pt-3">

              <p className="font-semibold">

                Authorized Signature

              </p>

            </div>

          </div>

        </div>

      </div>
          </div>

  );

}