import { useEffect, useMemo, useState } from "react";
import {
  RefreshCw,
  Search,
} from "lucide-react";

import GlassPanel from "../../../components/ui/GlassPanel";
import FeeTable from "../../../components/admin/fees/FeeTable";

import {
  deleteFee,
  getFees,
} from "../../../services/feeService";

export default function ManageFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  async function loadFees() {
    try {
      setLoading(true);

      const data = await getFees();

      setFees(data);
    } catch (err) {
      console.error(err);

      alert("Unable to load fee records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFees();
  }, []);

  async function handleDelete(id) {
    const confirmDelete =
      window.confirm(
        "Delete this fee record?"
      );

    if (!confirmDelete) return;

    try {
      await deleteFee(id);

      setFees((prev) =>
        prev.filter(
          (fee) => fee.id !== id
        )
      );
    } catch (err) {
      console.error(err);

      alert("Unable to delete.");
    }
  }

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
          fee.class
            ?.toString()
            .includes(keyword) ||
          fee.month
            ?.toLowerCase()
            .includes(keyword) ||
          fee.status
            ?.toLowerCase()
            .includes(keyword)
        );
      });
    }, [fees, search]);

  return (
    <div className="space-y-8">

      <GlassPanel>

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <h1 className="text-4xl font-black">
              Manage Fees
            </h1>

            <p className="mt-2 text-slate-500">
              Search, update and manage
              student fee records.
            </p>

          </div>

          <button
            onClick={loadFees}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >

            <RefreshCw size={18} />

            Refresh

          </button>

        </div>

      </GlassPanel>

      <GlassPanel>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search by student, class, month or status..."
            className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600"
          />

        </div>

      </GlassPanel>

      <FeeTable
        fees={filteredFees}
        loading={loading}
        onDelete={handleDelete}
      />

    </div>
  );
}