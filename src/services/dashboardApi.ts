const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchJson<T>(endpoint: string): Promise<T> {
  const cacheKey = `dashboard-cache:${endpoint}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    return JSON.parse(cached) as T;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${endpoint}: ${response.status}`);
  }

  const data = (await response.json()) as T;
  sessionStorage.setItem(cacheKey, JSON.stringify(data));

  return data;
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
  clearCache: () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("dashboard-cache:")) {
        sessionStorage.removeItem(key);
      }
    });
  },
};