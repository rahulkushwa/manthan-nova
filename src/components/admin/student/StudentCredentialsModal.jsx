import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function StudentCredentialsModal({
  open,
  onClose,
  credentials,
}) {
  const [copied, setCopied] = useState(false);

  if (!open || !credentials) return null;

  function copyCredentials() {
    const text = `Student Account Credentials

Name: ${credentials.name}

Login Email: ${credentials.loginEmail}

Temporary Password: ${credentials.temporaryPassword}

Login URL:
${window.location.origin}/login`;

    navigator.clipboard.writeText(text);

    setCopied(true);

    toast.success("Credentials copied.");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        <div className="flex justify-center">

          <CheckCircle2
            size={70}
            className="text-green-600"
          />

        </div>

        <h2 className="mt-5 text-center text-3xl font-bold">
          Student Created Successfully
        </h2>

        <p className="mt-2 text-center text-slate-500">
          Share these credentials with the student.
        </p>

        <div className="mt-8 space-y-5 rounded-2xl bg-slate-100 p-6">

          <div>

            <p className="text-sm text-slate-500">
              Student Name
            </p>

            <p className="font-semibold">
              {credentials.name}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Login Email
            </p>

            <p className="font-semibold">
              {credentials.loginEmail}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Temporary Password
            </p>

            <p className="font-semibold text-blue-700">
              {credentials.temporaryPassword}
            </p>

          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <button
            onClick={copyCredentials}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Copy size={18} />

            {copied
              ? "Copied"
              : "Copy Credentials"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 font-semibold"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}