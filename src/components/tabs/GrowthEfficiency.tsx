import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { DollarSign, Heart, Target, TrendingUp, ShoppingCart, Percent, Users, UserCheck } from "lucide-react";
import { monthlyTrend, efficiencyByChannel } from "@/data/mockData";
import {
  LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const CHANNEL_COLORS = ["#FFC72C", "#1877F2", "#000000", "#FF0000", "#22C55E"];

export function GrowthEfficiency() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard label="CAC" value="R$ 28" change={-3.4} icon={DollarSign} />
        <KPICard label="LTV" value="R$ 210" change={1.9} icon={Heart} />
        <KPICard label="LTV/CAC" value="7.5x" change={5.6} icon={Target} />
        <KPICard label="ROAS" value="5.0x" change={0.0} icon={TrendingUp} />
        <KPICard label="Rev/Order" value="R$ 745" change={1.2} icon={ShoppingCart} />
        <KPICard label="Cost/Order" value="R$ 149" change={-2.8} icon={DollarSign} />
        <KPICard label="Cust. Conv." value="0.071%" change={3.3} icon={Users} />
        <KPICard label="Lead Conv." value="7.55%" change={4.5} icon={UserCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="CAC Trend (R$)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="cac" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: "#EF4444", r: 3 }} name="CAC" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="LTV vs CAC (R$)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="ltv" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 3 }} name="LTV" />
              <Line type="monotone" dataKey="cac" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: "#EF4444", r: 3 }} name="CAC" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="LTV Trend (R$)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[170, 220]} />
              <Tooltip />
              <Line type="monotone" dataKey="ltv" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 3 }} name="LTV" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ROAS Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[4, 6]} />
              <Tooltip />
              <Line type="monotone" dataKey="roas" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 3 }} name="ROAS" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost per Order by Channel (R$)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={efficiencyByChannel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="channel" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="costPerOrder" fill="#EF4444" radius={[4, 4, 0, 0]} name="Cost/Order">
                {efficiencyByChannel.map((_, i) => <Cell key={i} fill={CHANNEL_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Efficiency by Channel">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Channel</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">CAC</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">LTV</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">LTV/CAC</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">ROAS</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Rev/Order</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Cost/Order</th>
              </tr>
            </thead>
            <tbody>
              {efficiencyByChannel.map((c) => (
                <tr key={c.channel} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{c.channel}</td>
                  <td className="py-3 px-4 text-right text-foreground">R$ {c.cac}</td>
                  <td className="py-3 px-4 text-right text-foreground">R$ {c.ltv}</td>
                  <td className="py-3 px-4 text-right font-semibold text-success">{c.ltvCac}x</td>
                  <td className="py-3 px-4 text-right font-semibold text-foreground">{c.roas}x</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">R$ {c.revenuePerOrder}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">R$ {c.costPerOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
