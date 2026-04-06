import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("fakeAuth");
    localStorage.removeItem("fakeUserEmail");
    sessionStorage.clear();
    navigate("/login");
  };
  const userEmail =
    localStorage.getItem("fakeUserEmail") || "usuario@cimed.com.br";
  return (
    <header className="h-14 bg-background border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-base font-bold tracking-tight text-foreground">
          CIMED Growth Intelligence Platform
        </h1>
        <p className="text-xs text-muted-foreground -mt-0.5">
          Growth Analytics Dashboard
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">
          Last updated: Mar 25, 2026
        </span>
        <div className="flex items-center gap-3 border-l pl-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User size={16}/>
            {userEmail}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 transition-colors text-sm"
          >
            <LogOut size={14}/>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}