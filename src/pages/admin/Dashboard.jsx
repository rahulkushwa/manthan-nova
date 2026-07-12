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

import DashboardChart from "../../components/dashboard/DashboardChart";
import SystemStatus from "../../components/dashboard/SystemStatus";
import { getDashboardStats } from "../../services/dashboardService";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    notes: 0,
    students: 0,
    teachers: 0,
    announcements: 0,
    recentNotes: [],
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
  }, []);

  const statCards = [
    {
      title: "Total Notes",
      value: stats.notes,
      icon: BookOpen,
      color: "bg-blue-600",
    },
    {
      title: "Students",
      value: stats.students,
      icon: Users,
      color: "bg-green-600",
    },
    {
      title: "Teachers",
      value: stats.teachers,
      icon: UserCog,
      color: "bg-purple-600",
    },
    {
      title: "Announcements",
      value: stats.announcements,
      icon: Bell,
      color: "bg-orange-500",
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
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-10 text-white shadow-2xl">
        <h1 className="text-5xl font-black">
          Welcome Back 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-blue-100">
          Manage your coaching institute efficiently from one place.
        </p>
      </div>

      {/* Statistics */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {statCards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-black">
                    {card.value}
                  </h2>

                </div>

                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}>
                  <Icon
                    size={30}
                    className="text-white"
                  />
                </div>

              </div>
            </div>
          );

        })}

      </div>

      {/* Quick Actions */}

      <div className="mt-12">

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
                className="group rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >

                <Icon
                  size={36}
                  className="text-blue-600"
                />

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

              </Link>

            );

          })}

        </div>

      </div>
<div className="mt-12 grid gap-8 xl:grid-cols-2">
  <DashboardChart />

  <SystemStatus />
</div>
      {/* Recent Notes */}

      <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-3xl font-bold">
          Recent Notes
        </h2>

        {stats.recentNotes.length === 0 ? (

          <p className="text-slate-500">
            No notes uploaded yet.
          </p>

        ) : (

          <div className="space-y-4">

            {stats.recentNotes.map((note) => (

              <div
                key={note.id}
                className="flex items-center justify-between rounded-2xl border p-5"
              >

                <div>

                  <h3 className="font-bold">
                    {note.title}
                  </h3>

                  <p className="text-slate-500">
                    Class {note.class} • {note.subject}
                  </p>

                </div>

                <BookOpen className="text-blue-600" />

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}