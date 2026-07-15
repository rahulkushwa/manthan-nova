import {
  GraduationCap,
  School,
 BookOpen,
  BadgeCheck,
} from "lucide-react";

export default function AcademicCard({
  profile,
}) {
  const items = [
    {
      icon: GraduationCap,
      label: "Class",
      value: profile?.class,
    },
    {
      icon: School,
      label: "Board",
      value: profile?.board,
    },
    {
      icon: BookOpen,
      label: "School",
      value: profile?.school,
    },
    {
      icon: BadgeCheck,
      label: "Status",
      value: profile?.status,
    },
  ];

  return (
    <div className="rounded-[32px] bg-white p-8 shadow-xl">

      <div className="mb-8">

        <h2 className="text-2xl font-black">
          Academic Information
        </h2>

        <p className="mt-2 text-slate-500">
          Institute records
        </p>

      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        {items.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.label}
              className="rounded-2xl bg-slate-50 p-5 transition hover:bg-blue-50"
            >

              <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-3">

                <Icon
                  size={22}
                  className="text-blue-600"
                />

              </div>

              <p className="text-sm text-slate-500">

                {item.label}

              </p>

              <h3 className="mt-1 text-lg font-bold text-slate-900">

                {item.value || "-"}

              </h3>

            </div>

          );

        })}

      </div>

    </div>
  );
}