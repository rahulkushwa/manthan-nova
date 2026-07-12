import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
}) {
  if (students.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
        <h2 className="text-2xl font-bold">
          No Students Found
        </h2>

        <p className="mt-3 text-slate-500">
          Try changing your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Class
              </th>

              <th className="px-6 py-4 text-left">
                Board
              </th>

              <th className="px-6 py-4 text-left">
                Phone
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.id}
                className="border-b transition hover:bg-slate-50"
              >

                <td className="px-6 py-5 font-semibold">
                  {student.name}
                </td>

                <td className="px-6 py-5">
                  {student.class}
                </td>

                <td className="px-6 py-5">
                  {student.board}
                </td>

                <td className="px-6 py-5">
                  {student.phone}
                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onView(student)}
                      className="rounded-xl bg-blue-100 p-3 text-blue-700 transition hover:bg-blue-600 hover:text-white"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(student.id)}
                      className="rounded-xl bg-amber-100 p-3 text-amber-700 transition hover:bg-amber-500 hover:text-white"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(student.id)}
                      className="rounded-xl bg-red-100 p-3 text-red-700 transition hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}