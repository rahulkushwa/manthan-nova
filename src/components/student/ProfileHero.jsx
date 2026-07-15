import {
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

export default function ProfileHero({
  profile,
}) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/60 p-8 shadow-2xl backdrop-blur-xl">

      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />

      <div className="absolute -bottom-12 left-1/2 h-52 w-52 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center gap-6 md:flex-row">

        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-5xl font-black text-white shadow-xl">

          {(profile?.name || "S")
            .charAt(0)
            .toUpperCase()}

        </div>

        <div className="flex-1">

          <h1 className="text-4xl font-black text-slate-900">

            {profile?.name}

          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">

              <GraduationCap
                size={18}
                className="mr-2 inline"
              />

              Class {profile?.class}

            </span>

            <span className="rounded-full bg-violet-100 px-4 py-2 font-semibold text-violet-700">

              {profile?.board}

            </span>

            <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">

              <BadgeCheck
                size={18}
                className="mr-2 inline"
              />

              {profile?.status}

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}