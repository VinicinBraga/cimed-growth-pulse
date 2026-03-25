import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import { Trophy, TrendingUp, MapPin, Package, Target, AlertTriangle, Calendar, Star } from "lucide-react";
import { channelRevenue, categoryRevenue, regionRevenue, topProducts, brandRevenue } from "@/data/mockData";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from "recharts";

const channelMatrix = channelRevenue.map(c => ({
  name: c.channel,
  revenue: c.revenue,
  roas: c.roas,
  spend: c.spend * 100,
  color: c.color,
}));

export function GrowthDrivers() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard label="Top Channel" value="Google Ads" icon={Trophy} />
        <KPICard label="Top Category" value="OTC Medicines" icon={TrendingUp} />
        <KPICard label="Top Region" value="Southeast" icon={MapPin} />
        <KPICard label="Top Product" value="Benegrip" icon={Package} />
        <KPICard label="Best ROAS" value="Organic" icon={Target} />
        <KPICard label="Worst CPA" value="YouTube" icon={AlertTriangle} />
        <KPICard label="Top Month" value="December" icon={Calendar} />
        <KPICard label="Top Brand" value="Benegrip" icon={Star} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard title="Revenue by Channel (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
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
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#FFC72C" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue by Region (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={regionRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="region" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#111111" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Top Growth Products">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topProducts.filter(p => p.growth > 0).sort((a, b) => b.growth - a.growth).slice(0, 6)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="growth" fill="#22C55E" radius={[0, 4, 4, 0]} name="Growth" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Growth Brands (R$ M)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={brandRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="brand" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#FFC72C" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Channel Opportunity Matrix">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" dataKey="spend" name="Spend" tick={{ fontSize: 11 }} label={{ value: "Spend Index", position: "bottom", fontSize: 11 }} />
            <YAxis type="number" dataKey="roas" name="ROAS" tick={{ fontSize: 11 }} label={{ value: "ROAS", angle: -90, position: "insideLeft", fontSize: 11 }} />
            <ZAxis type="number" dataKey="revenue" range={[100, 600]} name="Revenue" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(v: number, name: string) => name === "Revenue" ? `R$ ${v}M` : v} />
            <Scatter data={channelMatrix} name="Channels">
              {channelMatrix.map((c, i) => <Cell key={i} fill={c.color} />)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
