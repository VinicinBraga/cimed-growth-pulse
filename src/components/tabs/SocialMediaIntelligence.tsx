import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  MessageCircle,
  Heart,
  Share2,
  Users,
  TrendingUp,
  Eye,
  BarChart3,
  ThumbsUp,
} from "lucide-react";
import { socialData, monthlyTrend } from "@/data/mockData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
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

const PLATFORM_COLORS = ["#F6C338", "#111111", "#6B7280", "#9CA3AF", "#D1D5DB"];
const SENTIMENT_COLORS = ["#111111", "#F6C338", "#9CA3AF"];

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

export function SocialMediaIntelligence() {
  const engagementTrend = monthlyTrend.map((item, index) => ({
    month: item.month,
    engagement: 3.8 + index * 0.12 + (index % 2 === 0 ? 0.08 : 0.16),
    reach: 1800000 + index * 85000,
    mentions: 24000 + index * 1200,
  }));

  const platformPerformance = [
    { platform: "Instagram", followers: 3200000, engagement: 4.8, mentions: 18500 },
    { platform: "TikTok", followers: 2100000, engagement: 5.6, mentions: 14200 },
    { platform: "YouTube", followers: 1250000, engagement: 3.4, mentions: 9800 },
    { platform: "Facebook", followers: 980000, engagement: 2.9, mentions: 7200 },
    { platform: "X", followers: 640000, engagement: 2.1, mentions: 4300 },
  ];

  const sentimentData = [
    { name: "Positivo", value: 62 },
    { name: "Neutro", value: 27 },
    { name: "Negativo", value: 11 },
  ];

  const contentPerformance = [
    { type: "Vídeo Curto", engagement: 5.9, reach: 2400000 },
    { type: "Imagem", engagement: 3.8, reach: 1600000 },
    { type: "Carrossel", engagement: 4.6, reach: 1900000 },
    { type: "Stories", engagement: 3.1, reach: 1300000 },
    { type: "UGC", engagement: 5.2, reach: 1750000 },
  ];

  const mentionsTrend = monthlyTrend.map((item, index) => ({
    month: item.month,
    organic: 12000 + index * 700,
    paid: 8000 + index * 550,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Seguidores" value="8,2M" change={6.4} icon={Users} />
        <KPICard label="Alcance" value="22,4M" change={8.1} icon={Eye} />
        <KPICard label="Engajamento" value="4,7%" change={0.5} icon={Heart} />
        <KPICard label="Menções" value="54K" change={7.2} icon={MessageCircle} />
        <KPICard label="Compartilhamentos" value="182K" change={5.9} icon={Share2} />
        <KPICard label="Interações" value="1,34M" change={6.8} icon={ThumbsUp} />
        <KPICard label="Crescimento" value="+12,6%" change={1.1} icon={TrendingUp} />
        <KPICard label="Share of Voice" value="28,4%" change={0.9} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Tendência de Engajamento (%)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={engagementTrend}>
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
                formatter={(value: number) => [`${value.toFixed(2).replace(".", ",")}%`, "Engajamento"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke={COLORS.primary}
                strokeWidth={2.5}
                dot={{ fill: COLORS.primary, r: 3.5 }}
                activeDot={{ r: 5 }}
                name="Engajamento"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendência de Alcance">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={engagementTrend}>
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
                formatter={(value: number) => [formatCompactNumber(Number(value)), "Alcance"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="reach"
                stroke={COLORS.black}
                fill={COLORS.black}
                fillOpacity={0.08}
                strokeWidth={2.5}
                name="Alcance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Performance por Plataforma">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={platformPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                dataKey="platform"
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
                formatter={(value: number, name: string) => [
                  name === "followers"
                    ? formatCompactNumber(Number(value))
                    : `${Number(value).toFixed(1).replace(".", ",")}%`,
                  name === "followers" ? "Seguidores" : "Engajamento",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="engagement" radius={[8, 8, 0, 0]} name="Engajamento">
                {platformPerformance.map((entry, index) => (
                  <Cell key={entry.platform} fill={PLATFORM_COLORS[index % PLATFORM_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sentimento das Menções">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={78}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={entry.name} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Participação"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Menções ao Longo do Tempo">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mentionsTrend}>
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
                  name === "organic" ? "Orgânicas" : "Pagas",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="organic"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2}
                name="Orgânicas"
              />
              <Area
                type="monotone"
                dataKey="paid"
                stroke={COLORS.black}
                fill={COLORS.black}
                fillOpacity={0.08}
                strokeWidth={2}
                name="Pagas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Performance por Tipo de Conteúdo">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Tipo de Conteúdo
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Engajamento
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Alcance
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Prioridade
                </th>
              </tr>
            </thead>
            <tbody>
              {contentPerformance.map((row, index) => (
                <tr
                  key={row.type}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: PLATFORM_COLORS[index % PLATFORM_COLORS.length] }}
                      />
                      {row.type}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">
                    {row.engagement.toFixed(1).replace(".", ",")}%
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {formatCompactNumber(row.reach)}
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {row.engagement >= 5
                      ? "Alta"
                      : row.engagement >= 4
                      ? "Média"
                      : "Baixa"}
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