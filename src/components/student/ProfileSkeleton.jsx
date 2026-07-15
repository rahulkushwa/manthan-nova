export default function ProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">

      <div className="h-72 rounded-[32px] bg-slate-200" />

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="h-[520px] rounded-[32px] bg-slate-200" />

        <div className="space-y-6">

          <div className="h-56 rounded-[32px] bg-slate-200" />

          <div className="h-64 rounded-[32px] bg-slate-200" />

        </div>

      </div>

    </div>
  );
}