import {
  Mail,
  Phone,
  School,
  User,
  Calendar,
  MapPin,
  Shield,
  ArrowRight,
  Lock,
  BadgeCheck,
} from "lucide-react";

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-slate-50">

      <div className="rounded-2xl bg-blue-100 p-3 transition group-hover:scale-110">

        <Icon
          size={20}
          className="text-blue-600"
        />

      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <h3 className="truncate text-base font-semibold text-slate-900">
          {value || "-"}
        </h3>

      </div>

    </div>
  );
}

export default function ProfileDetails({
  profile,
  onChangePassword,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* Personal Information */}

      <div className="rounded-[32px] bg-white p-8 shadow-xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black">
              Personal Information
            </h2>

            <p className="mt-2 text-slate-500">
              Student details
            </p>

          </div>

          <BadgeCheck className="text-blue-600" />

        </div>

        <div className="space-y-2">

          <InfoRow
            icon={Mail}
            label="Email"
            value={profile?.email}
          />

          <InfoRow
            icon={Phone}
            label="Phone"
            value={profile?.phone}
          />

          <InfoRow
            icon={School}
            label="School"
            value={profile?.school}
          />

          <InfoRow
            icon={User}
            label="Parent"
            value={profile?.parentName}
          />

          <InfoRow
            icon={Phone}
            label="Parent Phone"
            value={profile?.parentPhone}
          />

          <InfoRow
            icon={Calendar}
            label="Admission Date"
            value={profile?.admissionDate}
          />

        </div>

      </div>

      {/* Right Side */}

      <div className="space-y-6">

        {/* Security */}

        <div className="rounded-[32px] bg-white p-8 shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">
                Security
              </h2>

              <p className="mt-2 text-slate-500">
                Manage your account
              </p>

            </div>

            <Shield className="text-blue-600" />

          </div>

          <button
            onClick={onChangePassword}
            className="mt-8 flex w-full items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all hover:border-blue-500 hover:bg-blue-50"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-slate-100 p-3">

                <Lock />

              </div>

              <div className="text-left">

                <h3 className="font-bold">
                  Change Password
                </h3>

                <p className="text-sm text-slate-500">
                  Update your login password
                </p>

              </div>

            </div>

            <ArrowRight />

          </button>

        </div>

        {/* Address */}

        <div className="rounded-[32px] bg-white p-8 shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">
                Address
              </h2>

              <p className="mt-2 text-slate-500">
                Registered address
              </p>

            </div>

            <MapPin className="text-blue-600" />

          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">

            <p className="leading-7 text-slate-700">
              {profile?.address || "No address available"}
            </p>

          </div>

          <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-4 font-semibold text-white transition-all hover:scale-[1.02]">

            Request Address Change

          </button>

        </div>

      </div>

    </div>
  );
}