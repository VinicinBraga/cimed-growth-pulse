import { KPICard } from "../dashboard/KPICard";
import { ChartCard } from "../dashboard/ChartCard";
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Eye,
  BarChart3,
  MousePointerClick,
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

const SOCIAL_COLORS = [
  "#F6C338",
  "#111111",
  "#6B7280",
  "#9CA3AF",
  "#4B5563",
];

const socialPerformance = [
  { platform: "Instagram", followers: 820000, engagement: 4.8, reach: 6200000 },
  { platform: "TikTok", followers: 540000, engagement: 6.2, reach: 8400000 },
  { platform: "YouTube", followers: 310000, engagement: 3.4, reach: 2700000 },
  { platform: "Facebook", followers: 450000, engagement: 2.1, reach: 3100000 },
  { platform: "LinkedIn", followers: 120000, engagement: 1.9, reach: 640000 },
];

const engagementTrend = [
  { month: "Jan", engagement: 3.8 },
  { month: "Feb", engagement: 4.1 },
  { month: "Mar", engagement: 4.5 },
  { month: "Apr", engagement: 4.2 },
  { month: "May", engagement: 4.9 },
  { month: "Jun", engagement: 5.3 },
];

const contentPerformance = [
  { type: "Reels", engagement: 6.4 },
  { type: "Posts", engagement: 3.2 },
  { type: "Stories", engagement: 2.4 },
  { type: "Videos", engagement: 5.1 },
  { type: "Lives", engagement: 4.3 },
];

function formatCompact(value:number){

  if(value >=1000000){
    return `${(value/1000000).toFixed(1)}M`
  }

  if(value >=1000){
    return `${(value/1000).toFixed(1)}K`
  }

  return value
}

export function SocialMediaIntelligence(){

  return(

    <div className="space-y-6">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <KPICard label="Followers" value="2.2M" change={5.2} icon={Users}/>
        <KPICard label="Reach" value="21M" change={7.1} icon={Eye}/>
        <KPICard label="Engagement" value="4.7%" change={0.6} icon={Heart}/>
        <KPICard label="Clicks" value="184K" change={4.4} icon={MousePointerClick}/>
        <KPICard label="Comments" value="42K" change={3.1} icon={MessageCircle}/>
        <KPICard label="Shares" value="28K" change={2.4} icon={Share2}/>
        <KPICard label="Growth" value="5.2%" change={0.5} icon={TrendingUp}/>
        <KPICard label="Posts" value="312" change={1.2} icon={BarChart3}/>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <ChartCard title="Followers by Platform">

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={socialPerformance}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid}/>

              <XAxis
              dataKey="platform"
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
              formatter={(value:number)=>[formatCompact(value),"Followers"]}
              contentStyle={{
                borderRadius:12,
                border:"1px solid #E5E7EB",
                boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
              }}
              />

              <Bar dataKey="followers" radius={[8,8,0,0]}>

                {socialPerformance.map((entry,index)=>(

                  <Cell key={entry.platform} fill={SOCIAL_COLORS[index % SOCIAL_COLORS.length]}/>

                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </ChartCard>


        <ChartCard title="Engagement Trend (%)">

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={engagementTrend}>

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
              formatter={(value:number)=>[`${value}%`,"Engagement"]}
              contentStyle={{
                borderRadius:12,
                border:"1px solid #E5E7EB",
                boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
              }}
              />

              <Line
              type="monotone"
              dataKey="engagement"
              stroke={COLORS.primary}
              strokeWidth={2.5}
              dot={{fill:COLORS.primary,r:4}}
              activeDot={{r:6}}
              />

            </LineChart>

          </ResponsiveContainer>

        </ChartCard>

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <ChartCard title="Reach by Platform">

          <ResponsiveContainer width="100%" height={260}>

            <AreaChart data={socialPerformance}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid}/>

              <XAxis
              dataKey="platform"
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
              formatter={(value:number)=>[formatCompact(value),"Reach"]}
              contentStyle={{
                borderRadius:12,
                border:"1px solid #E5E7EB",
                boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
              }}
              />

              <Area
              type="monotone"
              dataKey="reach"
              stroke={COLORS.black}
              fill={COLORS.black}
              fillOpacity={0.08}
              strokeWidth={2}
              />

            </AreaChart>

          </ResponsiveContainer>

        </ChartCard>



        <ChartCard title="Engagement by Content Type">

          <ResponsiveContainer width="100%" height={260}>

            <BarChart data={contentPerformance}>

              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid}/>

              <XAxis
              dataKey="type"
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
              formatter={(value:number)=>[`${value}%`,"Engagement"]}
              contentStyle={{
                borderRadius:12,
                border:"1px solid #E5E7EB",
                boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
              }}
              />

              <Bar dataKey="engagement" radius={[8,8,0,0]}>

                {contentPerformance.map((entry,index)=>(

                  <Cell key={entry.type} fill={SOCIAL_COLORS[index % SOCIAL_COLORS.length]}/>

                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </ChartCard>

      </div>


    </div>

  )

}