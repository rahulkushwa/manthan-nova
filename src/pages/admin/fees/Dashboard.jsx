import {
  CreditCard,
  PlusCircle,
  Wallet,
  History,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import GlassCard from "../../../components/ui/GlassCard";
import GlassPanel from "../../../components/ui/GlassPanel";

const quickActions = [
  {
    title: "Add Fee",
    description: "Create a new fee record",
    icon: PlusCircle,
    path: "/admin/fees/add",
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Manage Fees",
    description: "View and update fees",
    icon: Wallet,
    path: "/admin/fees/manage",
    color: "from-emerald-600 to-green-500",
  },
  {
    title: "Fee History",
    description: "Payment history",
    icon: History,
    path: "/admin/fees/history",
    color: "from-amber-500 to-orange-500",
  },
];

const stats = [
  {
    title: "Total Fees",
    value: "0",
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Paid Fees",
    value: "0",
    color: "from-emerald-600 to-green-500",
  },
  {
    title: "Pending Fees",
    value: "0",
    color: "from-red-500 to-rose-500",
  },
];

export default function FeesDashboard() {
  return (
    <div className="space-y-10">
      {/* Hero */}

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-10 text-white shadow-2xl">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-200">
            Fees Management
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Manage Student Fees
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Add, manage and monitor student fee payments from one place.
          </p>
        </div>
      </div>

      {/* Quick Actions */}

      <div>
        <h2 className="mb-6 text-3xl font-bold">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.path}
                className="group"
              >
                <GlassCard className="h-full p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-blue-600">
                    Open

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-2"
                    />
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Statistics */}

      <div>
        <h2 className="mb-6 text-3xl font-bold">
          Statistics
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <GlassPanel
              key={item.title}
              className="p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-black">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}
                >
                  <CreditCard
                    size={28}
                    className="text-white"
                  />
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
}