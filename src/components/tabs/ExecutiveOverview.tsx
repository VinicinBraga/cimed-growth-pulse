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
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke={COLORS.revenue} fill={COLORS.revenue} />
              <Area type="monotone" dataKey="spend" stroke={COLORS.spend} fill={COLORS.spend} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendência de ROAS">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="roas" stroke={COLORS.revenue} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
