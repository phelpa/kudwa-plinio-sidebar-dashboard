import React from "react";
import type { KPI } from "../types/dashboard";
import {
  formatCurrency,
  formatPercentage,
  getChangeColor,
} from "../utils/formatters";

interface KPICardProps {
  kpi: KPI;
  isTopKPI?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ kpi, isTopKPI = false }) => {
  const changeValue = kpi.mom || kpi.mOm || 0;
  const hasChange =
    (kpi.mom !== undefined || kpi.mOm !== undefined) && kpi.prefix;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
        isTopKPI ? "border-l-4 border-l-soft-blue" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{kpi.name}</p>
          <p
            className={`text-2xl font-bold text-dark-gray ${
              isTopKPI ? "text-3xl" : ""
            }`}
          >
            {kpi.name.toLowerCase().includes("cash") ||
            kpi.name.toLowerCase().includes("revenue") ||
            kpi.name.toLowerCase().includes("profit") ||
            kpi.name.toLowerCase().includes("income") ||
            kpi.name.toLowerCase().includes("expense") ||
            kpi.name.toLowerCase().includes("cost") ||
            kpi.name.toLowerCase().includes("burn") ||
            kpi.name.toLowerCase().includes("operation")
              ? formatCurrency(kpi.value)
              : kpi.value.toFixed(2)}
          </p>
          {kpi.date && (
            <p className="text-xs text-gray-500 mt-1">As of {kpi.date}</p>
          )}
        </div>
        {hasChange && (
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">{kpi.prefix}</p>
            <p
              className={`text-sm font-semibold ${getChangeColor(changeValue)}`}
            >
              {formatPercentage(changeValue)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
