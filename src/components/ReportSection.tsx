import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFieldExpansion } from "../store/slices/reportSlice";
import { selectIsFieldExpanded } from "../store/selectors/reportSelectors";
import type { TopLevelField, PeriodType } from "../types/report";
import { formatCurrency } from "../utils/formatters";
import { calculateSectionTotal } from "../utils/reportCalculations";
import ReportField from "./ReportField";

interface ReportSectionProps {
  section: TopLevelField;
  currentPeriod: PeriodType;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  section,
  currentPeriod,
}) => {
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector(selectIsFieldExpanded(section.id));

  const handleToggleExpansion = () => {
    dispatch(toggleFieldExpansion(section.id));
  };

  const sectionTotal = calculateSectionTotal(section, currentPeriod);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-light-brown">
      {/* Section Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={handleToggleExpansion}
      >
        <div className="flex items-center space-x-3">
          <button className="text-gray-500 hover:text-dark-gray transition-colors duration-200">
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div>
            <h3 className="text-lg font-semibold text-dark-gray">
              {section.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{section.type}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-dark-gray">
            {formatCurrency(sectionTotal)}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {currentPeriod} Total
          </p>
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="border-t border-light-brown">
          <div className="p-4 space-y-2">
            {section.fields.map((field) => (
              <ReportField
                key={field.id}
                field={field}
                currentPeriod={currentPeriod}
                level={1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSection;
