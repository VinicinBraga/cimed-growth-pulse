import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { DollarSign, Package, ShoppingCart, CreditCard, Percent, RotateCcw, TrendingDown, BarChart3 } from "lucide-react";
import { monthlyTrend, channelRevenue, categoryRevenue, topProducts, regionRevenue, brandRevenue } from "@/data/mockData";
import {
  LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";

export function SalesPerformance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard label="Net Revenue" value="R$ 56.2M" change={4.5} icon={DollarSign} />
        <KPICard label="Gross Revenue" value="R$ 62.8M" change={4.1} icon={DollarSign} />
        <KPICard label="Units Sold" value="59.4K" change={4.4} icon={Package} />
        <KPICard label="Orders" value="8,420" change={3.8} icon={ShoppingCart} />
        <KPICard label="Avg Ticket" value="R$ 745" change={1.2} icon={CreditCard} />
        <KPICard label="Discount" value="R$ 4.2M" change={-2.1} icon={Percent} />
        <KPICard label="Returns" value="R$ 2.4M" change={-5.2} icon={RotateCcw} />
        <KPICard label="Rev/Unit" value="R$ 946" change={0.8} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Revenue Trend (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#FFC72C" fill="#FFC72C" fillOpacity={0.15} strokeWidth={2} name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Units Sold Trend">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip />
              <Area type="monotone" dataKey="units" stroke="#111111" fill="#111111" fillOpacity={0.05} strokeWidth={2} name="Units" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Revenue by Channel (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {channelRevenue.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

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
      </div>

      <ChartCard title="Top Products">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Product</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Revenue</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Units</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
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
