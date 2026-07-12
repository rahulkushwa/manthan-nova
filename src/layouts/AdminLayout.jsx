import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import AdminSidebar from "../components/dashboard/AdminSidebar";
import Topbar from "../components/dashboard/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar after navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-100">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

  <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-[120px]" />

  <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/15 blur-[140px]" />

  <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

</div>
      {/* Sidebar */}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}

      <div className="lg:ml-80">

        {/* Topbar */}

        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page */}

        <main className="min-h-screen pt-24 px-4 pb-8 sm:px-6 lg:px-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}