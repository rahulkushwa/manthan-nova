import { useState } from "react";
import { Megaphone, Pin, Send } from "lucide-react";

import GlassCard from "../../ui/GlassCard";
import GlassButton from "../../ui/GlassButton";
import GlassInput from "../../ui/GlassInput";

export default function AnnouncementForm({
  initialData = null,
  onSubmit,
  loading = false,
}) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    message: initialData?.message || "",
    targetClass: initialData?.targetClass || "All",
    pinned: initialData?.pinned || false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      return alert("Announcement title is required.");
    }

    if (!form.message.trim()) {
      return alert("Announcement message is required.");
    }

    await onSubmit(form);

    if (!initialData) {
      setForm({
        title: "",
        message: "",
        targetClass: "All",
        pinned: false,
      });
    }
  }

  return (
    <GlassCard className="p-8">

      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-blue-600 p-4 text-white">

          <Megaphone size={28} />

        </div>

        <div>

          <h2 className="text-2xl font-black">
            {initialData
              ? "Edit Announcement"
              : "Create Announcement"}
          </h2>

          <p className="text-slate-500">
            Notify students instantly.
          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <GlassInput
          label="Announcement Title"
          name="title"
          placeholder="Enter announcement title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <div>

          <label className="mb-2 block font-semibold">

            Message

          </label>

          <textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            placeholder="Write your announcement..."
            className="w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none backdrop-blur-xl transition focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">

            Class

          </label>

          <select
            name="targetClass"
            value={form.targetClass}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none"
          >

            <option value="All">All Students</option>

            <option value="6">Class 6</option>

            <option value="7">Class 7</option>

            <option value="8">Class 8</option>

            <option value="9">Class 9</option>

            <option value="10">Class 10</option>

          </select>

        </div>

        <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white/60 p-4">

          <input
            type="checkbox"
            name="pinned"
            checked={form.pinned}
            onChange={handleChange}
            className="h-5 w-5"
          />

          <Pin
            size={20}
            className="text-orange-500"
          />

          <span className="font-medium">
            Pin this announcement
          </span>

        </label>

        <GlassButton
          type="submit"
          disabled={loading}
          className="w-full justify-center"
        >

          <Send size={20} />

          {loading
            ? "Saving..."
            : initialData
            ? "Update Announcement"
            : "Publish Announcement"}

        </GlassButton>

      </form>

    </GlassCard>
  );
}