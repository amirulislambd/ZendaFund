"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    month: string;
    credits: number;
  }[];
}

export default function AdminIncomeChart({ data }: Props) {
  const formatMonthLabel = (raw: string) => {
    if (!raw) return "Unknown";
    if (/^\d{4}-\d{2}$/.test(raw)) {
      const [year, month] = raw.split("-");
      const parsedYear = Number(year);
      const parsedMonth = Number(month) - 1;
      if (!Number.isNaN(parsedYear) && parsedMonth >= 0 && parsedMonth < 12) {
        const date = new Date(parsedYear, parsedMonth, 1);
        return `${date.toLocaleString("default", { month: "short" })} ${year}`;
      }
    }
    if (/^\d{1,2}$/.test(raw)) {
      const monthIndex = Number(raw) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return new Date(0, monthIndex).toLocaleString("default", {
          month: "short",
        });
      }
    }
    return raw;
  };

  const chartData =
    Array.isArray(data) && data.length > 0
      ? data.map((item) => ({
          month: formatMonthLabel(String(item.month ?? "")),
          credits: Number(item.credits ?? 0) || 0,
        }))
      : [
          { month: "Jan", credits: 0 },
          { month: "Feb", credits: 0 },
          { month: "Mar", credits: 0 },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-3xl border border-slate-700/50 bg-[#0f172a] p-6 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
      <h3 className="text-xl font-bold text-white mb-6">Monthly Performance</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#06b6d4", fontWeight: "bold" }}
              formatter={(value: any) => [
                `${Number(value).toLocaleString()} credits`,
                "Credits",
              ]}
            />
            <Area
              type="monotone"
              dataKey="credits"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCredits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
