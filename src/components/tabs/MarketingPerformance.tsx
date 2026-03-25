import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { DollarSign, TrendingUp, Eye, MousePointer, Users, ShoppingCart, Target, BarChart3 } from "lucide-react";
import { monthlyTrend, channelRevenue, campaignData } from "@/data/mockData";
import {
  LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";

const ctrData = monthlyTrend.map(m => ({ month: m.month, ctr: 2.8 + Math.random() * 0.8 }));

export function MarketingPerformance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard label="Spend" value="R$ 11.2M" change={3.7} icon={DollarSign} />
        <KPICard label="Revenue" value="R$ 56.2M" change={4.5} icon={TrendingUp} />
        <KPICard label="ROAS" value="5.0x" change={0.0} icon={Target} />
        <KPICard label="Impressions" value="42M" change={8.2} icon={Eye} />
        <KPICard label="Clicks" value="1.26M" change={5.1} icon={MousePointer} />
        <KPICard label="Leads" value="185K" change={6.8} icon={Users} />
        <KPICard label="Purchases" value="1,740" change={5.5} icon={ShoppingCart} />
        <KPICard label="CPA" value="R$ 28" change={-3.4} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Spend vs Revenue (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#FFC72C" fill="#FFC72C" fillOpacity={0.15} strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="spend" stroke="#111111" fill="#111111" fillOpacity={0.05} strokeWidth={2} name="Spend" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ROAS by Channel">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={channelRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="channel" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="roas" name="ROAS" radius={[4, 4, 0, 0]}>
                {channelRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Spend by Channel (R$ M)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="spend" name="Spend" radius={[0, 4, 4, 0]}>
                {channelRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Marketing Funnel">
          <div className="space-y-3">
            {[
              { stage: "Impressions", value: 42000000 },
              { stage: "Clicks", value: 1260000 },
              { stage: "Leads", value: 185000 },
              { stage: "Purchases", value: 1740 },
            ].map((s, i) => (
              <div key={s.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{s.stage}</span>
                  <span className="text-muted-foreground">{s.value >= 1000000 ? `${(s.value/1000000).toFixed(1)}M` : s.value >= 1000 ? `${(s.value/1000).toFixed(1)}K` : s.value}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(s.value / 42000000) * 100}%`, backgroundColor: ["#FFC72C", "#FFB800", "#3B82F6", "#22C55E"][i] }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="CTR Trend (%)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ctrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[2, 4]} />
              <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
              <Line type="monotone" dataKey="ctr" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 3 }} name="CTR" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Campaign Ranking">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Campaign</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Spend</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Revenue</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">ROAS</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">CPA</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((c) => (
                <tr key={c.campaign} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{c.campaign}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">R$ {c.spend}M</td>
                  <td className="py-3 px-4 text-right text-foreground font-medium">R$ {c.revenue}M</td>
                  <td className="py-3 px-4 text-right font-semibold" style={{ color: c.roas >= 5 ? "#22C55E" : "#FFC72C" }}>{c.roas}x</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">R$ {c.cpa}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {c.status}
                    </span>
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
