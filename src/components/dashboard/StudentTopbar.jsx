import {
  Bell,
  Menu,
  LogOut,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useStudentProfile } from "../../context/StudentProfileContext";

export default function StudentTopbar({
  onMenuClick,
}) {

  const {
    logout,
  } = useAuth();

  const {
    profile,
    loading,
  } = useStudentProfile();

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  async function handleLogout() {

    try {

      await logout();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/20 bg-white/85 backdrop-blur-2xl lg:left-80">

      <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex min-w-0 items-center gap-3">

          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
          >

            <Menu size={24} />

          </button>

          <Link
            to="/dashboard"
            className="min-w-0 rounded-2xl px-2 py-1 transition hover:bg-slate-100"
          >

            <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">

              Student Portal

            </h2>

            <p className="hidden text-sm text-slate-500 md:block">

              {today}

            </p>

          </Link>

        </div>

        {/* Right */}

        <div className="flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">

          {/* Notifications */}

          <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

          </button>

          {/* Student Details */}

          <Link
            to="/dashboard/profile"
            className="hidden max-w-[180px] rounded-2xl px-3 py-2 text-right transition hover:bg-slate-100 md:block"
          >

            <h3 className="truncate font-semibold text-slate-800">

              {loading
                ? "Loading..."
                : profile?.name || "Student"}

            </h3>

            <p className="truncate text-sm text-slate-500">

              {loading
                ? "Loading..."
                : profile
                ? `Class ${profile.class} • ${profile.board}`
                : "-"}

            </p>

          </Link>

          {/* Avatar */}

          <Link
            to="/dashboard/profile"
            className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-lg font-bold text-white shadow-md transition hover:scale-105"
          >

            {loading ? (

              "..."

            ) : profile?.photoURL ? (

              <img
                src={profile.photoURL}
                alt={profile.name}
                className="h-full w-full object-cover"
              />

            ) : profile?.name ? (

              profile.name
                .charAt(0)
                .toUpperCase()

            ) : (

              <User size={20} />

            )}

          </Link>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700 active:scale-95"
            title="Logout"
          >

            <LogOut size={18} />

          </button>

        </div>

      </div>

    </header>

  );

}