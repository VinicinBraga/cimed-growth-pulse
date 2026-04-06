import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  Package,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  Target,
  Award,
  Activity,
  DollarSign,
} from "lucide-react";
import { monthlyTrend, topProducts, categoryRevenue, brandRevenue } from "@/data/mockData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
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

const CHART_COLORS = ["#F6C338", "#111111", "#6B7280", "#9CA3AF", "#D1D5DB", "#4B5563"];

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

export function ProductGrowth() {
  const productTrend = monthlyTrend.map((item, index) => ({
    month: item.month,
    launches: 2 + (index % 3),
    revenuePerProduct: 180000 + index * 8500,
    sellThrough: 68 + index * 0.9,
  }));

  const productMix = categoryRevenue.map((item, index) => ({
    ...item,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const brandMix = brandRevenue.map((item, index) => ({
    ...item,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const innovationPipeline = [
    { stage: "Ideação", value: 28 },
    { stage: "Pesquisa", value: 19 },
    { stage: "Desenvolvimento", value: 12 },
    { stage: "Teste", value: 7 },
    { stage: "Lançamento", value: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="SKUs Ativos" value="248" change={3.2} icon={Package} />
        <KPICard label="Receita por SKU" value="R$ 226K" change={2.4} icon={DollarSign} />
        <KPICard label="Sell-through" value="77,4%" change={1.8} icon={TrendingUp} />
        <KPICard label="Novos Lançamentos" value="18" change={12.5} icon={Award} />
        <KPICard label="Mix de Produtos" value="12 categorias" change={0.0} icon={ShoppingBag} />
        <KPICard label="Top SKU Share" value="34,2%" change={-1.1} icon={Target} />
        <KPICard label="Performance Média" value="8,6/10" change={0.4} icon={BarChart3} />
        <KPICard label="Pipeline de Inovação" value="69" change={5.7} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Receita Média por Produto">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={productTrend}>
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
                tickFormatter={(v) => formatCurrencyCompact(Number(v))}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrencyCompact(Number(value)), "Receita por Produto"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenuePerProduct"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.18}
                strokeWidth={2.5}
                name="Receita por Produto"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolução do Sell-through (%)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={productTrend}>
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
                formatter={(value: number) => [`${Number(value).toFixed(1).replace(".", ",")}%`, "Sell-through"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="sellThrough"
                stroke={COLORS.black}
                strokeWidth={2.5}
                dot={{ fill: COLORS.black, r: 3.5 }}
                activeDot={{ r: 5 }}
                name="Sell-through"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Receita por Categoria">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={productMix}>
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
                {productMix.map((entry, index) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita por Marca">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={brandMix} layout="vertical">
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
                width={80}
                tick={{ fontSize: 10, fill: COLORS.gray }}
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
              <Bar dataKey="revenue" radius={[0, 8, 8, 0]} name="Receita">
                {brandMix.map((entry) => (
                  <Cell key={entry.brand} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Pipeline de Inovação">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={innovationPipeline} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="stage"
                type="category"
                width={100}
                tick={{ fontSize: 10, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [formatCompactNumber(Number(value)), "Quantidade"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} name="Quantidade">
                {innovationPipeline.map((entry, index) => (
                  <Cell key={entry.stage} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Ranking de Produtos">
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
              {topProducts.map((product, index) => (
                <tr
                  key={product.name}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                      {product.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">
                    R$ {product.revenue}M
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {product.units.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {product.growth > 0 ? "+" : ""}
                    {product.growth}%
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