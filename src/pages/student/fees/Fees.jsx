import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  Wallet,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import GlassPanel from "../../../components/ui/GlassPanel";
import FeeTable from "../../../components/admin/fees/FeeTable";

import { useAuth } from "../../../hooks/useAuth";
import { getStudentFees } from "../../../services/feeService";

import { formatCurrency } from "../../../utils/feeUtils";

export default function StudentFees() {
  const { profile } = useAuth();

  const [fees, setFees] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadFees() {
      if (!profile?.id) return;

      try {
        const data =
          await getStudentFees(
            profile.id
          );

        setFees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFees();
  }, [profile]);

  const summary = useMemo(() => {
    let total = 0;
    let paid = 0;
    let due = 0;

    fees.forEach((fee) => {
      total += Number(
        fee.totalAmount || 0
      );

      paid += Number(
        fee.paidAmount || 0
      );

      due += Number(
        fee.dueAmount || 0
      );
    });

    return {
      total,
      paid,
      due,
    };
  }, [fees]);

  return (
    <div className="space-y-8">

      <GlassPanel>

        <h1 className="text-4xl font-black">

          My Fees

        </h1>

        <p className="mt-3 text-slate-500">

          View your complete fee
          details and payment history.

        </p>

      </GlassPanel>

      <div className="grid gap-6 md:grid-cols-3">

        <SummaryCard
          title="Total Fees"
          value={formatCurrency(
            summary.total
          )}
          color="bg-blue-100 text-blue-700"
          icon={<CreditCard />}
        />

        <SummaryCard
          title="Paid Amount"
          value={formatCurrency(
            summary.paid
          )}
          color="bg-green-100 text-green-700"
          icon={<CheckCircle2 />}
        />

        <SummaryCard
          title="Pending"
          value={formatCurrency(
            summary.due
          )}
          color="bg-red-100 text-red-700"
          icon={<AlertCircle />}
        />

      </div>

      <GlassPanel>

        <div className="flex items-center gap-3">

          <Wallet
            className="text-blue-600"
            size={24}
          />

          <h2 className="text-2xl font-bold">

            Payment History

          </h2>

        </div>

      </GlassPanel>

      <FeeTable
        fees={fees}
        loading={loading}
        onDelete={() => {}}
      />

    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <GlassPanel>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500">

            {title}

          </p>

          <h2 className="mt-3 text-3xl font-black">

            {value}

          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >

          {icon}

        </div>

      </div>

    </GlassPanel>
  );
}