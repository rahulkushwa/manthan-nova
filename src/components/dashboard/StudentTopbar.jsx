import {
  Bell,
  Menu,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function StudentTopbar({
  onMenuClick,
}) {
  const {
    user,
    profile,
    logout,
  } = useAuth();

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
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/20 bg-white/80 backdrop-blur-2xl lg:left-80">

      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div>

            <h2 className="text-xl font-bold">
              Student Portal
            </h2>

            <p className="text-sm text-slate-500">
              {today}
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Notification */}

          <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </button>

          {/* User */}

          <div className="hidden text-right sm:block">

            <h3 className="font-semibold">
              {profile?.name || user?.email}
            </h3>

            <p className="text-sm text-slate-500">
              Class {profile?.class || "-"}
            </p>

          </div>

          {/* Avatar */}

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-lg font-bold text-white">

            {(profile?.name || user?.email || "S")
              .charAt(0)
              .toUpperCase()}

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>

    </header>
  );
}