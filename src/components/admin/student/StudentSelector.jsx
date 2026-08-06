import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CheckCircle2,
  User,
  Phone,
  GraduationCap,
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

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Select Student
          </h2>

          <p className="mt-1 text-slate-500">
            Search and choose a student.
          </p>

        </div>

        <div className="flex w-full items-center justify-center rounded-xl bg-blue-100 px-4 py-2 font-semibold text-blue-700 sm:w-auto">

          {filteredStudents.length} Students

        </div>

      </div>

      {/* Search */}

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
          placeholder="Search by name, phone, class..."
          className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600"
        />

      </div>

      {loading ? (

        <div className="py-12 text-center text-slate-500">

          Loading students...

        </div>

      ) : filteredStudents.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-500">

          No students found.

        </div>

      ) : (
        <>
          {/* ================= Desktop ================= */}

          <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 lg:block">

            <table className="min-w-full">

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
                      value?.id === student.id;

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
                          {student.board || "-"}
                        </td>

                        <td className="px-5 py-4">
                          {student.phone || "-"}
                        </td>

                        <td className="px-5 py-4 text-center">

                          {selected ? (

                            <span className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl bg-green-100 px-4 py-2 font-semibold text-green-700">

                              <CheckCircle2 size={18} />

                              Selected

                            </span>

                          ) : (

                            <button
                              type="button"
                              onClick={() =>
                                onSelect(student)
                              }
                              className="min-w-[120px] rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
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

          {/* ================= Mobile ================= */}
                    <div className="space-y-4 lg:hidden">

            {filteredStudents.map((student) => {
              const selected =
                value?.id === student.id;

              return (

                <div
                  key={student.id}
                  className={`rounded-2xl border p-5 transition ${
                    selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white"
                  }`}
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">

                      {student.photoURL ? (

                        <img
                          src={student.photoURL}
                          alt={student.name}
                          className="h-full w-full rounded-2xl object-cover"
                        />

                      ) : (

                        <User size={26} />

                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-lg font-bold">

                        {student.name}

                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">

                        <GraduationCap size={16} />

                        <span>

                          Class {student.class} •{" "}
                          {student.board}

                        </span>

                      </div>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">

                        <Phone size={16} />

                        <span>

                          {student.phone || "-"}

                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="mt-5">

                    {selected ? (

                      <div className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-100 font-semibold text-green-700">

                        <CheckCircle2 size={18} />

                        Selected

                      </div>

                    ) : (

                      <button
                        type="button"
                        onClick={() =>
                          onSelect(student)
                        }
                        className="h-12 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
                      >

                        Select Student

                      </button>

                    )}

                  </div>

                </div>

              );
            })}

          </div>

        </>
      )}

    </GlassPanel>
  );
}