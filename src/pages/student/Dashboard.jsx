import {
  BookOpen,
  ClipboardList,
  Bell,
  CalendarDays,
} from "lucide-react";

export default function Dashboard() {
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

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="border-b bg-white px-8 py-6 shadow-sm">

        <h1 className="text-3xl font-bold text-slate-900">
          Welcome 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to the Manthan Nova Student Portal.
        </p>

      </div>

      {/* Content */}

      <div className="mx-auto max-w-7xl p-8">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card) => {

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2"
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

    </main>
  );
}