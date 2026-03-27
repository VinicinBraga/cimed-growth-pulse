const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${endpoint}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const dashboardApi = {
  getOverview: () => fetchJson<any>("/api/overview"),
  getMarketing: () => fetchJson<any>("/api/marketing"),
  getSales: () => fetchJson<any>("/api/sales"),
  getFunnel: () => fetchJson<any>("/api/funnel"),
  getSocial: () => fetchJson<any>("/api/social"),
  getProduct: () => fetchJson<any>("/api/product"),
  getEfficiency: () => fetchJson<any>("/api/efficiency"),
  getDrivers: () => fetchJson<any>("/api/drivers"),
};