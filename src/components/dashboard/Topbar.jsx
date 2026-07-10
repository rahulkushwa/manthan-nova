import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-8 py-5 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        {/* Search */}

        <div className="relative hidden w-[380px] lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search notes, homework..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 py-3 pl-12 pr-5 outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

        {/* Right */}

        <div className="ml-auto flex items-center gap-5">

          <button className="relative rounded-2xl bg-slate-100 p-3 transition hover:bg-slate-200">

            <Bell size={22} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </button>

          <div className="text-right">

            <p className="font-semibold text-slate-900">
              {user?.email}
            </p>

            <p className="text-sm text-slate-500">
              {today}
            </p>

          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-lg font-bold text-white">

            {user?.email?.charAt(0).toUpperCase()}

          </div>

        </div>

      </div>

    </header>
  );
}