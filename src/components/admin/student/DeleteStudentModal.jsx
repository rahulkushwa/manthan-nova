import { AlertTriangle } from "lucide-react";

export default function DeleteStudentModal({
  open,
  student,
  onClose,
  onConfirm,
}) {
  if (!open || !student) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle
              size={40}
              className="text-red-600"
            />

          </div>

          <h2 className="mt-6 text-center text-3xl font-bold">
            Delete Student?
          </h2>

          <p className="mt-4 text-center text-slate-500">
            Are you sure you want to delete
          </p>

          <p className="mt-2 text-center text-xl font-bold">
            {student.name}
          </p>

          <p className="mt-4 text-center text-sm text-red-500">
            This action cannot be undone.
          </p>

          <div className="mt-8 flex gap-4">

            <button
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </>
  );
}