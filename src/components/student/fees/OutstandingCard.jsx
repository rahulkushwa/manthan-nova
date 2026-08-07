import {
  AlertTriangle,
  CalendarClock,
  Wallet,
} from "lucide-react";

import GlassPanel from "../../ui/GlassPanel";

export default function OutstandingCard({
  totalDue = 0,
  nextDueMonth = "-",
  pendingFees = [],
}) {
  return (
    <GlassPanel className="overflow-hidden p-0">
      {/* Header */}

      <div className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <AlertTriangle size={28} />
          </div>

          <div>
            <p className="text-sm text-red-100">
              Outstanding Fees
            </p>

            <h2 className="text-3xl font-black">
              ₹{totalDue}
            </h2>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4">
          <div className="flex items-center gap-3">
            <CalendarClock
              size={22}
              className="text-amber-600"
            />

            <span className="font-medium text-slate-600">
              Latest Due
            </span>
          </div>

          <span className="font-bold text-slate-900">
            {nextDueMonth}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4">
          <div className="flex items-center gap-3">
            <Wallet
              size={22}
              className="text-blue-600"
            />

            <span className="font-medium text-slate-600">
              Pending Months
            </span>
          </div>

          <span className="font-bold text-slate-900">
            {pendingFees.length}
          </span>
        </div>

        {pendingFees.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-bold">
              Pending Fee Records
            </h3>

            <div className="space-y-3">
              {pendingFees.map((fee) => (
                <div
                  key={fee.id}
                  className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {fee.month} {fee.year}
                    </p>

                    <p className="text-sm text-slate-500">
                      {fee.status}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-red-600">
                      ₹{fee.dueAmount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pendingFees.length === 0 && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="font-semibold text-emerald-700">
              🎉 Great! No outstanding fees.
            </p>
          </div>
        )}
      </div>
    </GlassPanel>
  );
}