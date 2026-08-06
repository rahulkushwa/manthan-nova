import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import ResponsiveTable from "../../ui/ResponsiveTable";

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
}) {

  return (

    <ResponsiveTable

      data={students}

      emptyTitle="No Students Found"

      emptyDescription="Try changing your filters."

      columns={[

        {
          key: "name",
          title: "Name",
        },

        {
          key: "class",
          title: "Class",
        },

        {
          key: "board",
          title: "Board",
        },

        {
          key: "phone",
          title: "Phone",
        },

        {
          key: "actions",
          title: "Actions",
          align: "center",
        },

      ]}

      renderRow={(student) => (

        <>

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

        </>

      )}

      renderCard={(student) => (

        <div className="space-y-4">

          <div>

            <h2 className="text-lg font-bold">

              {student.name}

            </h2>

            <p className="text-sm text-slate-500">

              Class {student.class}

            </p>

          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>

              <p className="text-slate-500">

                Board

              </p>

              <p className="font-medium">

                {student.board}

              </p>

            </div>

            <div>

              <p className="text-slate-500">

                Phone

              </p>

              <p className="font-medium">

                {student.phone}

              </p>

            </div>

          </div>

          <div className="flex justify-between pt-2">

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

        </div>

      )}

    />

  );

}