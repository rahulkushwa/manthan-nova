import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentTable from "../../components/admin/student/StudentTable";
import StudentStats from "../../components/admin/student/StudentStats";
import StudentProfileCard from "../../components/admin/student/StudentProfileCard";
import DeleteStudentModal from "../../components/admin/student/DeleteStudentModal";

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

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleDelete(id) {
  const student = students.find((s) => s.id === id);

  setStudentToDelete(student);
  setDeleteModal(true);
}

  async function confirmDelete() {
  if (!studentToDelete) return;

  try {
    await deleteStudent(studentToDelete.id);

    setStudents((prev) =>
      prev.filter((s) => s.id !== studentToDelete.id)
    );

    if (selectedStudent?.id === studentToDelete.id) {
      setSelectedStudent(null);
    }

    setDeleteModal(false);
    setStudentToDelete(null);
  } catch (error) {
    console.error(error);
  }
}
  function handleEdit(id) {
    navigate(`/admin/edit-student/${id}`);
  }

  function handleView(student) {
    setSelectedStudent(student);
  }

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name
          ?.toLowerCase()
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
    <div className="space-y-8 p-8">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-black">
          Manage Students
        </h1>

        <p className="mt-2 text-slate-500">
          View, search and manage all enrolled students.
        </p>

      </div>

      {/* Statistics */}

      <StudentStats students={students} />

      {/* Filters */}

      <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-lg md:grid-cols-2">

        <input
          type="text"
          placeholder="Search by student name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
        >
          <option value="">
            All Classes
          </option>

          {[6, 7, 8, 9, 10].map((cls) => (
            <option
              key={cls}
              value={String(cls)}
            >
              Class {cls}
            </option>
          ))}

        </select>

      </div>

      {/* Student Table */}

      <StudentTable
        students={filteredStudents}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Student Profile */}

      {selectedStudent && (
        <StudentProfileCard
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      <DeleteStudentModal
  open={deleteModal}
  student={studentToDelete}
  onClose={() => {
    setDeleteModal(false);
    setStudentToDelete(null);
  }}
  onConfirm={confirmDelete}
/>

    </div>
  );
}