import React, { useState, useEffect } from "react";
import type { DashboardData, PeriodType } from "../types/dashboard";
import KPICard from "./KPICard";
import LineChartComponent from "./charts/LineChart";
import PieChartComponent from "./charts/PieChart";
import BarChartComponent from "./charts/BarChart";
import ComposedChartComponent from "./charts/ComposedChart";
import LoadingSpinner from "./LoadingSpinner";

// Import JSON data
import monthlyData from "../main-dashboard-jsons/monthly.json";
import quarterlyData from "../main-dashboard-jsons/quarterly.json";
import yearlyData from "../main-dashboard-jsons/yearly.json";

const Dashboard: React.FC = () => {
  const [currentPeriod, setCurrentPeriod] = useState<PeriodType>("monthly");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        switch (currentPeriod) {
          case "monthly":
            setDashboardData(monthlyData as DashboardData);
            break;
          case "quarterly":
            setDashboardData(quarterlyData as DashboardData);
            break;
          case "yearly":
            setDashboardData(yearlyData as DashboardData);
            break;
        }
        setIsLoading(false);
      }, 500);
    };
    loadData();
  }, [currentPeriod]);

  if (isLoading || !dashboardData) {
    return <LoadingSpinner />;
  }

  const { mainDashboard, mainDashboardKPIs } = dashboardData;

  const periodLabels = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-light-brown bg-light-brown rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-3xl font-bold text-dark-gray ">
                    Dashboard
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {mainDashboard.startDate} - {mainDashboard.endDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Period Selector */}
            <div className="mt-4 sm:mt-0">
              <div className="flex rounded-lg bg-gray-100 p-1">
                {(["monthly", "quarterly", "yearly"] as PeriodType[]).map(
                  (period) => (
                    <button
                      key={period}
                      onClick={() => setCurrentPeriod(period)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        currentPeriod === period
                          ? "bg-warm-brown text-white shadow-sm"
                          : "text-gray-600 hover:text-dark-gray hover:bg-gray-200"
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
            data={mainDashboard.charts.indirectCashflow.filter(
              (item) => item !== null
            )}
            dateArray={mainDashboard.dateArray}
            title="Cash Flow"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
