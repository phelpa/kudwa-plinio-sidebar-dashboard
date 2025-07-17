import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadReportData,
  setPeriod,
  expandAllFields,
  collapseAllFields,
} from "../store/slices/reportSlice";
import {
  selectReportData,
  selectCurrentPeriod,
  selectIsLoading,
  selectError,
} from "../store/selectors/reportSelectors";
import type { PeriodType } from "../types/report";
import LoadingSpinner from "./LoadingSpinner";
import ReportSection from "./ReportSection";

const ReportPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const reportData = useAppSelector(selectReportData);
  const currentPeriod = useAppSelector(selectCurrentPeriod);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(loadReportData());
  }, [dispatch]);

  const handlePeriodChange = (period: PeriodType) => {
    dispatch(setPeriod(period));
  };

  const handleExpandAll = () => {
    dispatch(expandAllFields());
  };

  const handleCollapseAll = () => {
    dispatch(collapseAllFields());
  };

  if (isLoading || !reportData) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Report
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(loadReportData())}
            className="mt-4 px-4 py-2 bg-warm-brown text-white rounded-md hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { reportResult } = reportData;

  const periodLabels = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-light-brown bg-light-brown rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dark-gray">
                Financial Report
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-bold">
                {reportResult.startingDate} - {reportResult.endingDate}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Expand/Collapse Controls */}
              <div className="flex space-x-2">
                <button
                  onClick={handleExpandAll}
                  className="px-3 py-2 text-sm bg-soft-blue text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
                >
                  Expand All
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="px-3 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
                >
                  Collapse All
                </button>
              </div>

              {/* Period Selector */}
              <div className="flex rounded-lg bg-gray-100 p-1">
                {(["monthly", "quarterly", "yearly"] as PeriodType[]).map(
                  (period) => (
                    <button
                      key={period}
                      onClick={() => handlePeriodChange(period)}
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
        {/* Report Sections */}
        <div className="space-y-6">
          {reportResult.profitnLoss.map((section) => (
            <ReportSection
              key={section.id}
              section={section}
              currentPeriod={currentPeriod}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
