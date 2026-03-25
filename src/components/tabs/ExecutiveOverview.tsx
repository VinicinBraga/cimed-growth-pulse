import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { DollarSign, TrendingUp, Users, Package, Heart, Target, BarChart3 } from "lucide-react";
import { monthlyTrend, channelRevenue, categoryRevenue, regionRevenue, funnelData, socialTrend, formatCurrency, formatNumber } from "@/data/mockData";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const COLORS = {
  revenue: "#FFC72C",
  spend: "#111111",
  roas: "#22C55E",
  cac: "#EF4444",
  ltv: "#3B82F6",
};

export function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard label="Net Revenue" value="R$ 56.2M" change={4.5} icon={DollarSign} />
        <KPICard label="Mkt Spend" value="R$ 11.2M" change={3.7} icon={TrendingUp} />
        <KPICard label="ROAS" value="5.0x" change={0.0} icon={Target} />
        <KPICard label="CAC" value="R$ 28" change={-3.4} icon={BarChart3} />
        <KPICard label="Customers" value="1,740" change={5.5} icon={Users} />
        <KPICard label="Units Sold" value="59.4K" change={4.4} icon={Package} />
        <KPICard label="Avg LTV" value="R$ 210" change={1.9} icon={Heart} />
        <KPICard label="LTV/CAC" value="7.5x" change={5.6} icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Revenue vs Marketing Spend (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke={COLORS.revenue} fill={COLORS.revenue} fillOpacity={0.15} strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="spend" stroke={COLORS.spend} fill={COLORS.spend} fillOpacity={0.05} strokeWidth={2} name="Spend" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ROAS Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[4, 6]} />
              <Tooltip />
              <Line type="monotone" dataKey="roas" stroke={COLORS.roas} strokeWidth={2.5} dot={{ fill: COLORS.roas, r: 3 }} name="ROAS" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="CAC Trend (R$)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="cac" stroke={COLORS.cac} strokeWidth={2.5} dot={{ fill: COLORS.cac, r: 3 }} name="CAC" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue by Channel (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
                {channelRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue by Category">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={categoryRevenue} dataKey="pct" nameKey="category" cx="50%" cy="50%" outerRadius={85} label={({ category, pct }) => `${pct}%`} labelLine={false}>
                {categoryRevenue.map((_, i) => (
                  <Cell key={i} fill={["#FFC72C", "#111111", "#3B82F6", "#22C55E", "#6B7280"][i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Executive Funnel">
          <div className="space-y-3">
            {funnelData.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{stage.stage}</span>
                  <span className="text-muted-foreground">{formatNumber(stage.value)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(stage.value / funnelData[0].value) * 100}%`,
                      backgroundColor: ["#FFC72C", "#FFB800", "#3B82F6", "#22C55E", "#111111", "#EF4444"][i],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Social Growth">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={socialTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => formatNumber(v)} />
              <Area type="monotone" dataKey="followers" stroke="#FFC72C" fill="#FFC72C" fillOpacity={0.1} strokeWidth={2} name="Followers" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue by Region (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={regionRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="region" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#FFC72C" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
