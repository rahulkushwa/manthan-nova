import {
  KeyRound,
  MapPinned,
  Download,
  LifeBuoy,
  ChevronRight,
  Shield,
} from "lucide-react";

const actions = [
  {
    id: "password",
    title: "Change Password",
    description: "Keep your account secure",
    icon: KeyRound,
    color: "bg-blue-100 text-blue-600",
    badge: "Recommended",
  },
  {
    id: "address",
    title: "Request Address Change",
    description: "Submit request to admin",
    icon: MapPinned,
    color: "bg-amber-100 text-amber-600",
    badge: "Approval Required",
  },
  {
    id: "idcard",
    title: "Download Student ID",
    description: "Coming Soon",
    icon: Download,
    color: "bg-emerald-100 text-emerald-600",
    badge: "Soon",
  },
  {
    id: "support",
    title: "Help & Support",
    description: "Contact Manthan Nova",
    icon: LifeBuoy,
    color: "bg-violet-100 text-violet-600",
    badge: "24×7",
  },
];

export default function QuickActions({
  onChangePassword,
}) {
  function handleClick(action) {
    if (action.id === "password") {
      onChangePassword();
    }

    if (action.id === "address") {
      // Next Step
    }

    if (action.id === "idcard") {
      // Coming Soon
    }

    if (action.id === "support") {
      // Coming Soon
    }
  }

  return (
    <div className="sticky top-24 rounded-[32px] bg-white p-8 shadow-xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-500">
            Frequently used tools
          </p>

        </div>

        <Shield className="text-blue-600" />

      </div>

      <div className="space-y-4">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.id}
              onClick={() => handleClick(action)}
              className="group w-full rounded-2xl border border-slate-200 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div
                    className={`rounded-2xl p-3 ${action.color}`}
                  >

                    <Icon size={22} />

                  </div>

                  <div>

                    <h3 className="font-bold">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {action.description}
                    </p>

                  </div>

                </div>

                <ChevronRight className="transition group-hover:translate-x-1" />

              </div>

              <div className="mt-5">

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">

                  {action.badge}

                </span>

              </div>

            </button>

          );

        })}

      </div>

    </div>
  );
}