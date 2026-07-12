import {
  Users,
  GraduationCap,
  School,
  UserCheck,
} from "lucide-react";

export default function StudentStats({ students }) {
  const total = students.length;

  const cbse = students.filter(
    (s) => s.board === "CBSE"
  ).length;

  const icse = students.filter(
    (s) => s.board === "ICSE"
  ).length;

  const wb = students.filter(
    (s) =>
      s.board === "WB" ||
      s.board === "WBBSE"
  ).length;

  const cards = [
    {
      title: "Total Students",
      value: total,
      icon: Users,
      color: "bg-blue-600",
    },
    {
      title: "CBSE",
      value: cbse,
      icon: GraduationCap,
      color: "bg-green-600",
    },
    {
      title: "ICSE",
      value: icse,
      icon: School,
      color: "bg-purple-600",
    },
    {
      title: "WB Board",
      value: wb,
      icon: UserCheck,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
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

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}
              >
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
  );
}