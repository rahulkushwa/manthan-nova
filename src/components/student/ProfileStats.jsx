import {
  BookOpen,
  ClipboardList,
 CalendarCheck2,
  CalendarDays,
} from "lucide-react";

export default function ProfileStats({
  profile,
}) {
  const stats = [
    {
      title: "My Notes",
      value: "24",
      subtitle: "Available",
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Homework",
      value: "05",
      subtitle: "Pending",
      icon: ClipboardList,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Attendance",
      value: "96%",
      subtitle: "Overall",
      icon: CalendarCheck2,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Student Since",
      value: profile?.admissionDate || "-",
      subtitle: "Admission",
      icon: CalendarDays,
      color: "from-violet-500 to-fuchsia-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="group overflow-hidden rounded-[28px] bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <div
              className={`mb-6 inline-flex rounded-2xl bg-gradient-to-r p-4 text-white ${item.color}`}
            >

              <Icon size={26} />

            </div>

            <h3 className="text-sm font-medium text-slate-500">

              {item.title}

            </h3>

            <h2 className="mt-2 break-words text-3xl font-black text-slate-900">

              {item.value}

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {item.subtitle}

            </p>

          </div>

        );

      })}

    </div>
  );
}