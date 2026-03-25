import { TrendingUp, TrendingDown } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  change?: number;
  icon?: LucideIcon;
  prefix?: string;
  suffix?: string;
}

export function KPICard({ label, value, change, icon: Icon }: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="kpi-card animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <span className="kpi-label">{label}</span>
        {Icon && (
          <div className="p-1.5 rounded-md bg-muted">
            <Icon size={14} className="text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? "kpi-change-positive" : "kpi-change-negative"}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isPositive ? "+" : ""}{change.toFixed(1)}% vs last month</span>
        </div>
      )}
    </div>
  );
}
