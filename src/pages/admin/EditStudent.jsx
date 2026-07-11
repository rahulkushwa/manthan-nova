import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StudentForm from "../../components/admin/student/StudentForm";

import {
  getStudent,
  updateStudent,
} from "../../services/studentService";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function loadStudent() {
      try {
        const data = await getStudent(id);

        if (!data) {
          alert("Student not found.");
          navigate("/admin/manage-students");
          return;
        }

        setStudent(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load student.");
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [id, navigate]);

  async function handleUpdateStudent(formData) {
    try {
      await updateStudent(id, formData);

      alert("Student updated successfully.");

      navigate("/admin/manage-students");
    } catch (error) {
      console.error(error);
      alert("Failed to update student.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading Student...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">
          Edit Student
        </h1>

        <p className="mt-2 text-slate-500">
          Update student information.
        </p>
      </div>

      <StudentForm
        initialData={student}
        onSubmit={handleUpdateStudent}
      />
    </div>
  );
}