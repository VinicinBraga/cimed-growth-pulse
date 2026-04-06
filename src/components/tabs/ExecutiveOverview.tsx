import { useEffect, useState } from "react";
import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  DollarSign,
  TrendingUp,
  Users,
  Package,
  Heart,
  Target,
  BarChart3,
} from "lucide-react";
import { dashboardApi } from "@/services/dashboardApi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  revenue: "#F6C338",
  spend: "#111111",
  roas: "#6B7280",
  cac: "#EF4444",
  ltv: "#4B5563",
};

const PIE_COLORS = ["#F6C338", "#111111", "#9CA3AF", "#6B7280", "#D1D5DB"];
const FUNNEL_COLORS = ["#F6C338", "#E5E7EB", "#9CA3AF", "#6B7280", "#111111", "#EF4444"];
const CHANNEL_COLORS = ["#F6C338", "#111111", "#9CA3AF", "#6B7280", "#D1D5DB"];

type OverviewResponse = {
  kpis: {
    netRevenue: string;
    mktSpend: string;
    roas: string;
    cac: string;
    customers: string;
    unitsSold: string;
    avgLtv: string;
    ltvCac: string;
  };
  monthlyTrend: Array<{
    month: string;
    revenue: number;
    spend: number;
    roas: number;
    cac: number;
  }>;
  roasTrend?: Array<{
    month: string;
    value: number;
  }>;
  cacTrend?: Array<{
    month: string;
    value: number;
  }>;
  channelRevenue: Array<{
    channel: string;
    revenue: number;
    color?: string;
  }>;
  categoryRevenue: Array<{
    category: string;
    pct: number;
  }>;
  regionRevenue: Array<{
    region: string;
    revenue: number;
  }>;
  funnelData: Array<{
    stage: string;
    value: number;
  }>;
  socialTrend: Array<{
    month: string;
    followers: number;
  }>;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(Number(value || 0));
}

function formatCompactNumber(value: number) {
  const num = Number(value || 0);

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(".", ",")}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(".", ",")}K`;
  }

  return formatNumber(num);
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

function formatDecimal(value: number, digits = 1) {
  return Number(value || 0).toFixed(digits).replace(".", ",");
}

function getRoasChartDomain(data: Array<{ value: number }>) {
  if (!data.length) return [0, 6];

  const values = data.map((item) => Number(item.value || 0));
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    return [Math.max(0, min - 1), max + 1];
  }

  const padding = Math.max(0.2, (max - min) * 0.25);
  return [Math.max(0, min - padding), max + padding];
}

function getCacChartDomain(data: Array<{ value: number }>) {
  if (!data.length) return [0, 300];

  const values = data.map((item) => Number(item.value || 0));
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    return [Math.max(0, min - 20), max + 20];
  }

  const padding = Math.max(5, (max - min) * 0.25);
  return [Math.max(0, min - padding), max + padding];
}

export function ExecutiveOverview() {
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = (await dashboardApi.getOverview()) as OverviewResponse;
        setData(response);
      } catch (err) {
        console.error("Erro ao carregar visão geral:", err);
        setError("Erro ao carregar visão geral");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div className="p-6">Carregando visão geral...</div>;
  }

  if (error || !data) {
    return <div className="p-6 text-red-500">{error || "Sem dados para exibir."}</div>;
  }

  const roasTrendData =
    data.roasTrend && data.roasTrend.length > 0
      ? data.roasTrend
      : data.monthlyTrend.map((item) => ({
          month: item.month,
          value: Number(item.roas || 0),
        }));

  const cacTrendData =
    data.cacTrend && data.cacTrend.length > 0
      ? data.cacTrend
      : data.monthlyTrend.map((item) => ({
          month: item.month,
          value: Number(item.cac || 0),
        }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Receita Líquida" value={data.kpis.netRevenue} change={4.5} icon={DollarSign} />
        <KPICard label="Investimento em Mídia" value={data.kpis.mktSpend} change={3.7} icon={TrendingUp} />
        <KPICard label="ROAS" value={data.kpis.roas} change={0.0} icon={Target} />
        <KPICard label="CAC" value={data.kpis.cac} change={-3.4} icon={BarChart3} />
        <KPICard label="Clientes" value={data.kpis.customers} change={5.5} icon={Users} />
        <KPICard label="Unidades Vendidas" value={data.kpis.unitsSold} change={4.4} icon={Package} />
        <KPICard label="LTV Médio" value={data.kpis.avgLtv} change={1.9} icon={Heart} />
        <KPICard label="LTV/CAC" value={data.kpis.ltvCac} change={5.6} icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Receita x Investimento em Mídia">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatCompactNumber(Number(value))}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrencyCompact(Number(value)),
                  name === "revenue" ? "Receita" : "Investimento",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.revenue}
                fill={COLORS.revenue}
                fillOpacity={0.18}
                strokeWidth={2.5}
                name="revenue"
              />
              <Area
                type="monotone"
                dataKey="spend"
                stroke={COLORS.spend}
                fill={COLORS.spend}
                fillOpacity={0.06}
                strokeWidth={2.5}
                name="spend"
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendência de ROAS">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={roasTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                domain={getRoasChartDomain(roasTrendData)}
                tickFormatter={(value) => `${formatDecimal(Number(value), 1)}x`}
              />
              <Tooltip
                formatter={(value: number) => [`${formatDecimal(Number(value), 2)}x`, "ROAS"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={COLORS.roas}
                strokeWidth={2.5}
                dot={{ fill: COLORS.roas, r: 3 }}
                activeDot={{ r: 5 }}
                name="ROAS"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Tendência de CAC">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={cacTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                domain={getCacChartDomain(cacTrendData)}
                tickFormatter={(value) => formatCompactNumber(Number(value))}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrencyCompact(Number(value)), "CAC"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={COLORS.cac}
                strokeWidth={2.5}
                dot={{ fill: COLORS.cac, r: 3 }}
                activeDot={{ r: 5 }}
                name="CAC"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita por Canal">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.channelRevenue} layout="vertical" margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatCompactNumber(Number(value))}
              />
              <YAxis
                dataKey="channel"
                type="category"
                tick={{ fontSize: 10, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                width={95}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrencyCompact(Number(value)), "Receita"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="revenue" name="Receita" radius={[0, 6, 6, 0]}>
                {data.channelRevenue.map((_, i) => (
                  <Cell key={i} fill={CHANNEL_COLORS[i % CHANNEL_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita por Categoria">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data.categoryRevenue}
                dataKey="pct"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={82}
                label={({ pct }) => `${pct}%`}
                labelLine={false}
              >
                {data.categoryRevenue.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, _name, props: any) => [
                  `${formatDecimal(Number(value), 1)}%`,
                  props?.payload?.category,
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Funil Executivo">
          <div className="space-y-3">
            {data.funnelData.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{stage.stage}</span>
                  <span className="text-muted-foreground">{formatCompactNumber(stage.value)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${data.funnelData[0] ? (stage.value / data.funnelData[0].value) * 100 : 0}%`,
                      backgroundColor: FUNNEL_COLORS[i % FUNNEL_COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Crescimento Social">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data.socialTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatCompactNumber(Number(v))}
              />
              <Tooltip
                formatter={(value: number) => [formatCompactNumber(Number(value)), "Seguidores"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="followers"
                stroke={COLORS.revenue}
                fill={COLORS.revenue}
                fillOpacity={0.12}
                strokeWidth={2.5}
                name="Seguidores"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita por Região">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.regionRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="region" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatCompactNumber(Number(value))}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrencyCompact(Number(value)), "Receita"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="revenue" fill={COLORS.revenue} radius={[6, 6, 0, 0]} name="Receita" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}