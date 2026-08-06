import {
  Bell,
  Menu,
  Search,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Topbar({
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

    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl lg:left-80">

      <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex min-w-0 items-center gap-3">

          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
          >

            <Menu size={24} />

          </button>

          <div className="hidden md:block">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                placeholder="Search..."
                className="w-56 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white lg:w-72"
              />

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">

          {/* Date */}

          <div className="hidden text-right xl:block">

            <p className="text-sm text-slate-500">

              {today}

            </p>

          </div>

          {/* Notification */}

          <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

          </button>

          {/* User */}

          <div className="hidden max-w-[180px] text-right md:block">

            <h3 className="truncate font-semibold">

              {profile?.name || user?.email}

            </h3>

            <p className="truncate text-sm capitalize text-slate-500">

              {profile?.role || "Admin"}

            </p>

          </div>

          {/* Avatar */}

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-lg font-bold text-white shadow-md">

            {(profile?.name || user?.email || "A")
              .charAt(0)
              .toUpperCase()}

          </div>

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