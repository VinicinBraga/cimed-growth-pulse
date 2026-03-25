import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { Users, UserPlus, Heart, Eye, MessageCircle, TrendingUp, AtSign, Smile } from "lucide-react";
import { socialData, socialTrend, platformComparison, formatNumber } from "@/data/mockData";
import {
  AreaChart, Area, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";

const sentimentTrend = socialTrend.map(s => ({ month: s.month, score: 7.8 + Math.random() * 1.2 }));

export function SocialMediaIntelligence() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard label="Followers" value={formatNumber(socialData.totalFollowers)} change={3.2} icon={Users} />
        <KPICard label="New Followers" value={formatNumber(socialData.newFollowers)} change={5.1} icon={UserPlus} />
        <KPICard label="Engagements" value={formatNumber(socialData.engagements)} change={4.8} icon={Heart} />
        <KPICard label="Reach" value={formatNumber(socialData.reach)} change={6.2} icon={Eye} />
        <KPICard label="Impressions" value={formatNumber(socialData.impressions)} change={7.1} icon={Eye} />
        <KPICard label="Eng. Rate" value={`${socialData.engagementRate}%`} change={0.8} icon={TrendingUp} />
        <KPICard label="Mentions" value={formatNumber(socialData.mentions)} change={12.3} icon={AtSign} />
        <KPICard label="Sentiment" value={`${socialData.sentimentScore}/10`} change={2.1} icon={Smile} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Followers Growth">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={socialTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => formatNumber(v)} />
              <Area type="monotone" dataKey="followers" stroke="#FFC72C" fill="#FFC72C" fillOpacity={0.15} strokeWidth={2} name="Followers" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Engagement Trend">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={socialTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => formatNumber(v)} />
              <Area type="monotone" dataKey="engagements" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} name="Engagements" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Platform Comparison (Followers)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={platformComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
              <YAxis dataKey="platform" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip formatter={(v: number) => formatNumber(v)} />
              <Bar dataKey="followers" radius={[0, 4, 4, 0]}>
                {platformComparison.map((p, i) => <Cell key={i} fill={p.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Engagement Rate by Platform (%)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={platformComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="platform" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="engagement" fill="#FFC72C" radius={[4, 4, 0, 0]} name="Eng. Rate">
                {platformComparison.map((p, i) => <Cell key={i} fill={p.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sentiment Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={sentimentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[7, 10]} />
              <Tooltip formatter={(v: number) => v.toFixed(1)} />
              <Line type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 3 }} name="Sentiment" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Social Performance by Platform">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Platform</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Followers</th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase">Eng. Rate</th>
              </tr>
            </thead>
            <tbody>
              {platformComparison.map(p => (
                <tr key={p.platform} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.platform}
                  </td>
                  <td className="py-3 px-4 text-right text-foreground">{formatNumber(p.followers)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-foreground">{p.engagement}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
