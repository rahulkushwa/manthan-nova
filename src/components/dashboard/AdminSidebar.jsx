import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  UserCog,
  Bell,
  ClipboardList,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

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
    title: "Students",
    path: "/admin/students",
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

export default function AdminSidebar() {
  return (
    <aside className="hidden w-72 flex-col bg-slate-950 lg:flex">
      <div className="border-b border-white/10 p-8">
        <h1 className="text-3xl font-black text-white">
          Manthan Nova
        </h1>

        <p className="mt-2 text-slate-400">
          Admin Portal
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-6">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
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
    </aside>
  );
}