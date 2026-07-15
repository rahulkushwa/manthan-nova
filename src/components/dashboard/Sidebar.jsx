import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Bell,
  LogOut,
  GraduationCap,
  X,
  User,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useStudentProfile } from "../../context/StudentProfileContext";

const links = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Notes",
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
    title: "My Profile",
    path: "/dashboard/profile",
    icon: User,
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}) {
  const {
    user,
    logout,
  } = useAuth();

  const {
    profile,
    loading,
  } = useStudentProfile();

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
        className={`fixed left-0 top-0 z-50 flex h-screen w-80 flex-col border-r border-white/10 bg-slate-950/90 backdrop-blur-2xl shadow-2xl transition-transform duration-300
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

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-3">

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
                  Student Portal
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-white transition hover:bg-slate-800 lg:hidden"
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
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >

                <Icon
                  size={22}
                  className="transition group-hover:scale-110"
                />

                <span>{item.title}</span>

              </NavLink>

            );

          })}

        </nav>

        {/* Student Card */}

        <div className="border-t border-white/10 p-5">

          <Link
            to="/dashboard/profile"
            onClick={onClose}
            className="block rounded-3xl bg-slate-900/80 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-lg font-bold text-white">

                {loading ? (

                  "..."

                ) : profile?.photoURL ? (

                  <img
                    src={profile.photoURL}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />

                ) : profile?.name ? (

                  profile.name.charAt(0).toUpperCase()

                ) : (

                  <User size={24} />

                )}

              </div>

              <div className="min-w-0">

                <h3 className="truncate font-semibold text-white">

                  {loading
                    ? "Loading..."
                    : profile?.name || "Student"}

                </h3>

                <p className="truncate text-sm text-slate-400">

                  {user?.email}

                </p>

                <p className="mt-1 text-xs text-blue-300">

                  {loading
                    ? "Loading..."
                    : profile
                    ? `Class ${profile.class} • ${profile.board}`
                    : "No Profile"}

                </p>

              </div>

            </div>

          </Link>

          <button
            onClick={handleLogout}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

    </>
  );
}