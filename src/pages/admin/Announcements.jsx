import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";

import GlassPanel from "../../components/ui/GlassPanel";
import AnnouncementForm from "../../components/admin/announcement/AnnouncementForm";
import AnnouncementCard from "../../components/admin/announcement/AnnouncementCard";

import {
  createAnnouncement,
  deleteAnnouncement,
  subscribeAnnouncements,
  updateAnnouncement,
} from "../../services/announcementService";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAnnouncements(setAnnouncements);

    return () => unsubscribe();
  }, []);

  async function handleCreate(data) {
    try {
      setLoading(true);

      await createAnnouncement(data);

      alert("Announcement Published");

    } catch (error) {
      console.error(error);

      alert("Failed to publish announcement.");

    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(data) {
    try {
      setLoading(true);

      await updateAnnouncement(selected.id, data);

      alert("Announcement Updated");

      setSelected(null);

    } catch (error) {
      console.error(error);

      alert("Failed to update announcement.");

    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm(
      "Delete this announcement?"
    );

    if (!ok) return;

    try {
      await deleteAnnouncement(id);

    } catch (error) {
      console.error(error);

      alert("Unable to delete announcement.");
    }
  }

  return (
    <div className="space-y-10">

      {/* Hero */}

      <GlassPanel className="overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white">

        <div className="flex items-center gap-5">

          <div className="rounded-3xl bg-white/20 p-5">

            <Megaphone size={42} />

          </div>

          <div>

            <h1 className="text-4xl font-black">

              Announcements

            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">

              Publish notices for students instantly.
              Pinned announcements always appear first.

            </p>

          </div>

        </div>

      </GlassPanel>

      {/* Form */}

      <AnnouncementForm
        key={selected?.id || "new"}
        initialData={selected}
        loading={loading}
        onSubmit={
          selected
            ? handleUpdate
            : handleCreate
        }
      />

      {/* List */}

      <div className="space-y-6">

        {announcements.length === 0 ? (

          <GlassPanel className="py-20 text-center">

            <Megaphone
              size={60}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-8 text-3xl font-bold">

              No Announcements

            </h2>

            <p className="mt-4 text-slate-500">

              Publish your first announcement.

            </p>

          </GlassPanel>

        ) : (          <div className="grid gap-6">

            {announcements.map((announcement) => (

              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onEdit={setSelected}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}