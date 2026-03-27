import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  Package,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Boxes,
  Star,
  Percent,
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
  AreaChart,
  Area,
  LineChart,
  Line,
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

const PRODUCT_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#4B5563",
  "#D1D5DB",
];

const productCategories = [
  { category: "Higiene", revenue: 18.4, growth: 8.2, units: 18200 },
  { category: "Beleza", revenue: 14.9, growth: 6.1, units: 14900 },
  { category: "Suplementos", revenue: 11.8, growth: 9.4, units: 12100 },
  { category: "Infantil", revenue: 6.7, growth: 4.2, units: 7600 },
  { category: "Dermocosméticos", revenue: 4.6, growth: 7.8, units: 3900 },
];

const skuPerformance = [
  { sku: "SKU A", revenue: 8.2, growth: 9.1 },
  { sku: "SKU B", revenue: 7.4, growth: 6.8 },
  { sku: "SKU C", revenue: 6.6, growth: 5.2 },
  { sku: "SKU D", revenue: 5.9, growth: 7.6 },
  { sku: "SKU E", revenue: 4.8, growth: 4.3 },
];

const monthlyProductTrend = [
  { month: "Jan", launches: 4, revenue: 6.4, margin: 24.1 },
  { month: "Feb", launches: 3, revenue: 7.1, margin: 24.8 },
  { month: "Mar", launches: 5, revenue: 7.8, margin: 25.4 },
  { month: "Apr", launches: 4, revenue: 8.2, margin: 25.1 },
  { month: "May", launches: 6, revenue: 9.4, margin: 26.0 },
  { month: "Jun", launches: 5, revenue: 10.1, margin: 26.5 },
];

function formatCompactNumber(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(".", ",")}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(".", ",")}K`;
  return `${value}`;
}

function formatCurrencyCompact(value: number) {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1).replace(".", ",")}M`;
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(1).replace(".", ",")}K`;
  return `R$ ${value.toFixed(0).replace(".", ",")}`;
}

export function ProductGrowth() {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Active SKUs" value="1.284" change={3.2} icon={Package} />
        <KPICard label="Product Revenue" value="R$ 56.4M" change={6.1} icon={DollarSign} />
        <KPICard label="Units Sold" value="56.7K" change={4.8} icon={ShoppingCart} />
        <KPICard label="Avg Margin" value="25.3%" change={0.7} icon={Percent} />
        <KPICard label="Launches" value="27" change={8.4} icon={Star} />
        <KPICard label="Top Category" value="Higiene" change={0.0} icon={Boxes} />
        <KPICard label="Growth Rate" value="6.9%" change={0.9} icon={TrendingUp} />
        <KPICard label="Rev / SKU" value="R$ 43,9K" change={1.3} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Revenue by Category (R$ M)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                dataKey="category"
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
                formatter={(value: number) => [`R$ ${value.toFixed(1).replace(".", ",")}M`, "Revenue"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {productCategories.map((entry, index) => (
                  <Cell key={entry.category} fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Product Revenue Trend (R$ M)">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyProductTrend}>
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
                formatter={(value: number) => [`R$ ${value.toFixed(1).replace(".", ",")}M`, "Revenue"]}
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
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Top SKU Revenue (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={skuPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="sku"
                type="category"
                tick={{ fontSize: 11, fill: COLORS.gray }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                formatter={(value: number) => [`R$ ${value.toFixed(1).replace(".", ",")}M`, "Revenue"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
                {skuPerformance.map((entry, index) => (
                  <Cell key={entry.sku} fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Growth by Category (%)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={productCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis
                dataKey="category"
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
                formatter={(value: number) => [`${value.toFixed(1).replace(".", ",")}%`, "Growth"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="growth" radius={[8, 8, 0, 0]}>
                {productCategories.map((entry, index) => (
                  <Cell key={entry.category} fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Margin Trend (%)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyProductTrend}>
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
                formatter={(value: number) => [`${value.toFixed(1).replace(".", ",")}%`, "Margin"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="margin"
                stroke={COLORS.black}
                strokeWidth={2.5}
                dot={{ fill: COLORS.black, r: 3.5 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Category Summary">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Category
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Revenue
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Units
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((row, index) => (
                <tr
                  key={row.category}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: PRODUCT_COLORS[index % PRODUCT_COLORS.length] }}
                      />
                      {row.category}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">
                    R$ {row.revenue.toFixed(1).replace(".", ",")}M
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {formatCompactNumber(row.units)}
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    {row.growth.toFixed(1).replace(".", ",")}%
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