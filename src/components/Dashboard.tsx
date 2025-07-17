import React, { useEffect } from "react";
import type { PeriodType, ChartData } from "../types/dashboard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadDashboardData, setPeriod } from "../store/slices/dashboardSlice";
import {
  selectDashboardData,
  selectCurrentPeriod,
  selectError,
} from "../store/selectors/dashboardSelectors";
import KPICard from "./KPICard";
import LineChartComponent from "./charts/LineChart";
import PieChartComponent from "./charts/PieChart";
import BarChartComponent from "./charts/BarChart";
import ComposedChartComponent from "./charts/ComposedChart";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const dashboardData = useAppSelector(selectDashboardData);
  const currentPeriod = useAppSelector(selectCurrentPeriod);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(loadDashboardData(currentPeriod));
  }, []);

  const handlePeriodChange = (period: PeriodType) => {
    dispatch(setPeriod(period));
    dispatch(loadDashboardData(period));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(loadDashboardData(currentPeriod))}
            className="mt-4 px-4 py-2 bg-warm-brown text-white rounded-md hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { mainDashboard, mainDashboardKPIs } = dashboardData;

  const periodLabels = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-light-brown shadow-sm border-b border-light-brown rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-3xl font-bold text-dark-gray">
                    Dashboard
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 font-bold">
                    {mainDashboard.startDate} - {mainDashboard.endDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Period Selector */}
            <div className="mt-4 sm:mt-0">
              <div className="flex bg-white rounded-lg border border-light-brown p-1">
                {(["monthly", "quarterly", "yearly"] as PeriodType[]).map(
                  (period) => (
                    <button
                      key={period}
                      onClick={() => handlePeriodChange(period)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 capitalize ${
                        currentPeriod === period
                          ? "bg-warm-brown text-white"
                          : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
                      }`}
                    >
                      {periodLabels[period]}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top KPIs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-dark-gray mb-4">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainDashboardKPIs.topKPIs.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} isTopKPI={true} />
            ))}
          </div>
        </div>

        {/* Regular KPIs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-dark-gray mb-4">
            Financial Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {mainDashboardKPIs.KPIs.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} />
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="space-y-8">
          {/* Cash at Bank */}
          <LineChartComponent
            data={mainDashboard.charts.cashAtBank}
            dateArray={mainDashboard.dateArray}
            title="Cash at Bank"
          />

          {/* Profit & Loss Overview */}
          <ComposedChartComponent
            data={mainDashboard.charts.profitLossOverview}
            dateArray={mainDashboard.dateArray}
            title="Profit & Loss Overview"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Split */}
            <PieChartComponent
              data={mainDashboard.charts.totalRevenuesSplit}
              title="Revenue Split"
            />

            {/* Expense Split */}
            <PieChartComponent
              data={mainDashboard.charts.expenseSplit}
              title="Expense Split"
            />
          </div>

          {/* Cash Flow */}
          <BarChartComponent
            data={
              mainDashboard.charts.indirectCashflow.filter(
                (item) => item !== null
              ) as ChartData[]
            }
            dateArray={mainDashboard.dateArray}
            title="Cash Flow"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
