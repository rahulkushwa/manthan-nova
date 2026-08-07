import {
  Wallet,
  CircleDollarSign,
  AlertTriangle,
  TrendingUp,
  CalendarClock,
} from "lucide-react";

import GlassPanel from "../../ui/GlassPanel";

const statConfig = [
  {
    key: "totalFees",
    title: "Total Fees",
    icon: Wallet,
    color: "from-blue-600 to-cyan-500",
    prefix: "₹",
  },
  {
    key: "totalPaid",
    title: "Total Paid",
    icon: CircleDollarSign,
    color: "from-emerald-600 to-green-500",
    prefix: "₹",
  },
  {
    key: "totalDue",
    title: "Total Due",
    icon: AlertTriangle,
    color: "from-red-500 to-rose-500",
    prefix: "₹",
  },
  {
    key: "completion",
    title: "Completion",
    icon: TrendingUp,
    color: "from-violet-600 to-purple-500",
    suffix: "%",
  },
  {
    key: "nextDueMonth",
    title: "Next Due",
    icon: CalendarClock,
    color: "from-amber-500 to-orange-500",
  },
];

export default function FeeStats({
  stats,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {statConfig.map((item) => {
        const Icon = item.icon;

        const value =
          stats?.[item.key] ??
          (item.key === "nextDueMonth"
            ? "-"
            : 0);

        return (
          <GlassPanel
            key={item.key}
            className="h-full p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-4 break-words text-3xl font-black text-slate-900">
                  {item.prefix}
                  {value}
                  {item.suffix}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} shadow-lg`}
              >
                <Icon
                  size={26}
                  className="text-white"
                />
              </div>
            </div>
          </GlassPanel>
        );
      })}
    </div>
  );
}