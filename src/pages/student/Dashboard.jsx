import {
  BookOpen,
  ClipboardList,
  Bell,
  CalendarDays,
} from "lucide-react";

const cards = [
  {
    title: "Notes",
    icon: BookOpen,
    color: "bg-blue-600",
  },
  {
    title: "Homework",
    icon: ClipboardList,
    color: "bg-amber-500",
  },
  {
    title: "Announcements",
    icon: Bell,
    color: "bg-emerald-600",
  },
  {
    title: "Schedule",
    icon: CalendarDays,
    color: "bg-violet-600",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Welcome Banner */}

      <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-8 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-lg text-blue-100">
          Continue your learning journey with Manthan Nova.
        </p>

      </div>

      {/* Dashboard Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon
                  size={30}
                  className="text-white"
                />
              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900">
                {card.title}
              </h2>

              <p className="mt-2 text-slate-500">
                Coming Soon
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}