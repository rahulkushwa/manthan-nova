import { useState } from "react";

import { useStudentProfile } from "../../context/StudentProfileContext";

import ProfilePhoto from "../../components/student/ProfilePhoto";
import ProfileStats from "../../components/student/ProfileStats";
import AcademicCard from "../../components/student/AcademicCard";
import QuickActions from "../../components/student/QuickActions";
import ProfileDetails from "../../components/student/ProfileDetails";
import ProfileSkeleton from "../../components/student/ProfileSkeleton";
import ChangePasswordModal from "../../components/student/ChangePasswordModal";

export default function Profile() {
  const {
    profile,
    loading,
    setProfile,
  } = useStudentProfile();

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <div className="rounded-[32px] bg-white p-10 text-center shadow-xl">

        <h2 className="text-3xl font-black">
          Profile Not Found
        </h2>

        <p className="mt-4 text-slate-500">
          No profile is linked to this account.
        </p>

      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">

        <ProfilePhoto
          profile={profile}
          setProfile={setProfile}
        />

        <ProfileStats profile={profile} />

        <div className="grid gap-8 xl:grid-cols-3">

          <div className="space-y-8 xl:col-span-2">

            <AcademicCard profile={profile} />

            <ProfileDetails
              profile={profile}
              onChangePassword={() =>
                setShowPasswordModal(true)
              }
            />

          </div>

          <div>

            <QuickActions
              onChangePassword={() =>
                setShowPasswordModal(true)
              }
            />

          </div>

        </div>

      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() =>
          setShowPasswordModal(false)
        }
      />

    </>
  );
}