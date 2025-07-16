export interface ChartData {
  chartType: "line" | "bar" | "donut" | "pie" | "columnStacked";
  name: string;
  values: number | number[];
}

export interface Charts {
  cashAtBank: ChartData[];
  expenseSplit: ChartData[];
  indirectCashflow: (ChartData | null)[];
  totalRevenuesSplit: ChartData[];
  profitLossOverview: ChartData[];
  salariesSplit: ChartData[];
  ManpowerOperatingExpenses: ChartData[];
}

export interface KPI {
  name: string;
  value: number;
  mom?: number;
  mOm?: number;
  date?: string;
  type?: string;
  prefix?: string;
}

export interface MainDashboard {
  period: "monthly" | "quarterly" | "yearly";
  startDate: string;
  endDate: string;
  metricDate: string;
  dateArray: string[];
  charts: Charts;
}

export interface MainDashboardKPIs {
  topKPIs: KPI[];
  KPIs: KPI[];
}

export interface DashboardData {
  mainDashboard: MainDashboard;
  mainDashboardKPIs: MainDashboardKPIs;
}

export type PeriodType = "monthly" | "quarterly" | "yearly";
