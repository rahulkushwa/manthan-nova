import { TrendingUp } from "lucide-react";

import GlassPanel from "../../ui/GlassPanel";

export default function FeeProgress({
  totalFees = 0,
  totalPaid = 0,
  completion = 0,
}) {
  const percentage = Math.min(
    Math.max(Number(completion || 0), 0),
    100
  );

  const radius = 58;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (percentage / 100) *
      circumference;

  return (
    <GlassPanel className="p-6 lg:p-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500">
              <TrendingUp
                size={24}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Payment Progress
              </h2>

              <p className="text-slate-500">
                Overall fee completion
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium text-slate-600">
                Progress
              </span>

              <span className="font-bold text-blue-600">
                {percentage}%
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm text-slate-500">
                Paid
              </p>

              <h3 className="mt-2 text-3xl font-black text-emerald-600">
                ₹{totalPaid}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm text-slate-500">
                Total Fees
              </p>

              <h3 className="mt-2 text-3xl font-black text-blue-700">
                ₹{totalFees}
              </h3>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex justify-center">
          <div className="relative h-44 w-44">
            <svg
              className="-rotate-90"
              width="176"
              height="176"
            >
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="transparent"
              />

              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="url(#progressGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={
                  circumference
                }
                strokeDashoffset={offset}
                style={{
                  transition:
                    "stroke-dashoffset .7s ease",
                }}
              />

              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                  />

                  <stop
                    offset="50%"
                    stopColor="#06b6d4"
                  />

                  <stop
                    offset="100%"
                    stopColor="#10b981"
                  />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900">
                {percentage}%
              </span>

              <span className="mt-1 text-sm text-slate-500">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}