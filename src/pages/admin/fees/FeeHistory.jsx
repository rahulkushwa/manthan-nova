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
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

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

  const filteredFees = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return fees.filter((fee) => {
      return (
        fee.studentName?.toLowerCase().includes(keyword) ||
        fee.month?.toLowerCase().includes(keyword) ||
        fee.status?.toLowerCase().includes(keyword) ||
        fee.class?.toString().includes(keyword)
      );
    });
  }, [fees, search]);

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">

      {/* Header */}

      <GlassPanel>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-black sm:text-4xl">
              Fee History
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View all fee transactions.
            </p>

          </div>

          <div className="flex w-full items-center justify-center rounded-2xl bg-indigo-100 px-5 py-3 font-semibold text-indigo-700 sm:w-auto">

            <CalendarDays
              size={18}
              className="mr-2"
            />

            {filteredFees.length} Records

          </div>

        </div>

      </GlassPanel>

      {/* Search */}

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
            className="w-full rounded-2xl border border-slate-300 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:text-base"
          />

        </div>

      </GlassPanel>

      {/* Table */}

      <FeeTable
        fees={filteredFees}
        loading={loading}
        onDelete={() => {}}
      />

    </div>
  );
}