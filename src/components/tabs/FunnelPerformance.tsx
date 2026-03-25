import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { Users, UserCheck, Target, TrendingUp, Filter, Percent } from "lucide-react";
import { funnelData, channelRevenue, formatNumber } from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell
} from "recharts";

const funnelTrend = [
  { month: "Jul", visitors: 2100000, leads: 158000, customers: 1320 },
  { month: "Aug", visitors: 2180000, leads: 164000, customers: 1380 },
  { month: "Sep", visitors: 2250000, leads: 170000, customers: 1450 },
  { month: "Oct", visitors: 2310000, leads: 175000, customers: 1520 },
  { month: "Nov", visitors: 2380000, leads: 180000, customers: 1610 },
  { month: "Dec", visitors: 2420000, leads: 182000, customers: 1720 },
  { month: "Jan", visitors: 2350000, leads: 178000, customers: 1580 },
  { month: "Feb", visitors: 2400000, leads: 182000, customers: 1650 },
  { month: "Mar", visitors: 2450000, leads: 185000, customers: 1740 },
];

const conversionByChannel = channelRevenue.map(c => ({
  channel: c.channel,
  conversionRate: (1.2 + Math.random() * 3).toFixed(1),
  color: c.color,
}));

export function FunnelPerformance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard label="Visitors" value="2.45M" change={2.1} icon={Users} />
        <KPICard label="Leads" value="185K" change={6.8} icon={UserCheck} />
        <KPICard label="MQL" value="48.2K" change={5.2} icon={Target} />
        <KPICard label="SQL" value="18.5K" change={4.1} icon={Target} />
        <KPICard label="Opportunities" value="8,200" change={3.5} icon={Filter} />
        <KPICard label="Customers" value="1,740" change={5.5} icon={Users} />
        <KPICard label="Lead Conv." value="7.55%" change={4.5} icon={Percent} />
        <KPICard label="Customer Conv." value="0.071%" change={3.3} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Full Funnel">
          <div className="space-y-3">
            {funnelData.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{stage.stage}</span>
                  <span className="text-muted-foreground">{formatNumber(stage.value)} ({stage.rate}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-7 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                    style={{
                      width: `${Math.max((stage.value / funnelData[0].value) * 100, 3)}%`,
                      backgroundColor: ["#FFC72C", "#FFB800", "#3B82F6", "#22C55E", "#111111", "#EF4444"][i],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Funnel Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={funnelTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => formatNumber(v)} />
              <Tooltip formatter={(v: number) => formatNumber(v)} />
              <Line type="monotone" dataKey="visitors" stroke="#FFC72C" strokeWidth={2} name="Visitors" dot={false} />
              <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} name="Leads" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Conversion Rate by Stage">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={funnelData.slice(1)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="rate" fill="#FFC72C" radius={[4, 4, 0, 0]} name="Conv. Rate" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Conversion Rate by Channel">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={conversionByChannel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="channel" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="conversionRate" name="Conv. Rate" radius={[4, 4, 0, 0]}>
                {conversionByChannel.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customers by Channel">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelRevenue.map(c => ({ channel: c.channel, customers: Math.round(200 + Math.random() * 400), color: c.color }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="customers" radius={[0, 4, 4, 0]}>
                {channelRevenue.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
