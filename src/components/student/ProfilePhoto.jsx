import { useRef, useState } from "react";

import {
  Camera,
  Mail,
  Phone,
  BadgeCheck,
  User,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  uploadProfilePhoto,
} from "../../services/profileService";

export default function ProfilePhoto({
  profile,
  setProfile,
}) {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleImage(e) {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Maximum image size is 5 MB.");
        return;
      }

      setUploading(true);

      const photoURL =
        await uploadProfilePhoto(
          file,
          profile.id
        );

      setProfile((prev) => ({
        ...prev,
        photoURL,
      }));

      toast.success(
        "Profile photo updated successfully."
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to upload profile photo."
      );

    } finally {

      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    }
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8">

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImage}
      />

      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">

        <div className="relative shrink-0">

          {profile?.photoURL ? (
            <img
              src={profile.photoURL}
              alt={profile.name}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-white/30 sm:h-40 sm:w-40"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-5xl font-black shadow-2xl sm:h-40 sm:w-40 sm:text-6xl">

              {profile?.name
                ? profile.name.charAt(0).toUpperCase()
                : <User size={60} />}

            </div>
          )}

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={uploading}
            title="Change Profile Picture"
            className="absolute bottom-2 right-2 rounded-full bg-white p-3 text-slate-900 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50 disabled:opacity-50"
          >
            <Camera size={20} />
          </button>

        </div>

        <div className="flex-1">

          <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center">

            <h1 className="text-3xl font-black sm:text-4xl">
              {profile?.name}
            </h1>

            <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300">
              <BadgeCheck size={18} />
              Manthan Nova Student
            </span>

          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              🎓 Class {profile?.class}
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              📚 {profile?.board}
            </span>

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300">
              🟢 Active
            </span>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-xl">
              <Mail size={20} className="shrink-0" />
              <span className="truncate">
                {profile?.email}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-xl">
              <Phone size={20} className="shrink-0" />
              <span>
                {profile?.phone || "-"}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}