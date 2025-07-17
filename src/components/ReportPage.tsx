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
  selectProfitLossSections,
} from "../store/selectors/reportSelectors";
import type { PeriodType } from "../types/report";
import ReportSection from "./ReportSection";

const ReportPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectReportData);
  const currentPeriod = useAppSelector(selectCurrentPeriod);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const sections = useAppSelector(selectProfitLossSections);

  useEffect(() => {
    if (!data) {
      dispatch(loadReportData());
    }
  }, [dispatch, data]);

  const handlePeriodChange = (period: PeriodType) => {
    dispatch(setPeriod(period));
  };

  const handleExpandAll = () => {
    dispatch(expandAllFields());
  };

  const handleCollapseAll = () => {
    dispatch(collapseAllFields());
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-brown mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading report data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-light-brown shadow-sm border-b border-light-brown rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dark-gray">
                Financial Report
              </h1>
              <p className="mt-2 text-gray-600">
                Detailed profit and loss statement
              </p>
            </div>

            {/* Period Selection */}
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4">
              <div className="flex bg-white rounded-lg border border-light-brown p-1">
                {(["monthly", "quarterly", "yearly"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => handlePeriodChange(period)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 capitalize ${
                      currentPeriod === period
                        ? "bg-warm-brown text-white"
                        : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              {/* Expand/Collapse Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handleExpandAll}
                  className="px-4 py-2 text-sm font-medium bg-white text-warm-brown border border-light-brown rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Expand All
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="px-4 py-2 text-sm font-medium bg-white text-warm-brown border border-light-brown rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {sections.map((section) => (
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
