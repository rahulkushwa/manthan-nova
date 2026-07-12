import { UserCircle2 } from "lucide-react";

export default function RecentStudents({ students }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Students
      </h2>

      {students.length === 0 ? (
        <p className="text-slate-500">
          No students added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between rounded-2xl border p-4"
            >
              <div className="flex items-center gap-4">
                <UserCircle2
                  size={42}
                  className="text-blue-600"
                />

                <div>
                  <h3 className="font-bold">
                    {student.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Class {student.class} • {student.board}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Active
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}