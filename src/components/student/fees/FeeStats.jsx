import {
  Wallet,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

import GlassPanel from "../../ui/GlassPanel";

import { formatCurrency } from "../../../utils/feeUtils";

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <GlassPanel className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div
        className={`absolute right-4 top-4 rounded-2xl p-3 ${color}`}
      >
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-black text-slate-900">
        {value}
      </h2>

    </GlassPanel>
  );
}

export default function FeeStats({
  fees = [],
}) {

  const totalFees = fees.reduce(
    (sum, fee) =>
      sum + Number(fee.totalAmount || 0),
    0
  );

  const totalPaid = fees.reduce(
    (sum, fee) =>
      sum + Number(fee.paidAmount || 0),
    0
  );

  const totalDue = fees.reduce(
    (sum, fee) =>
      sum + Number(fee.dueAmount || 0),
    0
  );

  const lastPayment =
    fees.find(
      (fee) =>
        fee.paymentDate
    );

  const lastDate =
    lastPayment?.paymentDate?.toDate
      ? lastPayment.paymentDate
          .toDate()
          .toLocaleDateString()
      : "--";

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Fees"
        value={formatCurrency(totalFees)}
        color="bg-blue-100 text-blue-700"
        icon={<Wallet size={26} />}
      />

      <StatCard
        title="Amount Paid"
        value={formatCurrency(totalPaid)}
        color="bg-green-100 text-green-700"
        icon={<CheckCircle2 size={26} />}
      />

      <StatCard
        title="Outstanding Due"
        value={formatCurrency(totalDue)}
        color="bg-red-100 text-red-700"
        icon={<AlertTriangle size={26} />}
      />

      <StatCard
        title="Last Payment"
        value={lastDate}
        color="bg-amber-100 text-amber-700"
        icon={<CalendarDays size={26} />}
      />

    </div>

  );

}