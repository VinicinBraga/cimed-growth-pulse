import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  Zap,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Activity,
  DollarSign,
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

const DRIVER_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#4B5563",
  "#D1D5DB",
];

const driverImpactData = [
  { driver: "Mídia Paga", impact: 32, contribution: 18.4 },
  { driver: "CRM", impact: 24, contribution: 12.1 },
  { driver: "Lançamentos", impact: 21, contribution: 10.8 },
  { driver: "Preço", impact: 17, contribution: 8.7 },
  { driver: "Distribuição", impact: 14, contribution: 7.2 },
  { driver: "Influenciadores", impact: 12, contribution: 6.4 },
];

const driverTrend = [
  { month: "Jan", growth: 8.2, drivers: 5.1, base: 3.1 },
  { month: "Fev", growth: 8.9, drivers: 5.5, base: 3.4 },
  { month: "Mar", growth: 9.4, drivers: 5.9, base: 3.5 },
  { month: "Abr", growth: 10.1, drivers: 6.3, base: 3.8 },
  { month: "Mai", growth: 10.8, drivers: 6.8, base: 4.0 },
  { month: "Jun", growth: 11.6, drivers: 7.2, base: 4.4 },
];

const experimentData = [
  { test: "Criativo UGC", uplift: 18.2, status: "Vencedor" },
  { test: "Landing Page A/B", uplift: 11.4, status: "Vencedor" },
  { test: "Bundle Promocional", uplift: 8.9, status: "Em teste" },
  { test: "Nova Oferta", uplift: 6.1, status: "Em teste" },
  { test: "Segmentação Lookalike", uplift: -2.3, status: "Perdedor" },
];

const leverageData = [
  { lever: "Aquisição", score: 82 },
  { lever: "Conversão", score: 76 },
  { lever: "Retenção", score: 71 },
  { lever: "Ticket Médio", score: 68 },
  { lever: "Expansão", score: 63 },
];

function percent(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

export function GrowthDrivers() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Drivers Ativos" value="12" change={2.0} icon={Zap} />
        <KPICard label="Contribuição de Growth" value="7,2%" change={0.4} icon={TrendingUp} />
        <KPICard label="Uplift Médio" value="9,8%" change={1.1} icon={Target} />
        <KPICard label="Experimentos" value="24" change={3.0} icon={Activity} />
        <KPICard label="Conversão Incremental" value="4,6%" change={0.5} icon={Users} />
        <KPICard label="Receita Incremental" value="R$ 8,4M" change={1.6} icon={DollarSign} />
        <KPICard label="Eficiência dos Drivers" value="78%" change={1.4} icon={BarChart3} />
        <KPICard label="Tração de Growth" value="11,6%" change={0.8} icon={LineIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Impacto dos Drivers">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={driverImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                dataKey="driver"
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
                formatter={(value: number) => [percent(value), "Impacto"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Bar dataKey="impact" radius={[8, 8, 0, 0]}>
                {driverImpactData.map((entry, index) => (
                  <Cell
                    key={entry.driver}
                    fill={DRIVER_COLORS[index % DRIVER_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendência de Crescimento">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={driverTrend}>
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
                  percent(value),
                  name === "growth"
                    ? "Crescimento Total"
                    : name === "drivers"
                    ? "Contribuição dos Drivers"
                    : "Base",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="growth"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2.5}
                name="Crescimento Total"
              />

              <Area
                type="monotone"
                dataKey="drivers"
                stroke={COLORS.black}
                fill={COLORS.black}
                fillOpacity={0.08}
                strokeWidth={2.5}
                name="Contribuição dos Drivers"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Contribuição por Driver">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={driverImpactData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                dataKey="driver"
                type="category"
                width={100}
                tick={{ fontSize: 10, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value: number) => [percent(value), "Contribuição"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Bar dataKey="contribution" radius={[0, 8, 8, 0]}>
                {driverImpactData.map((entry, index) => (
                  <Cell
                    key={entry.driver}
                    fill={DRIVER_COLORS[index % DRIVER_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Maturidade das Alavancas">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leverageData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

              <XAxis
                dataKey="lever"
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
                formatter={(value: number) => [`${value}%`, "Score"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {leverageData.map((entry, index) => (
                  <Cell
                    key={entry.lever}
                    fill={DRIVER_COLORS[index % DRIVER_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tração dos Drivers">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={driverTrend}>
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
                  percent(value),
                  name === "drivers" ? "Drivers" : "Base",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Line
                type="monotone"
                dataKey="drivers"
                stroke={COLORS.primary}
                strokeWidth={2.5}
                dot={{ fill: COLORS.primary, r: 4 }}
                activeDot={{ r: 6 }}
                name="Drivers"
              />

              <Line
                type="monotone"
                dataKey="base"
                stroke={COLORS.black}
                strokeWidth={2.5}
                dot={{ fill: COLORS.black, r: 4 }}
                activeDot={{ r: 6 }}
                name="Base"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Resumo de Experimentos">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Experimento
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Uplift
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {experimentData.map((item, index) => (
                <tr
                  key={item.test}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: DRIVER_COLORS[index % DRIVER_COLORS.length] }}
                      />
                      {item.test}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">
                    {item.uplift > 0 ? "+" : ""}
                    {percent(item.uplift)}
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {item.status}
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