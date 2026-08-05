import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
} from "lucide-react";

import GlassPanel from "../../../components/ui/GlassPanel";
import FeeTable from "../../../components/admin/fees/FeeTable";

import { getFees } from "../../../services/feeService";

export default function FeeHistory() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function loadFees() {
      try {
        const data = await getFees();

        setFees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFees();
  }, []);

  const filteredFees =
    useMemo(() => {
      const keyword = search
        .toLowerCase()
        .trim();

      return fees.filter((fee) => {
        return (
          fee.studentName
            ?.toLowerCase()
            .includes(keyword) ||
          fee.month
            ?.toLowerCase()
            .includes(keyword) ||
          fee.status
            ?.toLowerCase()
            .includes(keyword) ||
          fee.class
            ?.toString()
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

              Fee History

            </h1>

            <p className="mt-2 text-slate-500">

              View all fee transactions.

            </p>

          </div>

          <div className="rounded-2xl bg-indigo-100 px-6 py-3 font-semibold text-indigo-700">

            <CalendarDays size={18} className="inline mr-2" />

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
            placeholder="Search fee history..."
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