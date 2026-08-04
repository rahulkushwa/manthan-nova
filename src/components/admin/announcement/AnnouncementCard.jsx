import {
  Bell,
  Pin,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

import GlassCard from "../../ui/GlassCard";

export default function AnnouncementCard({
  announcement,
  onEdit,
  onDelete,
}) {
  const createdAt =
    announcement.createdAt?.toDate?.() ||
    announcement.createdAt ||
    null;

  return (
    <GlassCard className="overflow-hidden">

      {/* Header */}

      <div className="flex items-start justify-between gap-5 border-b border-slate-200 p-6">

        <div className="flex items-start gap-4">

          <div className="rounded-2xl bg-blue-600 p-3 text-white">

            <Bell size={24} />

          </div>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-xl font-bold text-slate-900">
                {announcement.title}
              </h2>

              {announcement.pinned && (
                <span className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">

                  <Pin size={14} />

                  Pinned

                </span>
              )}

            </div>

            <p className="mt-2 text-sm text-slate-500">

              Class :
              <span className="ml-2 font-semibold text-slate-700">
                {announcement.targetClass}
              </span>

            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(announcement)}
            className="rounded-xl bg-amber-500 p-3 text-white transition hover:bg-amber-600"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(announcement.id)}
            className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        <p className="whitespace-pre-line leading-8 text-slate-700">

          {announcement.message}

        </p>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <CalendarDays size={16} />

          {createdAt
            ? createdAt.toLocaleString()
            : "Just now"}

        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

          Announcement

        </span>

      </div>

    </GlassCard>
  );
}