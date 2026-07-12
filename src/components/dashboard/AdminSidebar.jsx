import {
  LayoutDashboard,
  BookOpen,
  FileText,
  UserPlus,
  Users,
  UserCog,
  Bell,
  ClipboardList,
  Settings,
  LogOut,
  X,
  GraduationCap,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Notes",
    path: "/admin/upload-notes",
    icon: BookOpen,
  },
  {
    title: "Manage Notes",
    path: "/admin/manage-notes",
    icon: FileText,
  },
  {
    title: "Add Student",
    path: "/admin/add-student",
    icon: UserPlus,
  },
  {
    title: "Manage Students",
    path: "/admin/manage-students",
    icon: Users,
  },
  {
    title: "Teachers",
    path: "/admin/teachers",
    icon: UserCog,
  },
  {
    title: "Homework",
    path: "/admin/homework",
    icon: ClipboardList,
  },
  {
    title: "Announcements",
    path: "/admin/announcements",
    icon: Bell,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}) {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* Mobile Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-80 flex-col bg-slate-950 shadow-2xl transition-transform duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >

        {/* Header */}

        <div className="border-b border-white/10 p-8">

          <div className="flex items-center justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-blue-600 p-3">

                  <GraduationCap
                    className="text-white"
                    size={24}
                  />

                </div>

                <div>

                  <h1 className="text-2xl font-black text-white">
                    Manthan Nova
                  </h1>

                  <p className="text-sm text-slate-400">
                    Admin Portal
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-white hover:bg-slate-800 lg:hidden"
            >
              <X size={22} />
            </button>

          </div>

        </div>

        {/* Navigation */}

      <nav className="hide-scrollbar flex-1 space-y-2 overflow-y-auto p-5">

          {links.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >

                <Icon size={22} />

                {item.title}

              </NavLink>

            );

          })}

        </nav>

        {/* Footer */}

        <div className="border-t border-white/10 p-5">

          <div className="mb-5 rounded-2xl bg-slate-900 p-4">

            <p className="text-sm text-slate-400">
              Logged in as
            </p>

            <h3 className="mt-2 truncate font-semibold text-white">
              {user?.email}
            </h3>

          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-5 py-4 font-semibold text-white transition hover:bg-red-700"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}