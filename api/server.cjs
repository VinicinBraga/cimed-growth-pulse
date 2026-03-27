const express = require("express");
const cors = require("cors");
const { BigQuery } = require("@google-cloud/bigquery");

const app = express();

const PORT = process.env.PORT || 3000;
const PROJECT_ID = process.env.BQ_PROJECT_ID || "kv-bi-485613";
const DATASET_ID = process.env.BQ_DATASET_ID || "Dashboard_CIMED_Growth";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const allowedOrigins =
  ALLOWED_ORIGIN === "*"
    ? "*"
    : ALLOWED_ORIGIN.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins === "*") {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS bloqueado para origem: ${origin}`));
    },
  })
);

app.use(express.json());

const bigquery = new BigQuery({
  projectId: PROJECT_ID,
});

function formatCurrencyBR(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatNumberBR(value) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDecimal(value, digits = 1) {
  return Number(value || 0).toFixed(digits).replace(".", ",");
}

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    projectId: PROJECT_ID,
    datasetId: DATASET_ID,
  });
});

app.get("/api/overview", async (req, res) => {
  try {
    const overviewQuery = `
      SELECT
        year,
        month,
        month_name_pt,
        SUM(net_revenue) AS net_revenue,
        SUM(marketing_spend) AS marketing_spend,
        AVG(roas) AS roas,
        AVG(cac) AS cac,
        SUM(customers) AS customers,
        SUM(units_sold) AS units_sold,
        AVG(avg_ltv) AS avg_ltv,
        AVG(ltv_cac_ratio) AS ltv_cac_ratio,
        SUM(visitors) AS visitors,
        SUM(funnel_leads) AS funnel_leads,
        SUM(mql) AS mql,
        SUM(sql) AS sql,
        SUM(opportunities) AS opportunities,
        SUM(followers) AS followers,
        SUM(new_followers) AS new_followers
      FROM \`${PROJECT_ID}.${DATASET_ID}.vw_growth_overview\`
      GROUP BY year, month, month_name_pt
      ORDER BY year, month
    `;

    const channelQuery = `
      SELECT
        channel_name,
        SUM(net_revenue) AS revenue
      FROM \`${PROJECT_ID}.${DATASET_ID}.vw_exec_channel_category_region\`
      GROUP BY channel_name
      ORDER BY revenue DESC
    `;

    const categoryQuery = `
      SELECT
        category,
        SUM(net_revenue) AS revenue
      FROM \`${PROJECT_ID}.${DATASET_ID}.vw_exec_channel_category_region\`
      GROUP BY category
      ORDER BY revenue DESC
    `;

    const regionQuery = `
      SELECT
        macro_region,
        SUM(net_revenue) AS revenue
      FROM \`${PROJECT_ID}.${DATASET_ID}.vw_exec_channel_category_region\`
      GROUP BY macro_region
      ORDER BY revenue DESC
    `;

    const [overviewRows] = await bigquery.query(overviewQuery);
    const [channelRows] = await bigquery.query(channelQuery);
    const [categoryRows] = await bigquery.query(categoryQuery);
    const [regionRows] = await bigquery.query(regionQuery);

    const monthlyTrend = overviewRows.map((row) => ({
      month: String(row.month_name_pt || "").slice(0, 3),
      revenue: Number(row.net_revenue || 0),
      spend: Number(row.marketing_spend || 0),
      roas: Number(row.roas || 0),
      cac: Number(row.cac || 0),
    }));

    const roasTrend = overviewRows.map((row) => ({
      month: String(row.month_name_pt || "").slice(0, 3),
      value: Number(row.roas || 0),
    }));

    const cacTrend = overviewRows.map((row) => ({
      month: String(row.month_name_pt || "").slice(0, 3),
      value: Number(row.cac || 0),
    }));

    const lastRow = overviewRows[overviewRows.length - 1] || {};

    const channelColors = [
      "#F6C338",
      "#111111",
      "#6B7280",
      "#9CA3AF",
      "#D1D5DB",
      "#4B5563",
    ];

    const totalCategoryRevenue = categoryRows.reduce(
      (acc, row) => acc + Number(row.revenue || 0),
      0
    );

    const channelRevenue = channelRows.map((row, index) => ({
      channel: row.channel_name || "N/A",
      revenue: Number(row.revenue || 0),
      color: channelColors[index % channelColors.length],
    }));

    const categoryRevenue = categoryRows.map((row) => ({
      category: row.category || "N/A",
      pct:
        totalCategoryRevenue > 0
          ? Number(
              (
                (Number(row.revenue || 0) / totalCategoryRevenue) *
                100
              ).toFixed(1)
            )
          : 0,
    }));

    const regionRevenue = regionRows.map((row) => ({
      region: row.macro_region || "N/A",
      revenue: Number(row.revenue || 0),
    }));

    const funnelData = [
      { stage: "Visitors", value: Number(lastRow.visitors || 0) },
      { stage: "Leads", value: Number(lastRow.funnel_leads || 0) },
      { stage: "MQL", value: Number(lastRow.mql || 0) },
      { stage: "SQL", value: Number(lastRow.sql || 0) },
      { stage: "Opportunities", value: Number(lastRow.opportunities || 0) },
      { stage: "Customers", value: Number(lastRow.customers || 0) },
    ];

    const socialTrend = overviewRows.map((row) => ({
      month: String(row.month_name_pt || "").slice(0, 3),
      followers: Number(row.followers || 0),
      newFollowers: Number(row.new_followers || 0),
    }));

    res.json({
      kpis: {
        netRevenue: formatCurrencyBR(lastRow.net_revenue),
        mktSpend: formatCurrencyBR(lastRow.marketing_spend),
        roas: `${formatDecimal(lastRow.roas, 1)}x`,
        cac: formatCurrencyBR(lastRow.cac),
        customers: formatNumberBR(lastRow.customers),
        unitsSold: formatNumberBR(lastRow.units_sold),
        avgLtv: formatCurrencyBR(lastRow.avg_ltv),
        ltvCac: formatDecimal(lastRow.ltv_cac_ratio, 2),
      },
      monthlyTrend,
      roasTrend,
      cacTrend,
      channelRevenue,
      categoryRevenue,
      regionRevenue,
      funnelData,
      socialTrend,
    });
  } catch (error) {
    console.error("Erro na /api/overview:", error);
    res.status(500).json({
      error: "Erro BigQuery",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});