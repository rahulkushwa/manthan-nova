import {
  CheckCircle2,
  Database,
  Cloud,
  ShieldCheck,
} from "lucide-react";

const status = [
  {
    icon: Database,
    title: "Firestore",
    state: "Connected",
    color: "text-green-600",
  },
  {
    icon: Cloud,
    title: "Storage",
    state: "Connected",
    color: "text-green-600",
  },
  {
    icon: ShieldCheck,
    title: "Authentication",
    state: "Secure",
    color: "text-green-600",
  },
];

export default function SystemStatus() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        System Status
      </h2>

      <div className="space-y-5">
        {status.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Icon
                  size={24}
                  className={item.color}
                />

                <span>{item.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />

                <span className="font-semibold">
                  {item.state}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}