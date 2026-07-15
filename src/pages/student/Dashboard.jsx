import {
  BookOpen,
  ClipboardList,
  Bell,
  CalendarDays,
  User,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useStudentProfile } from "../../context/StudentProfileContext";
import { useStudentDashboard } from "../../context/StudentDashboardContext";

import GlassCard from "../../components/ui/GlassCard";
import GlassPanel from "../../components/ui/GlassPanel";

const cards = [
  {
    title: "My Notes",
    description: "Study materials",
    icon: BookOpen,
    color: "from-blue-600 to-cyan-500",
    path: "/dashboard/notes",
  },
  {
    title: "Homework",
    description: "Today's assignments",
    icon: ClipboardList,
    color: "from-amber-500 to-orange-500",
    path: "/dashboard/homework",
  },
  {
    title: "Announcements",
    description: "Latest notices",
    icon: Bell,
    color: "from-emerald-500 to-green-600",
    path: "/dashboard/announcements",
  },
  {
    title: "Attendance",
    description: "Track attendance",
    icon: CalendarDays,
    color: "from-violet-600 to-purple-600",
    path: "/dashboard/attendance",
  },
  {
    title: "Fees",
    description: "Payment status",
    icon: CreditCard,
    color: "from-rose-500 to-red-500",
    path: "/dashboard/fees",
  },
  {
    title: "My Profile",
    description: "Student profile",
    icon: User,
    color: "from-slate-700 to-slate-900",
    path: "/dashboard/profile",
  },
];

export default function Dashboard() {
  const { profile } = useStudentProfile();

  const {
    dashboard,
    loading,
  } = useStudentDashboard();

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <div className="space-y-10">

      {/* Hero */}

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-10 text-white shadow-2xl">

        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-60 w-60 rounded-full bg-cyan-400/15 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-sm uppercase tracking-[0.3em] text-blue-200">
            Student Portal
          </p>

          <h1 className="mt-4 text-5xl font-black">
            {greeting()} {profile?.name || "Student"} 👋
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Stay consistent. Small progress every day leads to big success.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-xl">

              <p className="text-sm text-blue-200">
                Class
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                {profile?.class || "-"}
              </h3>

            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-xl">

              <p className="text-sm text-blue-200">
                Board
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                {profile?.board || "-"}
              </h3>

            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-xl">

              <p className="text-sm text-blue-200">
                My Notes
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                {loading ? "..." : dashboard.totalNotes}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Quick Access */}

      <div>

        <h2 className="mb-6 text-3xl font-bold">
          Quick Access
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {cards.map((card) => {

            const Icon = card.icon;

            return (

              <Link
                key={card.title}
                to={card.path}
                className="group"
              >

                <GlassCard className="h-full p-6">

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg transition group-hover:scale-110`}
                  >

                    <Icon size={30} />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-slate-500">
                    {card.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-blue-600">

                    Open

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-2"
                    />

                  </div>

                </GlassCard>

              </Link>

            );

          })}

        </div>

      </div>

      {/* Keep the rest of your Dashboard exactly the same */}

    
  

                 {/* Dashboard Grid */}

      <div className="grid gap-8 xl:grid-cols-3">

        {/* Recent Notes */}

        <GlassPanel className="xl:col-span-2">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold">

                Recent Notes

              </h2>

              <p className="mt-2 text-slate-500">

                Recently uploaded study materials

              </p>

            </div>

            <Link
              to="/dashboard/notes"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >

              View All

            </Link>

          </div>

          {loading ? (

            <div className="space-y-4">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="h-24 animate-pulse rounded-3xl bg-slate-200"
                />

              ))}

            </div>

          ) : dashboard.recentNotes.length > 0 ? (

            <div className="space-y-5">

              {dashboard.recentNotes.map((note) => (

                <GlassCard
                  key={note.id}
                  className="flex items-center justify-between p-5"
                >

                  <div className="min-w-0">

                    <h3 className="truncate font-bold text-slate-800">

                      {note.title}

                    </h3>

                    <p className="mt-1 text-slate-500">

                      {note.subject}

                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

                    <BookOpen size={20} />

                  </div>

                </GlassCard>

              ))}

            </div>

          ) : (

            <div className="rounded-3xl border border-dashed border-slate-300 py-14 text-center">

              <BookOpen
                size={46}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-slate-500">

                No notes available yet.

              </p>

            </div>

          )}

        </GlassPanel>

        {/* Right Side */}

        <div className="space-y-8">

          {/* Homework */}

          <GlassPanel>

            <h2 className="text-2xl font-bold">

              Today's Homework

            </h2>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 py-12 text-center">

              <ClipboardList
                size={45}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-slate-500">

                Homework module coming soon.

              </p>

            </div>

          </GlassPanel>

          {/* Announcements */}

          <GlassPanel>

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">

                Announcements

              </h2>

              <Link
                to="/dashboard/announcements"
                className="text-sm font-semibold text-blue-600"
              >

                View All

              </Link>

            </div>

            {loading ? (

              <div className="space-y-4">

                {[1, 2].map((item) => (

                  <div
                    key={item}
                    className="h-20 animate-pulse rounded-2xl bg-slate-200"
                  />

                ))}

              </div>

            ) : dashboard.announcements.length > 0 ? (

              <div className="space-y-4">

                {dashboard.announcements.map((announcement) => (

                  <GlassCard
                    key={announcement.id}
                    className="p-4"
                  >

                    <h3 className="font-bold text-slate-800">

                      {announcement.title}

                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">

                      {announcement.description}

                    </p>

                  </GlassCard>

                ))}

              </div>

            ) : (

              <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center">

                <Bell
                  size={45}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-4 text-slate-500">

                  No announcements yet.

                </p>

              </div>

            )}

          </GlassPanel>

        </div>

      </div>

      {/* Quote */}

      <GlassPanel className="overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-center text-white">

        <div className="relative">

          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative">

            <h2 className="text-3xl font-black">
              Keep Learning 📚
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">

              Every chapter you complete brings you one step closer to your goals.
              Stay curious, stay consistent, and never stop learning.

            </p>

          </div>

        </div>

      </GlassPanel>

    </div>
  );
}