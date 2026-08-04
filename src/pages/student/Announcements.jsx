import { useEffect, useState } from "react";
import {
  Bell,
  Pin,
  CalendarDays,
} from "lucide-react";

import { useStudentProfile } from "../../context/StudentProfileContext";

import { subscribeStudentAnnouncements } from "../../services/studentAnnouncementService";

import GlassCard from "../../components/ui/GlassCard";
import GlassPanel from "../../components/ui/GlassPanel";

export default function Announcements() {
  const { profile } = useStudentProfile();

  const [announcements, setAnnouncements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!profile?.class) return;

    const unsubscribe =
      subscribeStudentAnnouncements(
        profile.class,
        (data) => {
          setAnnouncements(data);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, [profile]);

  return (
    <div className="space-y-8">

      {/* Hero */}

      <GlassPanel className="overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white">

        <div className="relative">

          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="relative">

            <p className="uppercase tracking-[0.3em] text-blue-200 text-sm">
              Student Portal
            </p>

            <h1 className="mt-4 text-5xl font-black">
              Announcements
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Stay updated with the latest notices from your teachers and institute.
            </p>

            <div className="mt-8 inline-flex rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-xl">

              <div>

                <p className="text-sm text-blue-200">
                  Showing announcements for
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Class {profile?.class}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </GlassPanel>

      {/* Announcement List */}

      <div className="space-y-6">

        {loading ? (

          <>
            {[1, 2, 3].map((item) => (
              <GlassCard
                key={item}
                className="h-44 animate-pulse"
              />
            ))}
          </>

        ) : announcements.length === 0 ? (

          <GlassCard className="py-16 text-center">

            <Bell
              size={60}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-6 text-2xl font-bold">
              No announcements available
            </h2>

            <p className="mt-3 text-slate-500">
              Your teachers haven't posted any announcements yet.
            </p>

          </GlassCard>

        ) : (          <div className="space-y-6">

            {announcements.map((announcement) => (

              <GlassCard
                key={announcement.id}
                className="relative overflow-hidden p-7"
              >

                {announcement.pinned && (

                  <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                    <Pin size={15} />

                    Pinned

                  </div>

                )}

                <div className="flex items-start gap-5">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">

                    <Bell size={30} />

                  </div>

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-slate-800">

                      {announcement.title}

                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                      <div className="flex items-center gap-2">

                        <CalendarDays size={16} />

                        {announcement.createdAt?.toDate
                          ? announcement.createdAt
                              .toDate()
                              .toLocaleDateString()
                          : "-"}

                      </div>

                      <div className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">

                        {announcement.targetClass === "All"
                          ? "All Classes"
                          : `Class ${announcement.targetClass}`}

                      </div>

                    </div>

                    <p className="mt-6 whitespace-pre-line leading-8 text-slate-600">

                      {announcement.message}

                    </p>

                  </div>

                </div>

              </GlassCard>

            ))}

          </div>        )}

      </div>

    </div>
  );
}