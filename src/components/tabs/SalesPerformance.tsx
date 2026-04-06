import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  DollarSign,
  Package,
  ShoppingCart,
  CreditCard,
  Percent,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import {
  monthlyTrend,
  channelRevenue,
  categoryRevenue,
  topProducts,
  brandRevenue,
} from "@/data/mockData";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

const CHANNEL_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
  "#4B5563",
];

const CATEGORY_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
  "#4B5563",
];

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

export function SalesPerformance() {
  const styledChannelRevenue = channelRevenue.map((item, index) => ({
    ...item,
    color: CHANNEL_COLORS[index % CHANNEL_COLORS.length],
  }));

  const styledCategoryRevenue = categoryRevenue.map((item, index) => ({
    ...item,
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  }));

  const styledBrandRevenue = brandRevenue.map((item, index) => ({
    ...item,
    color: CHANNEL_COLORS[index % CHANNEL_COLORS.length],
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Receita Líquida" value="R$ 56.2M" change={4.5} icon={DollarSign} />
        <KPICard label="Receita Bruta" value="R$ 62.8M" change={4.1} icon={DollarSign} />
        <KPICard label="Unidades Vendidas" value="59.4K" change={4.4} icon={Package} />
        <KPICard label="Pedidos" value="8,420" change={3.8} icon={ShoppingCart} />
        <KPICard label="Ticket Médio" value="R$ 745" change={1.2} icon={CreditCard} />
        <KPICard label="Descontos" value="R$ 4.2M" change={-2.1} icon={Percent} />
        <KPICard label="Devoluções" value="R$ 2.4M" change={-5.2} icon={RotateCcw} />
        <KPICard label="Receita/Unidade" value="R$ 946" change={0.8} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Tendência de Receita (R$ M)">
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
                tickFormatter={(v) => formatCompactNumber(Number(v))}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrencyCompact(Number(value)), "Receita"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2.5}
                name="Receita"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendência de Unidades Vendidas">
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
                tickFormatter={(v) => formatCompactNumber(Number(v))}
              />
              <Tooltip
                formatter={(value: number) => [formatCompactNumber(Number(value)), "Unidades"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="units"
                stroke={COLORS.black}
                fill={COLORS.black}
                fillOpacity={0.06}
                strokeWidth={2.5}
                name="Unidades"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Receita por Canal (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={styledChannelRevenue} layout="vertical">
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
                formatter={(value: number) => [formatCurrencyCompact(Number(value) * 1000000), "Receita"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
                {styledChannelRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita por Categoria (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={styledCategoryRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 9, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrencyCompact(Number(value) * 1000000), "Receita"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]} name="Receita">
                {styledCategoryRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita por Marca (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={styledBrandRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="brand"
                type="category"
                tick={{ fontSize: 10, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
                width={88}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrencyCompact(Number(value) * 1000000), "Receita"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="revenue" radius={[0, 8, 8, 0]} name="Receita">
                {styledBrandRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Produtos Mais Vendidos">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Produto
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Receita
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Unidades
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Crescimento
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, index) => (
                <tr
                  key={p.name}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: CHANNEL_COLORS[index % CHANNEL_COLORS.length] }}
                      />
                      {p.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">
                    R$ {p.revenue}M
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {p.units.toLocaleString()}
                  </td>
                  <td
                    className="py-3 px-4 text-right font-semibold"
                    style={{ color: p.growth >= 0 ? COLORS.black : COLORS.gray }}
                  >
                    {p.growth >= 0 ? "+" : ""}
                    {p.growth}%
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