import { useEffect, useMemo, useState } from "react";
import {
  Receipt,
  Search,
} from "lucide-react";

import GlassPanel from "../../../components/ui/GlassPanel";
import FeeTable from "../../../components/admin/fees/FeeTable";

import { useAuth } from "../../../hooks/useAuth";
import { getStudentFees } from "../../../services/feeService";

export default function PaymentHistory() {
  const { profile } = useAuth();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function loadHistory() {
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

    loadHistory();
  }, [profile]);

  const filteredFees =
    useMemo(() => {
      const keyword = search
        .toLowerCase()
        .trim();

      return fees.filter((fee) => {
        return (
          fee.month
            ?.toLowerCase()
            .includes(keyword) ||
          fee.status
            ?.toLowerCase()
            .includes(keyword) ||
          fee.paymentMode
            ?.toLowerCase()
            .includes(keyword)
        );
      });
    }, [fees, search]);

  return (
    <div className="space-y-8">

      <GlassPanel>

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black">

              Payment History

            </h1>

            <p className="mt-2 text-slate-500">

              View all your previous fee
              payments.

            </p>

          </div>

          <div className="rounded-2xl bg-indigo-100 px-6 py-3 font-semibold text-indigo-700">

            <Receipt
              size={18}
              className="mr-2 inline"
            />

            {filteredFees.length} Records

          </div>

        </div>

      </GlassPanel>

      <GlassPanel>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by month, status or payment mode..."
            className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600"
          />

        </div>

      </GlassPanel>

      <FeeTable
        fees={filteredFees}
        loading={loading}
        onDelete={() => {}}
      />

    </div>
  );
}