import { Bell, Settings, User } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="h-14 bg-background border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-base font-bold tracking-tight text-foreground">
          CIMED Growth Intelligence Platform
        </h1>
        <p className="text-xs text-muted-foreground -mt-0.5">Growth Analytics Dashboard</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground mr-2">Last updated: Mar 25, 2026</span>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
