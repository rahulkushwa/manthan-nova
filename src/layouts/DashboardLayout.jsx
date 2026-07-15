import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import StudentTopbar from "../components/dashboard/StudentTopbar";

import { StudentProfileProvider } from "../context/StudentProfileContext";
import { StudentDashboardProvider } from "../context/StudentDashboardContext";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <StudentProfileProvider>

      <StudentDashboardProvider>

        <div className="min-h-screen bg-slate-100">

          {/* Floating Background */}

          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

            <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-[120px]" />

            <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/15 blur-[140px]" />

            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

          </div>

          {/* Sidebar */}

          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main */}

          <div className="lg:ml-80">

            <StudentTopbar
              onMenuClick={() => setSidebarOpen(true)}
            />

            <main className="min-h-screen px-4 pb-8 pt-24 sm:px-6 lg:px-8">

              <Outlet />

            </main>

          </div>

        </div>

      </StudentDashboardProvider>

    </StudentProfileProvider>
  );
}