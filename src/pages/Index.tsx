import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ExecutiveOverview } from "@/components/tabs/ExecutiveOverview";
import { MarketingPerformance } from "@/components/tabs/MarketingPerformance";
import { SalesPerformance } from "@/components/tabs/SalesPerformance";
import { FunnelPerformance } from "@/components/tabs/FunnelPerformance";
import { SocialMediaIntelligence } from "@/components/tabs/SocialMediaIntelligence";
import { ProductGrowth } from "@/components/tabs/ProductGrowth";
import { GrowthEfficiency } from "@/components/tabs/GrowthEfficiency";
import { GrowthDrivers } from "@/components/tabs/GrowthDrivers";

const tabs: Record<string, React.ComponentType> = {
  overview: ExecutiveOverview,
  marketing: MarketingPerformance,
  sales: SalesPerformance,
  funnel: FunnelPerformance,
  social: SocialMediaIntelligence,
  product: ProductGrowth,
  efficiency: GrowthEfficiency,
  drivers: GrowthDrivers,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("fakeAuth");

    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  const ActiveComponent = tabs[activeTab] || ExecutiveOverview;

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default Index;