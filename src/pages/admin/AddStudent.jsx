import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StudentForm from "../../components/admin/student/StudentForm";
import StudentCredentialsModal from "../../components/admin/student/StudentCredentialsModal";

import { addStudent } from "../../services/studentService";
import { createStudentAccount } from "../../services/authAdminService";
import { createUserProfile } from "../../services/userService";
import { sendStudentCredentialsEmail } from "../../services/emailService";

export default function AddStudent() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] =
    useState(false);

  const [credentials, setCredentials] =
    useState(null);

  async function handleAddStudent(student) {
    try {
      // ==========================================
      // 1. Create Firebase Authentication account
      // ==========================================

      const firebaseUser =
        await createStudentAccount(
          student.loginEmail,
          student.temporaryPassword
        );

      // ==========================================
      // 2. Create Firestore users/{uid}
      // ==========================================

      await createUserProfile(
        firebaseUser.uid,
        {
          email: student.loginEmail,
          role: "student",
        }
      );

      // ==========================================
      // 3. Create Firestore students document
      // ==========================================

      await addStudent({
        ...student,
        uid: firebaseUser.uid,
        firstLogin: true,
      });

      // ==========================================
      // 4. Send credentials email
      // ==========================================

      try {
        await sendStudentCredentialsEmail({
          studentName: student.name,
          loginEmail: student.loginEmail,
          temporaryPassword:
            student.temporaryPassword,
          recipientEmail: student.parentEmail,
        });

        toast.success(
          "Student created and credentials email sent."
        );
      } catch (emailError) {
        console.error(
          "Credentials email error:",
          emailError
        );

        toast.error(
          "Student created, but credentials email could not be sent."
        );
      }

      // ==========================================
      // 5. Show credentials to admin
      // ==========================================

      setCredentials({
        name: student.name,
        loginEmail: student.loginEmail,
        temporaryPassword:
          student.temporaryPassword,
      });

      setOpenModal(true);
    } catch (error) {
      console.error(
        "Student creation error:",
        error
      );

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error(
            "Login email already exists."
          );
          break;

        case "auth/invalid-email":
          toast.error(
            "Invalid login email."
          );
          break;

        case "auth/weak-password":
          toast.error(
            "Password must be at least 6 characters."
          );
          break;

        case "permission-denied":
          toast.error(
            "You do not have permission to create this student."
          );
          break;

        default:
          toast.error(
            error.message ||
              "Failed to create student."
          );
      }
    }
  }

  function handleCloseModal() {
    setOpenModal(false);

    navigate("/admin/manage-students");
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Add Student
        </h1>

        <p className="mt-2 text-slate-500">
          Register a new student in Manthan Nova.
        </p>
      </div>

      <StudentForm
        onSubmit={handleAddStudent}
      />

      <StudentCredentialsModal
        open={openModal}
        onClose={handleCloseModal}
        credentials={credentials}
      />

    </div>
  );
}