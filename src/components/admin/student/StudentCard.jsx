import { Pencil, Trash2, User } from "lucide-react";

export default function StudentCard({
  student,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:shadow-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <User
          size={30}
          className="text-blue-600"
        />
      </div>

      <h2 className="mt-5 text-2xl font-bold">
        {student.name}
      </h2>

      <p className="mt-2 text-slate-500">
        Class {student.class}
      </p>

      <p className="text-slate-500">
        {student.board}
      </p>

      <p className="text-slate-500">
        {student.phone}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onEdit(student.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white hover:bg-amber-600"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={() => onDelete(student.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}