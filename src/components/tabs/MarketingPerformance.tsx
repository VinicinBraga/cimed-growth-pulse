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
    { stage: "Impressões", value: 42000000 },
    { stage: "Cliques", value: 1260000 },
    { stage: "Leads", value: 185000 },
    { stage: "Compras", value: 1740 },
  ];

  const channelRevenueStyled = channelRevenue.map((item, index) => ({
    ...item,
    color: CHANNEL_COLORS[index % CHANNEL_COLORS.length],
  }));

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Investimento" value="R$ 11.2M" change={3.7} icon={DollarSign} />
        <KPICard label="Receita" value="R$ 56.2M" change={4.5} icon={TrendingUp} />
        <KPICard label="ROAS" value="5.0x" change={0.0} icon={Target} />
        <KPICard label="Impressões" value="42M" change={8.2} icon={Eye} />
        <KPICard label="Cliques" value="1.26M" change={5.1} icon={MousePointer} />
        <KPICard label="Leads" value="185K" change={6.8} icon={Users} />
        <KPICard label="Compras" value="1.740" change={5.5} icon={ShoppingCart} />
        <KPICard label="CPA" value="R$ 28" change={-3.4} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <ChartCard title="Investimento x Receita (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrencyCompact(Number(value) * 1000000),
                  name === "revenue" ? "Receita" : "Investimento",
                ]}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2.5}
                name="Receita"
              />

              <Area
                type="monotone"
                dataKey="spend"
                stroke={COLORS.black}
                fill={COLORS.black}
                fillOpacity={0.06}
                strokeWidth={2.5}
                name="Investimento"
              />

            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ROAS por Canal">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={channelRevenueStyled}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis dataKey="channel" />

              <YAxis />

              <Tooltip
                formatter={(value: number) => [
                  `${Number(value).toFixed(1)}x`,
                  "ROAS",
                ]}
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

        <ChartCard title="Investimento por Canal (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelRevenueStyled} layout="vertical">

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis type="number" />

              <YAxis
                dataKey="channel"
                type="category"
                width={90}
              />

              <Tooltip
                formatter={(value: number) => [
                  `R$ ${Number(value).toFixed(1)}M`,
                  "Investimento",
                ]}
              />

              <Bar dataKey="spend" name="Investimento">
                {channelRevenueStyled.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Funil de Marketing">

          <div className="space-y-4">

            {marketingFunnel.map((item, index) => (

              <div key={item.stage}>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">
                    {item.stage}
                  </span>

                  <span className="text-xs">
                    {formatCompactNumber(item.value)}
                  </span>
                </div>

                <div className="w-full h-5 rounded-full bg-muted overflow-hidden">

                  <div
                    className="h-full rounded-full"
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

        <ChartCard title="Tendência de CTR (%)">

          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ctrData}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis dataKey="month" />

              <YAxis domain={[2,4]} />

              <Tooltip
                formatter={(value: number) => [
                  `${value.toFixed(2).replace(".",",")}%`,
                  "CTR",
                ]}
              />

              <Line
                type="monotone"
                dataKey="ctr"
                stroke={COLORS.primary}
                strokeWidth={2.5}
                name="CTR"
              />

            </LineChart>
          </ResponsiveContainer>

        </ChartCard>

      </div>

      <ChartCard title="Ranking de Campanhas">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4">
                  Campanha
                </th>
                <th className="text-right py-3 px-4">
                  Investimento
                </th>
                <th className="text-right py-3 px-4">
                  Receita
                </th>
                <th className="text-right py-3 px-4">
                  ROAS
                </th>
                <th className="text-right py-3 px-4">
                  CPA
                </th>
                <th className="text-right py-3 px-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((c,index)=>(
                <tr key={c.campaign}>
                  <td className="py-3 px-4">
                    {c.campaign}
                  </td>
                  <td className="py-3 px-4 text-right">
                    R$ {c.spend}M
                  </td>
                  <td className="py-3 px-4 text-right">
                    R$ {c.revenue}M
                  </td>
                  <td className="py-3 px-4 text-right">
                    {c.roas}x
                  </td>
                  <td className="py-3 px-4 text-right">
                    R$ {c.cpa}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {c.status === "Active"
                      ? "Ativa"
                      : "Pausada"}
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