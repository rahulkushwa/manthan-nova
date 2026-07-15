import { useMemo, useState } from "react";
import {
  X,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { toast } from "react-hot-toast";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import auth from "../../firebase/auth";

export default function ChangePasswordModal({
  open,
  onClose,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const checks = useMemo(() => ({
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  }), [newPassword]);

  const score =
    Number(checks.length) +
    Number(checks.upper) +
    Number(checks.lower) +
    Number(checks.number) +
    Number(checks.special);

  const strength = (() => {
    switch (score) {
      case 5:
        return {
          text: "Strong Password 💪",
          color: "bg-green-500",
          textColor: "text-green-600",
          width: "w-full",
        };

      case 4:
        return {
          text: "Good Password 👍",
          color: "bg-blue-500",
          textColor: "text-blue-600",
          width: "w-4/5",
        };

      case 3:
        return {
          text: "Fair Password 🙂",
          color: "bg-yellow-500",
          textColor: "text-yellow-600",
          width: "w-3/5",
        };

      default:
        return {
          text: "Weak Password ⚠",
          color: "bg-red-500",
          textColor: "text-red-600",
          width: "w-2/5",
        };
    }
  })();

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (score < 5) {
      toast.error(
        "Please choose a stronger password."
      );
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;

      const credential =
        EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

      await reauthenticateWithCredential(
        user,
        credential
      );

      await updatePassword(
        user,
        newPassword
      );

      toast.success(
        "Password updated successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();

    } catch (err) {

      console.error(err);

      toast.error(
        "Current password is incorrect."
      );

    } finally {

      setLoading(false);

    }
  }

  function Rule({
    ok,
    children,
  }) {
    return (
      <div
        className={`flex items-center gap-2 text-sm ${
          ok
            ? "text-green-600"
            : "text-slate-500"
        }`}
      >
        {ok
          ? <CheckCircle2 size={16}/>
          : <XCircle size={16}/>}

        {children}
      </div>
    );
  }  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-[32px] bg-white p-6 shadow-2xl sm:p-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-black">
              Change Password
            </h2>

            <p className="mt-2 text-slate-500">
              Create a strong password to keep your account secure.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Current Password */}

          <div>

            <label className="mb-2 block font-medium">
              Current Password
            </label>

            <div className="relative">

              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
                className="w-full rounded-2xl border p-4 pr-14 outline-none focus:border-blue-600"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(!showCurrent)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showCurrent ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label className="mb-2 block font-medium">
              New Password
            </label>

            <div className="relative">

              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Create a new password"
                className="w-full rounded-2xl border p-4 pr-14 outline-none focus:border-blue-600"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNew ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Strength */}

            <div className="mt-4">

              <div className="flex items-center justify-between">

                <span className="text-sm font-medium">
                  Password Strength
                </span>

                <span
                  className={`text-sm font-bold ${strength.textColor}`}
                >
                  {strength.text}
                </span>

              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className={`h-full ${strength.width} ${strength.color} rounded-full transition-all duration-500`}
                />

              </div>

            </div>

            {/* Rules */}

            <div className="mt-5 grid gap-3">

              <Rule ok={checks.length}>
                At least 8 characters
              </Rule>

              <Rule ok={checks.upper}>
                One uppercase letter
              </Rule>

              <Rule ok={checks.lower}>
                One lowercase letter
              </Rule>

              <Rule ok={checks.number}>
                One number
              </Rule>

              <Rule ok={checks.special}>
                One special character
              </Rule>

            </div>

          </div>

          {/* Confirm */}

          <div>

            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="w-full rounded-2xl border p-4 pr-14 outline-none focus:border-blue-600"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-4 font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >

            <Lock size={20} />

            {loading
              ? "Updating Password..."
              : "Update Password"}

          </button>

        </form>

      </div>

    </div>
  );
}