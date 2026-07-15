"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface PerformanceData {
  month: string;
  credits: number;
}

interface Props {
  data: PerformanceData[];
}

export default function CreatorPerformanceChart({
  data,
}: Props) {

  const totalCredits = data.reduce(
    (sum, item) => sum + item.credits,
    0
  );

  return (
    <div className="
      rounded-3xl
      border border-slate-700/60
      bg-[#111827]
      p-6
      shadow-xl
    ">

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">

        <div>
          <h3 className="
            text-xl
            font-bold
            text-white
          ">
            Recent Performance
          </h3>

          <p className="
            mt-1
            text-sm
            text-slate-400
          ">
            Credits raised over the last 6 months
          </p>
        </div>


        <div className="text-right">

          <p className="
            text-xs
            text-slate-400
          ">
            Total Credits
          </p>

          <p className="
            text-xl
            font-bold
            text-white
          ">
            {totalCredits}
          </p>

        </div>

      </div>


      <div className="h-[320px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            barGap={18}
          >

            <CartesianGrid
              vertical={false}
              stroke="#334155"
              strokeDasharray="4 4"
              opacity={0.5}
            />


            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{
                fill:"#94a3b8",
                fontSize:12
              }}
            />


            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill:"#94a3b8",
                fontSize:12
              }}
            />


            <Tooltip
              cursor={{
                fill:"rgba(34,211,238,0.08)"
              }}

              contentStyle={{
                background:"#0f172a",
                border:"1px solid #334155",
                borderRadius:"14px",
                color:"#fff",
              }}

              labelStyle={{
                color:"#22d3ee",
                fontWeight:600
              }}

              formatter={(value)=>[
                `${value} Credits`,
                "Raised"
              ]}
            />


            <Bar
              dataKey="credits"
              radius={[
                12,
                12,
                0,
                0
              ]}
              animationDuration={1200}
            >

              {
                data.map((_, index)=>(
                  <Cell
                    key={index}
                    fill={
                      index === data.length - 1
                      ? "#6366f1"
                      : "#06b6d4"
                    }
                  />
                ))
              }

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}