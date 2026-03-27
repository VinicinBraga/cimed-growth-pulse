import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  DollarSign,
  TrendingUp,
  Eye,
  MousePointer,
  Users,
  ShoppingCart,
  Target,
  BarChart3,
} from "lucide-react";
import { monthlyTrend, channelRevenue, campaignData } from "@/data/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
  mutedFill: "#F3F4F6",
};

const CHANNEL_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
  "#4B5563",
];

const FUNNEL_COLORS = ["#F6C338", "#111111", "#6B7280", "#9CA3AF"];

const ctrData = monthlyTrend.map((m, index) => ({
  month: m.month,
  ctr: 2.6 + index * 0.08 + (index % 2 === 0 ? 0.06 : 0.12),
}));

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

function formatCurrencyCompact(value: number) {
  const num = Number(value || 0);

  if (num >= 1000000) {
    return `R$ ${(num / 1000000).toFixed(1).replace(".", ",")}M`;
  }

  if (num >= 1000) {
    return `R$ ${(num / 1000).toFixed(1).replace(".", ",")}K`;
  }

  return `R$ ${num.toFixed(0).replace(".", ",")}`;
}

export function MarketingPerformance() {
  const marketingFunnel = [
    { stage: "Impressions", value: 42000000 },
    { stage: "Clicks", value: 1260000 },
    { stage: "Leads", value: 185000 },
    { stage: "Purchases", value: 1740 },
  ];

  const channelRevenueStyled = channelRevenue.map((item, index) => ({
    ...item,
    color: CHANNEL_COLORS[index % CHANNEL_COLORS.length],
  }));

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Spend" value="R$ 11.2M" change={3.7} icon={DollarSign} />
        <KPICard label="Revenue" value="R$ 56.2M" change={4.5} icon={TrendingUp} />
        <KPICard label="ROAS" value="5.0x" change={0.0} icon={Target} />
        <KPICard label="Impressions" value="42M" change={8.2} icon={Eye} />
        <KPICard label="Clicks" value="1.26M" change={5.1} icon={MousePointer} />
        <KPICard label="Leads" value="185K" change={6.8} icon={Users} />
        <KPICard label="Purchases" value="1,740" change={5.5} icon={ShoppingCart} />
        <KPICard label="CPA" value="R$ 28" change={-3.4} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Spend vs Revenue (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
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
                  formatCurrencyCompact(Number(value) * 1000000),
                  name === "revenue" ? "Revenue" : "Spend",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2.5}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="spend"
                stroke={COLORS.black}
                fill={COLORS.black}
                fillOpacity={0.06}
                strokeWidth={2.5}
                name="Spend"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ROAS by Channel">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={channelRevenueStyled}>
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
                formatter={(value: number) => [`${Number(value).toFixed(1)}x`, "ROAS"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="roas" name="ROAS" radius={[8, 8, 0, 0]}>
                {channelRevenueStyled.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Spend by Channel (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelRevenueStyled} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="channel"
                type="category"
                tick={{ fontSize: 10, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
                width={88}
              />
              <Tooltip
                formatter={(value: number) => [`R$ ${Number(value).toFixed(1)}M`, "Spend"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="spend" name="Spend" radius={[0, 8, 8, 0]}>
                {channelRevenueStyled.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Marketing Funnel">
          <div className="space-y-4">
            {marketingFunnel.map((item, index) => (
              <div key={item.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{item.stage}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatCompactNumber(item.value)}
                  </span>
                </div>

                <div className="w-full h-5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / marketingFunnel[0].value) * 100}%`,
                      backgroundColor: FUNNEL_COLORS[index],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="CTR Trend (%)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ctrData}>
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
                domain={[2, 4]}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(2).replace(".", ",")}%`, "CTR"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="ctr"
                stroke={COLORS.primary}
                strokeWidth={2.5}
                dot={{ fill: COLORS.black, r: 3.5, stroke: COLORS.primary, strokeWidth: 2 }}
                activeDot={{ r: 5, fill: COLORS.primary, stroke: COLORS.black, strokeWidth: 2 }}
                name="CTR"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Campaign Ranking">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Campaign
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Spend
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Revenue
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  ROAS
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  CPA
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((c, index) => (
                <tr
                  key={c.campaign}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: CHANNEL_COLORS[index % CHANNEL_COLORS.length] }}
                      />
                      {c.campaign}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">R$ {c.spend}M</td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">
                    R$ {c.revenue}M
                  </td>
                  <td
                    className="py-3 px-4 text-right font-semibold"
                    style={{ color: c.roas >= 5 ? COLORS.black : COLORS.primary }}
                  >
                    {c.roas}x
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">R$ {c.cpa}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: c.status === "Active" ? "#FEF3C7" : "#F3F4F6",
                        color: c.status === "Active" ? "#111111" : "#6B7280",
                        borderColor: c.status === "Active" ? "#F6C338" : "#D1D5DB",
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}