import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Filter,
  Share2,
  Package,
  Gauge,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "overview", label: "Visão Executiva", icon: BarChart3 },
  { id: "marketing", label: "Performance de Marketing", icon: TrendingUp },
  { id: "sales", label: "Performance de Vendas", icon: ShoppingCart },
  { id: "funnel", label: "Performance do Funil", icon: Filter },
  { id: "social", label: "Inteligência de Social Media", icon: Share2 },
  { id: "product", label: "Crescimento de Produtos", icon: Package },
  { id: "efficiency", label: "Eficiência de Growth", icon: Gauge },
  { id: "drivers", label: "Drivers de Crescimento", icon: Zap },
];

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))] transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } min-h-screen`}
    >
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--sidebar-border))]">
        {!collapsed && (
          <div>
            <div className="text-xl font-bold text-foreground tracking-tight">CIMED</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
              Growth Platform
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))] transition-colors text-[hsl(var(--sidebar-foreground))]"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
                  : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                size={18}
                className={
                  isActive
                    ? "text-[hsl(var(--sidebar-accent-foreground))]"
                    : "text-[hsl(var(--sidebar-foreground))]"
                }
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
            CIMED © 2026
          </div>
        </div>
      )}
    </aside>
  );
}