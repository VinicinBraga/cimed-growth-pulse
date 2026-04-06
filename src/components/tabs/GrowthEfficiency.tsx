import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  TrendingUp,
  DollarSign,
  Target,
  Percent,
  BarChart3,
  Gauge,
  Zap,
  LineChart as LineIcon,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const COLORS = {
  primary: "#F6C338",
  black: "#111111",
  darkGray: "#4B5563",
  gray: "#6B7280",
  lightGray: "#9CA3AF",
  lighterGray: "#D1D5DB",
  grid: "#E5E7EB",
};

const EFFICIENCY_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#4B5563",
];

const efficiencyChannels = [
  { channel: "Google Ads", cac: 42, roas: 5.4, ltv: 320 },
  { channel: "Meta Ads", cac: 38, roas: 5.8, ltv: 295 },
  { channel: "Orgânico", cac: 12, roas: 9.2, ltv: 410 },
  { channel: "CRM", cac: 18, roas: 7.1, ltv: 360 },
  { channel: "Parceiros", cac: 27, roas: 6.2, ltv: 305 },
];

const efficiencyTrend = [
  { month: "Jan", roas: 4.8, cac: 46, ltv: 280 },
  { month: "Fev", roas: 5.1, cac: 44, ltv: 290 },
  { month: "Mar", roas: 5.3, cac: 43, ltv: 300 },
  { month: "Abr", roas: 5.6, cac: 41, ltv: 315 },
  { month: "Mai", roas: 5.9, cac: 39, ltv: 330 },
  { month: "Jun", roas: 6.2, cac: 37, ltv: 345 },
];

const paybackData = [
  { segment: "Enterprise", months: 6 },
  { segment: "PME", months: 8 },
  { segment: "Middle Market", months: 7 },
  { segment: "Online", months: 5 },
];

function money(value: number) {
  return `R$ ${value}`;
}

export function GrowthEfficiency() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="ROAS" value="6.2x" change={0.6} icon={TrendingUp} />
        <KPICard label="CAC" value="R$ 37" change={-4.1} icon={DollarSign} />
        <KPICard label="LTV" value="R$ 345" change={5.4} icon={Target} />
        <KPICard label="LTV/CAC" value="9.3" change={0.8} icon={Gauge} />
        <KPICard label="Payback" value="6.5m" change={-0.4} icon={Zap} />
        <KPICard label="Margem" value="26%" change={1.2} icon={Percent} />
        <KPICard label="Eficiência" value="82%" change={2.1} icon={BarChart3} />
        <KPICard label="ROI de Growth" value="5.9x" change={0.5} icon={LineIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Tendência de ROAS">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={efficiencyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value: number) => [`${value}x`, "ROAS"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="roas"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendência de CAC">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value: number) => [money(value), "CAC"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Line
                type="monotone"
                dataKey="cac"
                stroke={COLORS.black}
                strokeWidth={2.5}
                dot={{ fill: COLORS.black, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="LTV por Canal">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={efficiencyChannels}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                dataKey="channel"
                tick={{ fontSize: 10, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value: number) => [money(value), "LTV"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Bar dataKey="ltv" radius={[8, 8, 0, 0]}>
                {efficiencyChannels.map((entry, index) => (
                  <Cell
                    key={entry.channel}
                    fill={EFFICIENCY_COLORS[index % EFFICIENCY_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ROAS por Canal">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={efficiencyChannels}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                dataKey="channel"
                tick={{ fontSize: 10, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value: number) => [`${value}x`, "ROAS"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Bar dataKey="roas" radius={[8, 8, 0, 0]}>
                {efficiencyChannels.map((entry, index) => (
                  <Cell
                    key={entry.channel}
                    fill={EFFICIENCY_COLORS[index % EFFICIENCY_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payback (meses)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={paybackData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                dataKey="segment"
                type="category"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
                width={90}
              />

              <Tooltip
                formatter={(value: number) => [`${value} meses`, "Payback"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Bar dataKey="months" radius={[0, 8, 8, 0]}>
                {paybackData.map((entry, index) => (
                  <Cell
                    key={entry.segment}
                    fill={EFFICIENCY_COLORS[index % EFFICIENCY_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}