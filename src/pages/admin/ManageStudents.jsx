import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentCard from "../../components/admin/student/StudentCard";

import {
  getStudents,
  deleteStudent,
} from "../../services/studentService";

export default function ManageStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  async function loadStudents() {
    const data = await getStudents();

    setStudents(data);
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    await deleteStudent(id);

    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    );
  }

  function handleEdit(id) {
    navigate(`/admin/edit-student/${id}`);
  }

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesClass =
        selectedClass === "" ||
        student.class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, search, selectedClass]);

  if (loading) {
    return (
      <div className="p-8 text-xl font-bold">
        Loading Students...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="mb-8 text-4xl font-black">
        Manage Students
      </h1>

      {/* Search */}

      <div className="mb-8 grid gap-4 md:grid-cols-2">

        <input
          placeholder="Search student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-xl border p-4"
        />

        <select
          value={selectedClass}
          onChange={(e) =>
            setSelectedClass(e.target.value)
          }
          className="rounded-xl border p-4"
        >
          <option value="">
            All Classes
          </option>

          {[6,7,8,9,10].map((cls)=>(
            <option
              key={cls}
              value={String(cls)}
            >
              Class {cls}
            </option>
          ))}

        </select>

      </div>

      {filteredStudents.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          No students found.
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredStudents.map((student)=>(
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}

        </div>

      )}

    </div>
  );
}