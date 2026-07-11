import {
  BookOpen,
  Users,
  UserCog,
  Bell,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const cards = [
  {
    title: "Upload Notes",
    icon: BookOpen,
    color: "bg-blue-600",
  },
  {
    title: "Students",
    icon: Users,
    color: "bg-green-600",
  },
  {
    title: "Teachers",
    icon: UserCog,
    color: "bg-purple-600",
  },
  {
    title: "Announcements",
    icon: Bell,
    color: "bg-orange-500",
  },
  {
    title: "Homework",
    icon: ClipboardList,
    color: "bg-pink-600",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    color: "bg-slate-800",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Welcome */}

      <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-8 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          Admin Dashboard 👨‍💼
        </h1>

        <p className="mt-3 text-blue-100">
          Manage students, teachers, notes and announcements.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="cursor-pointer rounded-3xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}
              >

                <Icon
                  size={30}
                  className="text-white"
                />

              </div>

              <h2 className="mt-6 text-2xl font-bold">
                {card.title}
              </h2>

              <p className="mt-2 text-slate-500">
                Open Module
              </p>

            </div>

          );

        })}

      </div>

    </div>
  );
}