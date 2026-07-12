import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  UserCog,
  Bell,
  ArrowRight,
  Upload,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import DashboardChart from "../../components/dashboard/DashboardChart";
import SystemStatus from "../../components/dashboard/SystemStatus";
import RecentStudents from "../../components/dashboard/RecentStudents";

import GlassCard from "../../components/ui/GlassCard";
import GlassPanel from "../../components/ui/GlassPanel";

import { getDashboardStats } from "../../services/dashboardService";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    notes: 0,
    students: 0,
    teachers: 0,
    announcements: 0,
    recentNotes: [],
    recentStudents: [],
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();

    const interval = setInterval(loadDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Total Notes",
      value: stats.notes,
      icon: BookOpen,
      color: "from-blue-600 to-cyan-500",
      path: "/admin/manage-notes",
    },
    {
      title: "Students",
      value: stats.students,
      icon: Users,
      color: "from-emerald-600 to-green-500",
      path: "/admin/manage-students",
    },
    {
      title: "Teachers",
      value: stats.teachers,
      icon: UserCog,
      color: "from-violet-600 to-purple-500",
      path: "/admin/teachers",
    },
    {
      title: "Announcements",
      value: stats.announcements,
      icon: Bell,
      color: "from-orange-500 to-amber-500",
      path: "/admin/announcements",
    },
  ];

  const quickActions = [
    {
      title: "Upload Notes",
      path: "/admin/upload-notes",
      icon: Upload,
    },
    {
      title: "Manage Notes",
      path: "/admin/manage-notes",
      icon: BookOpen,
    },
    {
      title: "Homework",
      path: "/admin/homework",
      icon: ClipboardList,
    },
    {
      title: "Analytics",
      path: "#",
      icon: BarChart3,
    },
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-10">

      {/* Hero */}

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-10 text-white shadow-2xl">

        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-60 w-60 rounded-full bg-cyan-400/15 blur-[120px]" />

        <div className="relative z-10">

          <p className="text-sm uppercase tracking-[0.3em] text-blue-200">
            Admin Dashboard
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Welcome Back 👋
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Monitor students, notes and your coaching institute
            from one beautiful dashboard.
          </p>

        </div>

      </div>

      {/* Dashboard Status */}

      <GlassPanel className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Dashboard Status
          </p>

          <h2 className="mt-2 text-xl font-bold text-green-600">
            ● Live Data Connected
          </h2>

        </div>

        <div className="text-right">

          <p className="text-sm text-slate-500">
            Last Updated
          </p>

          <h2 className="font-semibold">
            {new Date().toLocaleTimeString()}
          </h2>

        </div>

      </GlassPanel>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {statCards.map((card) => {

          const Icon = card.icon;

          return (

            <Link
              key={card.title}
              to={card.path}
            >

              <GlassCard className="p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-500">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-4xl font-black">
                      {card.value}
                    </h2>

                  </div>

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color} shadow-lg`}
                  >

                    <Icon
                      className="text-white"
                      size={30}
                    />

                  </div>

                </div>

              </GlassCard>

            </Link>

          );

        })}

      </div>

      {/* Quick Actions */}

      <div>

        <h2 className="mb-6 text-3xl font-bold">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {quickActions.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.title}
                to={item.path}
                className="group"
              >

                <GlassCard className="h-full p-6">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transition duration-300 group-hover:scale-110">

                    <Icon size={28} />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {item.title}
                  </h3>

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
            {/* Analytics */}

      <div className="grid gap-8 xl:grid-cols-2">

        <GlassPanel>

          <DashboardChart />

        </GlassPanel>

        <GlassPanel>

          <SystemStatus />

        </GlassPanel>

      </div>

      {/* Empty State */}

      {stats.students === 0 &&
        stats.notes === 0 && (

          <GlassPanel className="py-16 text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">

              <BookOpen size={40} />

            </div>

            <h2 className="mt-8 text-4xl font-black">

              Welcome to Manthan Nova

            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">

              Your dashboard is successfully connected.

              Start by adding students and uploading notes.

              Analytics will appear here automatically.

            </p>

          </GlassPanel>

      )}

      {/* Recent Notes + Students */}

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Recent Notes */}

        <GlassPanel>

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold">

                Recent Notes

              </h2>

              <p className="mt-2 text-slate-500">

                Latest uploaded study materials

              </p>

            </div>

            <Link
              to="/admin/manage-notes"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>

          </div>

          {stats.recentNotes.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center">

              <BookOpen
                size={55}
                className="mx-auto text-slate-300"
              />

              <p className="mt-5 text-slate-500">

                No notes uploaded yet.

              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {stats.recentNotes.map((note) => (

                <div
                  key={note.id}
                  className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  <div>

                    <h3 className="font-bold text-slate-800">

                      {note.title}

                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                      Class {note.class} • {note.subject}

                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

                    <BookOpen size={20} />

                  </div>

                </div>

              ))}

            </div>

          )}

        </GlassPanel>

        {/* Recent Students */}

        <GlassPanel>

          <RecentStudents
            students={stats.recentStudents}
          />

        </GlassPanel>

      </div>

      {/* Footer */}

      <GlassPanel className="overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-center text-white">

        <div className="relative">

          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative">

            <h2 className="text-3xl font-black">

              Manthan Nova

            </h2>

            <p className="mt-3 text-slate-300">

              Coaching Management System

            </p>

            <p className="mx-auto mt-6 max-w-3xl leading-8 text-slate-400">

              A premium coaching management platform designed
              for modern institutes with student management,
              notes, homework, attendance, announcements,
              analytics and much more.

            </p>

          </div>

        </div>

      </GlassPanel>

    </div>
  );
}