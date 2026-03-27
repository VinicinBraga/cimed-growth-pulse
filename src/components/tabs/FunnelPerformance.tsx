import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  Users,
  MousePointerClick,
  UserPlus,
  ShoppingCart,
  Percent,
  TrendingUp,
  Filter,
  BarChart3,
} from "lucide-react";
import { monthlyTrend } from "@/data/mockData";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel as RechartsFunnel,
  Tooltip,
  LabelList,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const COLORS = {
  primary: "#F6C338",
  primarySoft: "#FDE68A",
  black: "#111111",
  darkGray: "#4B5563",
  gray: "#6B7280",
  lightGray: "#9CA3AF",
  lighterGray: "#D1D5DB",
  grid: "#E5E7EB",
};

const FUNNEL_COLORS = ["#F6C338", "#111111", "#4B5563", "#6B7280", "#9CA3AF"];

function formatCompactNumber(value: number) {
  const num = Number(value || 0);

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(".", ",")}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(".", ",")}K`;
  }

  return `${num}`;
}

export function FunnelPerformance() {
  const funnelData = [
    { name: "Visitors", value: 42000000, fill: FUNNEL_COLORS[0] },
    { name: "Clicks", value: 1260000, fill: FUNNEL_COLORS[1] },
    { name: "Leads", value: 185000, fill: FUNNEL_COLORS[2] },
    { name: "Qualified", value: 24800, fill: FUNNEL_COLORS[3] },
    { name: "Customers", value: 1740, fill: FUNNEL_COLORS[4] },
  ];

  const conversionByStage = [
    { stage: "Visit → Click", rate: 3.0 },
    { stage: "Click → Lead", rate: 14.7 },
    { stage: "Lead → Qualified", rate: 13.4 },
    { stage: "Qualified → Customer", rate: 7.0 },
  ];

  const dropoffData = [
    { stage: "Visitors", lost: 40740000 },
    { stage: "Clicks", lost: 1075000 },
    { stage: "Leads", lost: 160200 },
    { stage: "Qualified", lost: 23060 },
  ];

  const funnelTrend = monthlyTrend.map((item, index) => ({
    month: item.month,
    visitToLead: 0.38 + index * 0.01 + (index % 2 === 0 ? 0.01 : 0.02),
    leadToCustomer: 0.82 + index * 0.015 + (index % 2 === 0 ? 0.01 : 0.025),
  }));

  const stageVolumeTrend = monthlyTrend.map((item, index) => ({
    month: item.month,
    visitors: 3200000 + index * 110000,
    leads: 13000 + index * 650,
    customers: 110 + index * 8,
  }));

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Visitors" value="42M" change={8.2} icon={Users} />
        <KPICard label="Clicks" value="1.26M" change={5.1} icon={MousePointerClick} />
        <KPICard label="Leads" value="185K" change={6.8} icon={UserPlus} />
        <KPICard label="Customers" value="1,740" change={5.5} icon={ShoppingCart} />
        <KPICard label="Visit → Click" value="3.0%" change={0.2} icon={Percent} />
        <KPICard label="Click → Lead" value="14.7%" change={0.8} icon={TrendingUp} />
        <KPICard label="Lead → Customer" value="0.9%" change={0.1} icon={Filter} />
        <KPICard label="Overall CVR" value="0.004%" change={0.0} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Full Funnel">
          <ResponsiveContainer width="100%" height={320}>
            <FunnelChart>
              <Tooltip
                formatter={(value: number) => [formatCompactNumber(Number(value)), "Volume"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <RechartsFunnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList
                  position="right"
                  fill={COLORS.gray}
                  stroke="none"
                  dataKey="name"
                  style={{ fontSize: 12, fontWeight: 500 }}
                />
              </RechartsFunnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Conversion Rate by Stage (%)">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={conversionByStage}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                dataKey="stage"
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
                formatter={(value: number) => [`${value.toFixed(1).replace(".", ",")}%`, "Rate"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                {conversionByStage.map((entry, index) => (
                  <Cell key={entry.stage} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Drop-off by Stage">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dropoffData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatCompactNumber(Number(v))}
              />
              <YAxis
                dataKey="stage"
                type="category"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                formatter={(value: number) => [formatCompactNumber(Number(value)), "Lost"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="lost" radius={[0, 8, 8, 0]}>
                {dropoffData.map((entry, index) => (
                  <Cell key={entry.stage} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Conversion Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={funnelTrend}>
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
                formatter={(value: number, name: string) => [
                  `${Number(value).toFixed(2).replace(".", ",")}%`,
                  name === "visitToLead" ? "Visit → Lead" : "Lead → Customer",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="visitToLead"
                stroke={COLORS.primary}
                strokeWidth={2.5}
                dot={{ fill: COLORS.primary, r: 3.5 }}
                activeDot={{ r: 5 }}
                name="Visit → Lead"
              />
              <Line
                type="monotone"
                dataKey="leadToCustomer"
                stroke={COLORS.black}
                strokeWidth={2.5}
                dot={{ fill: COLORS.black, r: 3.5 }}
                activeDot={{ r: 5 }}
                name="Lead → Customer"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Stage Volume Trend">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={stageVolumeTrend}>
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
                tickFormatter={(v) => formatCompactNumber(Number(v))}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCompactNumber(Number(value)),
                  name === "visitors" ? "Visitors" : name === "leads" ? "Leads" : "Customers",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke={COLORS.lightGray}
                fill={COLORS.lightGray}
                fillOpacity={0.18}
                strokeWidth={2}
                name="Visitors"
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2}
                name="Leads"
              />
              <Area
                type="monotone"
                dataKey="customers"
                stroke={COLORS.black}
                fill={COLORS.black}
                fillOpacity={0.08}
                strokeWidth={2}
                name="Customers"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Funnel Step Summary">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Stage
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Volume
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Share
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Prev. Step CVR
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { stage: "Visitors", volume: "42,0M", share: "100%", cvr: "-" },
                { stage: "Clicks", volume: "1,26M", share: "3,0%", cvr: "3,0%" },
                { stage: "Leads", volume: "185K", share: "0,44%", cvr: "14,7%" },
                { stage: "Qualified", volume: "24,8K", share: "0,06%", cvr: "13,4%" },
                { stage: "Customers", volume: "1.740", share: "0,004%", cvr: "7,0%" },
              ].map((row, index) => (
                <tr
                  key={row.stage}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: FUNNEL_COLORS[index % FUNNEL_COLORS.length] }}
                      />
                      {row.stage}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">{row.volume}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{row.share}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{row.cvr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}