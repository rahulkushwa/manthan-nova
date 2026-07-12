import {
  X,
  User,
  Phone,
  Mail,
  School,
  Calendar,
  GraduationCap,
  Users,
  MapPin,
} from "lucide-react";

export default function StudentProfileCard({
  student,
  onClose,
}) {
  if (!student) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Student Profile
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

              <User
                size={50}
                className="text-blue-600"
              />

            </div>

            <h2 className="mt-5 text-2xl font-bold">
              {student.name}
            </h2>

            <p className="text-slate-500">
              Student
            </p>

          </div>

          {/* Information */}

          <div className="mt-10 space-y-5">

            <InfoRow
              icon={GraduationCap}
              label="Class"
              value={student.class}
            />

            <InfoRow
              icon={School}
              label="Board"
              value={student.board}
            />

            <InfoRow
              icon={Phone}
              label="Phone"
              value={student.phone}
            />

            <InfoRow
              icon={Mail}
              label="Email"
              value={student.email}
            />

            <InfoRow
              icon={Users}
              label="Parent"
              value={student.parentName}
            />

            <InfoRow
              icon={Phone}
              label="Parent Phone"
              value={student.parentPhone}
            />

            <InfoRow
              icon={School}
              label="School"
              value={student.school}
            />

            <InfoRow
              icon={MapPin}
              label="Address"
              value={student.address}
            />

            <InfoRow
              icon={Calendar}
              label="Admission Date"
              value={student.admissionDate}
            />

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-6">

          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4">

      <div className="rounded-xl bg-slate-100 p-3">

        <Icon
          size={20}
          className="text-blue-600"
        />

      </div>

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <h3 className="mt-1 font-semibold break-words">
          {value || "—"}
        </h3>

      </div>

    </div>
  );
}