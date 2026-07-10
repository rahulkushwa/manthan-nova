import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Bell,
  CalendarDays,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Notes",
    path: "/dashboard/notes",
    icon: BookOpen,
  },
  {
    title: "Homework",
    path: "/dashboard/homework",
    icon: ClipboardList,
  },
  {
    title: "Announcements",
    path: "/dashboard/announcements",
    icon: Bell,
  },
  {
    title: "Schedule",
    path: "/dashboard/schedule",
    icon: CalendarDays,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 flex-col border-r bg-slate-950 text-white lg:flex">

      {/* Logo */}

      <div className="border-b border-white/10 p-8">

        <h1 className="text-3xl font-black">
          Manthan Nova
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Student Portal
        </p>

      </div>

      {/* Menu */}

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

      {/* Logout */}

      <div className="border-t border-white/10 p-6">

        <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-slate-400 transition hover:bg-red-500 hover:text-white">

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </aside>
  );
}