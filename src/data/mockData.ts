// Dados de tendência mensal
export const monthlyTrend = [
  { month: "Jul", revenue: 42.5, spend: 8.2, roas: 5.2, cac: 32, ltv: 185, customers: 1320, units: 45200 },
  { month: "Ago", revenue: 44.1, spend: 8.8, roas: 5.0, cac: 34, ltv: 188, customers: 1380, units: 47100 },
  { month: "Set", revenue: 46.3, spend: 9.1, roas: 5.1, cac: 31, ltv: 192, customers: 1450, units: 49800 },
  { month: "Out", revenue: 48.7, spend: 9.5, roas: 5.1, cac: 29, ltv: 195, customers: 1520, units: 52300 },
  { month: "Nov", revenue: 52.1, spend: 10.2, roas: 5.1, cac: 28, ltv: 198, customers: 1610, units: 55800 },
  { month: "Dez", revenue: 58.4, spend: 11.8, roas: 4.9, cac: 30, ltv: 201, customers: 1720, units: 61200 },
  { month: "Jan", revenue: 51.2, spend: 10.5, roas: 4.9, cac: 31, ltv: 203, customers: 1580, units: 54100 },
  { month: "Fev", revenue: 53.8, spend: 10.8, roas: 5.0, cac: 29, ltv: 206, customers: 1650, units: 56900 },
  { month: "Mar", revenue: 56.2, spend: 11.2, roas: 5.0, cac: 28, ltv: 210, customers: 1740, units: 59400 },
];

export const channelRevenue = [
  { channel: "Google Ads", revenue: 18.4, spend: 3.8, roas: 4.8, color: "#FFC72C" },
  { channel: "Meta", revenue: 14.2, spend: 3.2, roas: 4.4, color: "#1877F2" },
  { channel: "TikTok", revenue: 8.6, spend: 1.8, roas: 4.8, color: "#000000" },
  { channel: "YouTube", revenue: 5.8, spend: 1.2, roas: 4.8, color: "#FF0000" },
  { channel: "Orgânico", revenue: 6.2, spend: 0.8, roas: 7.8, color: "#22C55E" },
  { channel: "Direto", revenue: 3.0, spend: 0.4, roas: 7.5, color: "#6B7280" },
];

export const categoryRevenue = [
  { category: "Medicamentos OTC", revenue: 22.8, units: 24500, pct: 40.6 },
  { category: "Vitaminas e Supl.", revenue: 14.1, units: 15200, pct: 25.1 },
  { category: "Cuidados Pessoais", revenue: 9.8, units: 10800, pct: 17.4 },
  { category: "Dermatologia", revenue: 5.6, units: 5100, pct: 10.0 },
  { category: "Pediátrico", revenue: 3.9, units: 3800, pct: 6.9 },
];

export const regionRevenue = [
  { region: "Sudeste", revenue: 24.1 },
  { region: "Sul", revenue: 12.8 },
  { region: "Nordeste", revenue: 9.4 },
  { region: "Centro-Oeste", revenue: 6.2 },
  { region: "Norte", revenue: 3.7 },
];

export const funnelData = [
  { stage: "Visitantes", value: 2450000, rate: 100 },
  { stage: "Leads", value: 185000, rate: 7.55 },
  { stage: "MQL", value: 48200, rate: 26.05 },
  { stage: "SQL", value: 18500, rate: 38.38 },
  { stage: "Oportunidades", value: 8200, rate: 44.32 },
  { stage: "Clientes", value: 1740, rate: 21.22 },
];

export const socialData = {
  totalFollowers: 4850000,
  newFollowers: 128000,
  engagements: 2340000,
  reach: 18500000,
  impressions: 42000000,
  engagementRate: 4.8,
  mentions: 85000,
  sentimentScore: 8.4,
};

export const socialTrend = [
  { month: "Jul", followers: 4120000, newFollowers: 95000, engagements: 1850000 },
  { month: "Ago", followers: 4250000, newFollowers: 102000, engagements: 1920000 },
  { month: "Set", followers: 4380000, newFollowers: 108000, engagements: 2010000 },
  { month: "Out", followers: 4490000, newFollowers: 112000, engagements: 2080000 },
  { month: "Nov", followers: 4600000, newFollowers: 118000, engagements: 2150000 },
  { month: "Dez", followers: 4720000, newFollowers: 122000, engagements: 2250000 },
  { month: "Jan", followers: 4780000, newFollowers: 115000, engagements: 2180000 },
  { month: "Fev", followers: 4850000, newFollowers: 125000, engagements: 2280000 },
  { month: "Mar", followers: 4980000, newFollowers: 128000, engagements: 2340000 },
];

export const platformComparison = [
  { platform: "Instagram", followers: 2100000, engagement: 5.2, color: "#E1306C" },
  { platform: "TikTok", followers: 1450000, engagement: 6.8, color: "#000000" },
  { platform: "YouTube", followers: 680000, engagement: 3.1, color: "#FF0000" },
  { platform: "LinkedIn", followers: 420000, engagement: 2.4, color: "#0077B5" },
  { platform: "X/Twitter", followers: 200000, engagement: 1.9, color: "#1DA1F2" },
];

export const topProducts = [
  { name: "Benegrip Multi", revenue: 8.4, units: 9200, growth: 12.3 },
  { name: "Lavitan", revenue: 6.8, units: 7500, growth: 8.7 },
  { name: "Cimegripe", revenue: 5.2, units: 5800, growth: 15.1 },
  { name: "Benegrip Dia/Noite", revenue: 4.1, units: 4200, growth: 6.4 },
  { name: "Lavitan Hair", revenue: 3.8, units: 3900, growth: 22.5 },
  { name: "Zero-Cal", revenue: 3.5, units: 8100, growth: -2.1 },
  { name: "Doril", revenue: 3.2, units: 6400, growth: 4.8 },
  { name: "Neosaldina", revenue: 2.9, units: 5200, growth: 3.2 },
  { name: "Lavitan Vit C", revenue: 2.6, units: 4100, growth: 18.9 },
  { name: "MinancOra", revenue: 2.4, units: 3200, growth: 9.1 },
];

export const brandRevenue = [
  { brand: "Benegrip", revenue: 14.2 },
  { brand: "Lavitan", revenue: 13.2 },
  { brand: "Cimegripe", revenue: 5.2 },
  { brand: "Zero-Cal", revenue: 3.5 },
  { brand: "Doril", revenue: 3.2 },
  { brand: "Neosaldina", revenue: 2.9 },
  { brand: "MinancOra", revenue: 2.4 },
];

export const marketingFunnel = [
  { stage: "Impressões", value: 42000000 },
  { stage: "Cliques", value: 1260000 },
  { stage: "Leads", value: 185000 },
  { stage: "Compras", value: 1740 },
];

export const campaignData = [
  { campaign: "Benegrip Inverno 2026", spend: 2.1, revenue: 11.2, roas: 5.3, cpa: 24, status: "Ativa" },
  { campaign: "Lavitan Awareness de Marca", spend: 1.8, revenue: 8.4, roas: 4.7, cpa: 28, status: "Ativa" },
  { campaign: "Cimegripe Sazonal", spend: 1.2, revenue: 6.8, roas: 5.7, cpa: 21, status: "Ativa" },
  { campaign: "Zero-Cal Impulso Digital", spend: 0.9, revenue: 3.8, roas: 4.2, cpa: 35, status: "Pausada" },
  { campaign: "Doril Alívio da Dor", spend: 0.8, revenue: 3.5, roas: 4.4, cpa: 31, status: "Ativa" },
];

export const efficiencyByChannel = [
  { channel: "Google Ads", cac: 28, ltv: 210, ltvCac: 7.5, roas: 4.8, revenuePerOrder: 82, costPerOrder: 17.1 },
  { channel: "Meta", cac: 32, ltv: 195, ltvCac: 6.1, roas: 4.4, revenuePerOrder: 76, costPerOrder: 17.3 },
  { channel: "TikTok", cac: 25, ltv: 180, ltvCac: 7.2, roas: 4.8, revenuePerOrder: 68, costPerOrder: 14.2 },
  { channel: "YouTube", cac: 35, ltv: 220, ltvCac: 6.3, roas: 4.8, revenuePerOrder: 88, costPerOrder: 18.3 },
  { channel: "Orgânico", cac: 12, ltv: 240, ltvCac: 20.0, roas: 7.8, revenuePerOrder: 95, costPerOrder: 12.2 },
];

export const formatCurrency = (value: number, millions = true) => {
  if (millions) return `R$ ${value.toFixed(1)}M`;
  return `R$ ${value.toFixed(0)}`;
};

export const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

export const formatPercent = (value: number) => `${value.toFixed(1)}%`;