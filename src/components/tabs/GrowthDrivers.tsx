import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  Zap,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Lightbulb,
  Rocket,
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
  LineChart,
  Line,
  AreaChart,
  Area,
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

const DRIVER_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#4B5563",
  "#D1D5DB",
];

const growthDrivers = [
  { driver: "Paid Media", impact: 28 },
  { driver: "CRM", impact: 19 },
  { driver: "Organic", impact: 24 },
  { driver: "Product", impact: 15 },
  { driver: "Pricing", impact: 9 },
  { driver: "Partnerships", impact: 12 },
];

const experiments = [
  { month: "Jan", tests: 6, wins: 3 },
  { month: "Feb", tests: 7, wins: 4 },
  { month: "Mar", tests: 9, wins: 5 },
  { month: "Apr", tests: 8, wins: 5 },
  { month: "May", tests: 10, wins: 6 },
  { month: "Jun", tests: 11, wins: 7 },
];

const growthContribution = [
  { month: "Jan", revenue: 6.2 },
  { month: "Feb", revenue: 6.9 },
  { month: "Mar", revenue: 7.5 },
  { month: "Apr", revenue: 8.1 },
  { month: "May", revenue: 9.3 },
  { month: "Jun", revenue: 10.4 },
];

function percent(value:number){

  return `${value}%`

}

export function GrowthDrivers(){

  return(

    <div className="space-y-6">

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Growth Drivers" value="12" change={2.1} icon={Zap}/>
        <KPICard label="Experiments" value="51" change={6.3} icon={Lightbulb}/>
        <KPICard label="Win Rate" value="58%" change={3.2} icon={Percent}/>
        <KPICard label="Revenue Impact" value="R$ 10.4M" change={8.1} icon={TrendingUp}/>
        <KPICard label="New Users" value="84K" change={5.4} icon={Users}/>
        <KPICard label="Conversion Lift" value="4.2%" change={1.1} icon={Target}/>
        <KPICard label="Initiatives" value="23" change={2.8} icon={Rocket}/>
        <KPICard label="Impact Score" value="82" change={1.7} icon={BarChart3}/>

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <ChartCard title="Growth Impact by Driver (%)">

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={growthDrivers}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid}/>

              <XAxis
              dataKey="driver"
              tick={{fontSize:10,fill:COLORS.gray}}
              axisLine={false}
              tickLine={false}
              />

              <YAxis
              tick={{fontSize:11,fill:COLORS.gray}}
              axisLine={false}
              tickLine={false}
              />

              <Tooltip
              formatter={(value:number)=>[percent(value),"Impact"]}
              contentStyle={{
                borderRadius:12,
                border:"1px solid #E5E7EB",
                boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
              }}
              />

              <Bar dataKey="impact" radius={[8,8,0,0]}>

                {growthDrivers.map((entry,index)=>(

                  <Cell key={entry.driver} fill={DRIVER_COLORS[index % DRIVER_COLORS.length]}/>

                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </ChartCard>



        <ChartCard title="Experiments vs Wins">

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={experiments}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid}/>

              <XAxis
              dataKey="month"
              tick={{fontSize:11,fill:COLORS.gray}}
              axisLine={false}
              tickLine={false}
              />

              <YAxis
              tick={{fontSize:11,fill:COLORS.gray}}
              axisLine={false}
              tickLine={false}
              />

              <Tooltip
              contentStyle={{
                borderRadius:12,
                border:"1px solid #E5E7EB",
                boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
              }}
              />

              <Line
              type="monotone"
              dataKey="tests"
              stroke={COLORS.primary}
              strokeWidth={2.5}
              dot={{fill:COLORS.primary,r:4}}
              />

              <Line
              type="monotone"
              dataKey="wins"
              stroke={COLORS.black}
              strokeWidth={2.5}
              dot={{fill:COLORS.black,r:4}}
              />

            </LineChart>

          </ResponsiveContainer>

        </ChartCard>

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <ChartCard title="Revenue Driven by Initiatives">

          <ResponsiveContainer width="100%" height={260}>

            <AreaChart data={growthContribution}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid}/>

              <XAxis
              dataKey="month"
              tick={{fontSize:11,fill:COLORS.gray}}
              axisLine={false}
              tickLine={false}
              />

              <YAxis
              tick={{fontSize:11,fill:COLORS.gray}}
              axisLine={false}
              tickLine={false}
              />

              <Tooltip
              formatter={(value:number)=>[`R$ ${value}M`,"Revenue"]}
              contentStyle={{
                borderRadius:12,
                border:"1px solid #E5E7EB",
                boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
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



        <ChartCard title="Top Initiatives">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b border-border">

                  <th className="text-left py-3 px-4 text-xs uppercase text-muted-foreground">
                    Initiative
                  </th>

                  <th className="text-right py-3 px-4 text-xs uppercase text-muted-foreground">
                    Impact
                  </th>

                  <th className="text-right py-3 px-4 text-xs uppercase text-muted-foreground">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  {name:"Pricing Optimization",impact:"High"},
                  {name:"CRM Automation",impact:"High"},
                  {name:"New Landing Pages",impact:"Medium"},
                  {name:"SEO Expansion",impact:"Medium"},
                  {name:"Partner Campaigns",impact:"Low"},
                ].map((row,index)=>(

                  <tr
                  key={row.name}
                  className="border-b border-border/50 hover:bg-muted/30"
                  >

                    <td className="py-3 px-4 font-medium">

                      <div className="flex items-center gap-3">

                        <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{backgroundColor:DRIVER_COLORS[index % DRIVER_COLORS.length]}}
                        />

                        {row.name}

                      </div>

                    </td>

                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {row.impact}
                    </td>

                    <td className="py-3 px-4 text-right">

                      <span
                      className="px-2 py-1 text-xs rounded-full border"
                      style={{
                        background:"#FEF3C7",
                        borderColor:"#F6C338",
                        color:"#111111"
                      }}
                      >

                        Active

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </ChartCard>

      </div>

    </div>

  )

}