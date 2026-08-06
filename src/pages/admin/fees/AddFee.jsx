import { useState } from "react";
import {
  User,
  Phone,
  School,
  GraduationCap,
  Calendar,
  Mail,
  BadgeCheck,
} from "lucide-react";

import GlassPanel from "../../../components/ui/GlassPanel";

import StudentSelector from "../../../components/admin/student/StudentSelector";
import FeeForm from "../../../components/admin/fees/FeeForm";

export default function AddFee() {
  const [selectedStudent, setSelectedStudent] =
    useState(null);

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">

      {/* Header */}

      <GlassPanel>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-black sm:text-4xl">
              Add Student Fee
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Select a student and create a monthly fee record.
            </p>

          </div>

          <div className="flex w-full items-center justify-center rounded-2xl bg-blue-100 px-5 py-3 font-semibold text-blue-700 sm:w-auto">

            Fee Management

          </div>

        </div>

      </GlassPanel>

      {/* Student Selector */}

      <StudentSelector
        value={selectedStudent}
        onSelect={setSelectedStudent}
      />

      {/* Student Details */}

      {selectedStudent && (

        <GlassPanel>

          <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Selected Student
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Verify the student details before creating the fee record.
              </p>

            </div>

            <div className="flex w-full items-center justify-center rounded-2xl bg-green-100 px-5 py-3 font-semibold text-green-700 sm:w-auto">

              ✓ Selected

            </div>

          </div>

          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">

            {/* Photo */}

            <div className="flex flex-col items-center">

              <img
                src={
                  selectedStudent.photoURL ||
                  "https://placehold.co/200x200?text=Student"
                }
                alt={selectedStudent.name}
                className="h-36 w-36 rounded-3xl border-4 border-white object-cover shadow-xl sm:h-44 sm:w-44"
              />

              <h3 className="mt-4 text-center text-xl font-bold sm:text-2xl">

                {selectedStudent.name}

              </h3>

            </div>

            {/* Details */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <InfoCard
                icon={<GraduationCap size={20} />}
                label="Class"
                value={selectedStudent.class}
              />

              <InfoCard
                icon={<School size={20} />}
                label="Board"
                value={selectedStudent.board}
              />

              <InfoCard
                icon={<Phone size={20} />}
                label="Phone"
                value={selectedStudent.phone}
              />

              <InfoCard
                icon={<Mail size={20} />}
                label="Email"
                value={selectedStudent.email}
              />

              <InfoCard
                icon={<Calendar size={20} />}
                label="Admission Date"
                value={selectedStudent.admissionDate}
              />

              <InfoCard
                icon={<BadgeCheck size={20} />}
                label="Status"
                value={selectedStudent.status}
              />

              <div className="sm:col-span-2">

                <InfoCard
                  icon={<User size={20} />}
                  label="School"
                  value={selectedStudent.school}
                />

              </div>

            </div>

          </div>

        </GlassPanel>

      )}

      {/* Fee Form */}

      {selectedStudent && (
        <FeeForm
          student={selectedStudent}
        />
      )}

    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:shadow-md sm:p-5">

      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

        {icon}

      </div>

      <p className="text-xs uppercase tracking-wide text-slate-500">

        {label}

      </p>

      <h3 className="mt-2 break-words text-base font-bold sm:text-lg">

        {value || "-"}

      </h3>

    </div>
  );
}