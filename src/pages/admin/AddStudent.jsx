import { useNavigate } from "react-router-dom";

import StudentForm from "../../components/admin/student/StudentForm";
import { addStudent } from "../../services/studentService";

export default function AddStudent() {
  const navigate = useNavigate();

  async function handleAddStudent(student) {
    try {
      await addStudent(student);

      alert("Student added successfully.");

      navigate("/admin/manage-students");
    } catch (error) {
      console.error(error);
      alert("Failed to add student.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">
          Add Student
        </h1>

        <p className="mt-2 text-slate-500">
          Register a new student in Manthan Nova.
        </p>
      </div>

      <StudentForm onSubmit={handleAddStudent} />
    </div>
  );
}