import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", students: 20 },
  { month: "Feb", students: 35 },
  { month: "Mar", students: 52 },
  { month: "Apr", students: 61 },
  { month: "May", students: 74 },
  { month: "Jun", students: 95 },
];

export default function DashboardChart() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-lg sm:p-6 lg:p-8">

      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-xl font-bold sm:text-2xl">
            Student Growth
          </h2>

          <p className="text-sm text-slate-500">
            Monthly student enrollment overview
          </p>

        </div>

      </div>

      <div className="h-64 sm:h-72 lg:h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient
                id="studentGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0.05}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
              width={35}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.12)",
              }}
            />

            <Area
              type="monotone"
              dataKey="students"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#studentGradient)"
              activeDot={{
                r: 6,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}