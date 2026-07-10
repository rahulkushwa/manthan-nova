import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import Testimonials from "../pages/Testimonials";
import Notes from "../pages/Notes";
import FAQ from "../pages/FAQ";
import Admission from "../pages/Admission";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

// Auth
import Login from "../pages/auth/Login";

// Student
import Dashboard from "../pages/student/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Website */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="notes" element={<Notes />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="admission" element={<Admission />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      {/* Student Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>
    </>
  )
);

export default router;