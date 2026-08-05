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
    <div className="space-y-8">

      {/* Header */}

      <GlassPanel>

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black">
              Add Student Fee
            </h1>

            <p className="mt-3 text-slate-500">
              Select a student and create a
              monthly fee record.
            </p>

          </div>

          <div className="rounded-2xl bg-blue-100 px-6 py-3 font-semibold text-blue-700">

            Fee Management

          </div>

        </div>

      </GlassPanel>

      {/* Student Selector */}

      <StudentSelector
        value={selectedStudent}
        onSelect={setSelectedStudent}
      />

      {/* Selected Student */}

      {selectedStudent && (

        <GlassPanel>

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold">

                Selected Student

              </h2>

              <p className="mt-2 text-slate-500">

                Verify the student details before
                creating the fee record.

              </p>

            </div>

            <div className="rounded-2xl bg-green-100 px-6 py-3 font-semibold text-green-700">

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
                className="h-44 w-44 rounded-3xl border-4 border-white object-cover shadow-xl"
              />

              <h3 className="mt-5 text-2xl font-bold">

                {selectedStudent.name}

              </h3>

            </div>

            {/* Details */}

            <div className="grid gap-5 md:grid-cols-2">

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
                value={
                  selectedStudent.admissionDate
                }
              />

              <InfoCard
                icon={<BadgeCheck size={20} />}
                label="Status"
                value={
                  selectedStudent.status
                }
              />

              <div className="md:col-span-2">

                <InfoCard
                  icon={<User size={20} />}
                  label="School"
                  value={
                    selectedStudent.school
                  }
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

        {icon}

      </div>

      <p className="text-sm text-slate-500">

        {label}

      </p>

      <h3 className="mt-2 text-lg font-bold break-words">

        {value || "-"}

      </h3>

    </div>
  );
}