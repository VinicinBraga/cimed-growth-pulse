import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { dashboardApi } from "@/services/dashboardApi";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const isAuth = localStorage.getItem("fakeAuth");

        if (!isAuth) {
          navigate("/login");
          return;
        }

        // Pré-carrega os dados principais
        await Promise.all([
          dashboardApi.getOverview(),
          dashboardApi.getMarketing(),
          dashboardApi.getSales(),
        ]);

        // pequena pausa só pra UX ficar natural
        setTimeout(() => {
          navigate("/");
        }, 800);

      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }

    loadData();

  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          CIMED Growth Intelligence
        </h1>

        <p className="text-sm text-muted-foreground mt-2">
          Carregando dados estratégicos...
        </p>
      </div>
    </div>
  );
};

export default Loading;