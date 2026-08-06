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
  BookMarked,
  ClipboardCheck,
  CreditCard,
  Wallet,
  History,
} from "lucide-react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
} from "react";

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
    title: "Upload Homework",
    path: "/admin/upload-homework",
    icon: BookMarked,
  },

  {
    title: "Manage Homework",
    path: "/admin/manage-homework",
    icon: ClipboardCheck,
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
    title: "Fees Dashboard",
    path: "/admin/fees",
    icon: CreditCard,
  },

  {
    title: "Add Fee",
    path: "/admin/fees/add",
    icon: UserPlus,
  },

  {
    title: "Manage Fees",
    path: "/admin/fees/manage",
    icon: Wallet,
  },

  {
    title: "Fee History",
    path: "/admin/fees/history",
    icon: History,
  },

  {
    title: "Announcements",
    path: "/admin/announcements",
    icon: Bell,
  },

  {
    title: "Teachers",
    path: "/admin/teachers",
    icon: UserCog,
  },

  {
    title: "Attendance",
    path: "/admin/attendance",
    icon: ClipboardList,
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

  const { user, logout } =
    useAuth();

  const location =
    useLocation();

  useEffect(() => {

    document.body.style.overflow =
      isOpen ? "hidden" : "";

    return () => {

      document.body.style.overflow =
        "";

    };

  }, [isOpen]);

  useEffect(() => {

    onClose?.();

  }, [location.pathname]);

  async function handleLogout() {

    try {

      await logout();

    } catch (err) {

      console.error(err);

    }

  }

  return (

    <>

      {/* Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-[88vw] max-w-[320px] flex-col bg-slate-950 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:h-screen lg:w-80 lg:max-w-none lg:translate-x-0`}
      >

        {/* Header */}

        <div className="border-b border-white/10 px-6 py-7">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">

                <GraduationCap
                  size={24}
                  className="text-white"
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

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-white transition hover:bg-slate-800 lg:hidden"
            >

              <X size={22} />

            </button>

          </div>

        </div>

        {/* Navigation */}

        <nav className="hide-scrollbar flex-1 space-y-2 overflow-y-auto px-4 py-5">
                    {links.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.title}
                to={item.path}
                state={{
                  from: location.pathname,
                }}
                className={({ isActive }) =>
                  `group flex min-h-[56px] items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >

                {({ isActive }) => (

                  <>

                    <Icon
                      size={22}
                      className={`transition-transform duration-200 ${
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    />

                    <span className="flex-1">

                      {item.title}

                    </span>

                    {isActive && (

                      <div className="h-2 w-2 rounded-full bg-white" />

                    )}

                  </>

                )}

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

              {user?.email || "Administrator"}

            </h3>

          </div>

          <button
            onClick={handleLogout}
            className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-5 py-4 font-semibold text-white transition duration-200 hover:bg-red-700 active:scale-[0.98]"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

    </>

  );

}