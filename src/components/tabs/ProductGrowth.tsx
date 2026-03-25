import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { DollarSign, Package, ShoppingCart, CreditCard, BarChart3, Layers, Grid3X3 } from "lucide-react";
import { topProducts, categoryRevenue, brandRevenue, monthlyTrend } from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS_PIE = ["#FFC72C", "#111111", "#3B82F6", "#22C55E", "#6B7280"];

export function ProductGrowth() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
        <KPICard label="Net Revenue" value="R$ 56.2M" change={4.5} icon={DollarSign} />
        <KPICard label="Units Sold" value="59.4K" change={4.4} icon={Package} />
        <KPICard label="Orders" value="8,420" change={3.8} icon={ShoppingCart} />
        <KPICard label="Avg Ticket" value="R$ 745" change={1.2} icon={CreditCard} />
        <KPICard label="Rev/Unit" value="R$ 946" change={0.8} icon={BarChart3} />
        <KPICard label="Products" value="142" change={5.2} icon={Grid3X3} />
        <KPICard label="Categories" value="5" change={0} icon={Layers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Top Products by Revenue (R$ M)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#FFC72C" radius={[0, 4, 4, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Products by Units">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
              <Tooltip />
              <Bar dataKey="units" fill="#111111" radius={[0, 4, 4, 0]} name="Units" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Revenue by Category (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#FFC72C" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue by Brand (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={brandRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="brand" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#111111" radius={[0, 4, 4, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category Share">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={categoryRevenue} dataKey="pct" nameKey="category" cx="50%" cy="50%" outerRadius={85} label={({ pct }) => `${pct}%`} labelLine={false}>
                {categoryRevenue.map((_, i) => <Cell key={i} fill={COLORS_PIE[i]} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Product Ranking">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">#</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Product</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Revenue</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Units</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={p.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{i + 1}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{p.name}</td>
                  <td className="py-3 px-4 text-right text-foreground">R$ {p.revenue}M</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{p.units.toLocaleString()}</td>
                  <td className={`py-3 px-4 text-right font-semibold ${p.growth >= 0 ? "text-success" : "text-destructive"}`}>
                    {p.growth >= 0 ? "+" : ""}{p.growth}%
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
