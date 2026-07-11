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
import useAuth from "../../hooks/useAuth";

const cards = [
  {
    title: "My Notes",
    description: "View and download notes",
    icon: BookOpen,
    color: "bg-blue-600",
    path: "/dashboard/notes",
  },
  {
    title: "Homework",
    description: "Today's assignments",
    icon: ClipboardList,
    color: "bg-amber-500",
    path: "/dashboard/homework",
  },
  {
    title: "Announcements",
    description: "Latest updates",
    icon: Bell,
    color: "bg-emerald-600",
    path: "/dashboard/announcements",
  },
  {
    title: "Attendance",
    description: "View attendance",
    icon: CalendarDays,
    color: "bg-violet-600",
    path: "/dashboard/attendance",
  },
  {
    title: "Fees",
    description: "Payment details",
    icon: CreditCard,
    color: "bg-rose-600",
    path: "/dashboard/fees",
  },
  {
    title: "My Profile",
    description: "Student information",
    icon: User,
    color: "bg-slate-800",
    path: "/dashboard/profile",
  },
];

const recentNotes = [
  {
    title: "Science Chapter 6",
    subject: "Science",
  },
  {
    title: "Mathematics Chapter 4",
    subject: "Mathematics",
  },
  {
    title: "Computer Fundamentals",
    subject: "Computer",
  },
];

export default function Dashboard() {
  const { profile } = useAuth();

  console.log("Dashboard Profile:", profile);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-10 text-white shadow-2xl">
        <h1 className="text-5xl font-black">
          Welcome Back {profile?.name || "Student"} 👋
        </h1>

        <p className="mt-4 text-lg text-blue-100">
          Keep learning, stay consistent and achieve your goals.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
            <p className="text-sm text-blue-200">Class</p>

            <h3 className="text-xl font-bold">
              {profile?.class || "-"}
            </h3>
          </div>

          <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
            <p className="text-sm text-blue-200">Board</p>

            <h3 className="text-xl font-bold">
              {profile?.board || "-"}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-6 text-3xl font-bold">Quick Access</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="group rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}
                >
                  <Icon size={30} className="text-white" />
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
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold">
          Recent Notes
        </h2>

        <div className="space-y-4">
          {recentNotes.map((note) => (
            <div
              key={note.title}
              className="flex items-center justify-between rounded-2xl border p-5 transition hover:bg-slate-50"
            >
              <div>
                <h3 className="font-bold">{note.title}</h3>

                <p className="text-slate-500">
                  {note.subject}
                </p>
              </div>

              <BookOpen className="text-blue-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}