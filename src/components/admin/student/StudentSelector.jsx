import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CheckCircle2,
} from "lucide-react";

import GlassPanel from "../../ui/GlassPanel";
import { getStudents } from "../../../services/studentService";

export default function StudentSelector({
  value,
  onSelect,
}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        const data =
          await getStudents();

        setStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  const filteredStudents =
    useMemo(() => {
      const keyword = search
        .toLowerCase()
        .trim();

      return students.filter(
        (student) => {
          return (
            student.name
              ?.toLowerCase()
              .includes(keyword) ||
            student.phone
              ?.toLowerCase()
              .includes(keyword) ||
            student.class
              ?.toString()
              .includes(keyword) ||
            student.board
              ?.toLowerCase()
              .includes(keyword)
          );
        }
      );
    }, [students, search]);

  return (
    <GlassPanel className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Select Student
          </h2>

          <p className="mt-1 text-slate-500">
            Search and choose a
            student.
          </p>

        </div>

        <div className="rounded-xl bg-blue-100 px-4 py-2 font-semibold text-blue-700">

          {filteredStudents.length} Students

        </div>

      </div>

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
          placeholder="Search by name, phone, class or board..."
          className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600"
        />

      </div>

      {loading ? (

        <div className="py-12 text-center text-slate-500">

          Loading students...

        </div>

      ) : filteredStudents.length ===
        0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-500">

          No students found.

        </div>

      ) : (

        <div className="overflow-hidden rounded-2xl border border-slate-200">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-5 py-4 text-left">
                  Student
                </th>

                <th className="px-5 py-4 text-left">
                  Class
                </th>

                <th className="px-5 py-4 text-left">
                  Board
                </th>

                <th className="px-5 py-4 text-left">
                  Phone
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.map(
                (student) => {
                  const selected =
                    value?.id ===
                    student.id;

                  return (
                    <tr
                      key={student.id}
                      className={`border-t transition ${
                        selected
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                      }`}
                    >

                      <td className="px-5 py-4 font-semibold">

                        {student.name}

                      </td>

                      <td className="px-5 py-4">

                        {student.class}

                      </td>

                      <td className="px-5 py-4">

                        {student.board ||
                          "-"}

                      </td>

                      <td className="px-5 py-4">

                        {student.phone ||
                          "-"}

                      </td>

                      <td className="px-5 py-4 text-center">

                        {selected ? (

                          <span className="inline-flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 font-semibold text-green-700">

                            <CheckCircle2
                              size={18}
                            />

                            Selected

                          </span>

                        ) : (

                          <button
                            type="button"
                            onClick={() =>
                              onSelect(
                                student
                              )
                            }
                            className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
                          >

                            Select

                          </button>

                        )}

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      )}

    </GlassPanel>
  );
}