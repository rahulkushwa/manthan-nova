import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// ================= PUBLIC PAGES =================

import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import Testimonials from "../pages/Testimonials";
import Notes from "../pages/Notes";
import FAQ from "../pages/FAQ";
import Admission from "../pages/Admission";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

// ================= AUTH =================

import Login from "../pages/auth/Login";

// ================= STUDENT =================

import Dashboard from "../pages/student/Dashboard";
import StudentNotes from "../pages/student/Notes";
import StudentHomework from "../pages/student/Homework";
import StudentAnnouncements from "../pages/student/Announcements";
import Profile from "../pages/student/Profile";

import StudentFees from "../pages/student/fees/Fees";
import PaymentHistory from "../pages/student/fees/PaymentHistory";

// ================= ADMIN =================

import AdminDashboard from "../pages/admin/Dashboard";

import UploadNotes from "../pages/admin/UploadNotes";
import ManageNotes from "../pages/admin/ManageNotes";
import EditNote from "../pages/admin/EditNote";

import UploadHomework from "../pages/admin/UploadHomework";
import ManageHomework from "../pages/admin/ManageHomework";
import EditHomework from "../pages/admin/EditHomework";

import AddStudent from "../pages/admin/AddStudent";
import ManageStudents from "../pages/admin/ManageStudents";
import EditStudent from "../pages/admin/EditStudent";

import Announcements from "../pages/admin/Announcements";

// ================= FEES =================

import FeesDashboard from "../pages/admin/fees/Dashboard";
import AddFee from "../pages/admin/fees/AddFee";
import ManageFees from "../pages/admin/fees/ManageFees";
import EditFee from "../pages/admin/fees/EditFee";
import FeeHistory from "../pages/admin/fees/FeeHistory";
import RecordPayment from "../pages/admin/fees/RecordPayment";
import FeeReceipt from "../pages/admin/fees/FeeReceipt";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ================= PUBLIC WEBSITE ================= */}

      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="courses" element={<Courses />} />

        <Route
          path="testimonials"
          element={<Testimonials />}
        />

        <Route path="notes" element={<Notes />} />

        <Route path="faq" element={<FAQ />} />

        <Route
          path="admission"
          element={<Admission />}
        />

        <Route
          path="contact"
          element={<Contact />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

      {/* ================= LOGIN ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ================= STUDENT ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="notes"
          element={<StudentNotes />}
        />

        <Route
          path="homework"
          element={<StudentHomework />}
        />

        <Route
          path="announcements"
          element={<StudentAnnouncements />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
          path="fees"
          element={<StudentFees />}
        />

        <Route
          path="payment-history"
          element={<PaymentHistory />}
        />

      </Route>

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<AdminDashboard />}
        />

        {/* ================= NOTES ================= */}

        <Route
          path="upload-notes"
          element={<UploadNotes />}
        />

        <Route
          path="manage-notes"
          element={<ManageNotes />}
        />

        <Route
          path="edit-note/:id"
          element={<EditNote />}
        />

        {/* ================= HOMEWORK ================= */}

        <Route
          path="upload-homework"
          element={<UploadHomework />}
        />

        <Route
          path="manage-homework"
          element={<ManageHomework />}
        />

        <Route
          path="edit-homework/:id"
          element={<EditHomework />}
        />

        {/* ================= STUDENTS ================= */}

        <Route
          path="add-student"
          element={<AddStudent />}
        />

        <Route
          path="manage-students"
          element={<ManageStudents />}
        />

        <Route
          path="edit-student/:id"
          element={<EditStudent />}
        />

        {/* ================= ANNOUNCEMENTS ================= */}

        <Route
          path="announcements"
          element={<Announcements />}
        />
                {/* ================= FEES ================= */}

        <Route
          path="fees"
          element={<FeesDashboard />}
        />

        <Route
          path="fees/add"
          element={<AddFee />}
        />

        <Route
          path="fees/manage"
          element={<ManageFees />}
        />

        <Route
          path="fees/edit/:id"
          element={<EditFee />}
        />

        <Route
          path="fees/payment/:id"
          element={<RecordPayment />}
        />

        <Route
          path="fees/receipt/:id"
          element={<FeeReceipt />}
        />

        <Route
          path="fees/history"
          element={<FeeHistory />}
        />

      </Route>

    </>
  )
);

export default router;