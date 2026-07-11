import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/dashboard/AdminSidebar";
import Topbar from "../components/dashboard/Topbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}