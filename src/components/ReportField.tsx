import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFieldExpansion } from "../store/slices/reportSlice";
import { selectIsFieldExpanded } from "../store/selectors/reportSelectors";
import type {
  ReportField as ReportFieldType,
  PeriodType,
} from "../types/report";
import { formatCurrency } from "../utils/formatters";

interface ReportFieldProps {
  field: ReportFieldType;
  currentPeriod: PeriodType;
  level: number;
}

const ReportField: React.FC<ReportFieldProps> = ({
  field,
  currentPeriod,
  level,
}) => {
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector(selectIsFieldExpanded(field.id));

  const handleToggleExpansion = () => {
    console.log("Toggling field:", field.id, "Currently expanded:", isExpanded);
    dispatch(toggleFieldExpansion(field.id));
  };

  // Calculate field value based on current period
  const getFieldValue = () => {
    if (!field.actualData || field.actualData.length === 0) {
      return 0;
    }

    const data = field.actualData[0] as unknown;

    // Try to access the period-specific data first, fall back to value array
    try {
      if (
        currentPeriod === "yearly" &&
        data &&
        typeof data === "object" &&
        "yearly" in data
      ) {
        const yearlyData = (data as { yearly: number[] }).yearly;
        return Array.isArray(yearlyData)
          ? yearlyData.reduce((sum: number, val: number) => sum + val, 0)
          : 0;
      } else if (
        currentPeriod === "quarterly" &&
        data &&
        typeof data === "object" &&
        "quarterly" in data
      ) {
        const quarterlyData = (data as { quarterly: number[] }).quarterly;
        return Array.isArray(quarterlyData)
          ? quarterlyData.reduce((sum: number, val: number) => sum + val, 0)
          : 0;
      } else if (data && typeof data === "object" && "value" in data) {
        const valueData = (data as { value: number[] }).value;
        return Array.isArray(valueData)
          ? valueData.reduce((sum: number, val: number) => sum + val, 0)
          : 0;
      }
    } catch (error) {
      console.warn("Error calculating field value:", error);
    }

    return 0;
  };

  const fieldValue = getFieldValue();
  const hasSubFields = field.fields && field.fields.length > 0;
  const indentLevel = level * 20;

  return (
    <div className="border border-gray-100 rounded-md">
      {/* Field Header */}
      <div
        className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-colors duration-200 ${
          hasSubFields ? "cursor-pointer" : ""
        }`}
        style={{ paddingLeft: `${indentLevel + 12}px` }}
        onClick={hasSubFields ? handleToggleExpansion : undefined}
      >
        <div className="flex items-center space-x-3">
          {hasSubFields && (
            <button className="text-gray-400 hover:text-dark-gray transition-colors duration-200">
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
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
          )}
          <div>
            <p
              className={`font-medium text-dark-gray ${
                hasSubFields ? "text-sm" : "text-sm"
              }`}
            >
              {field.name}
            </p>
            {field.uniqueReference && (
              <p className="text-xs text-gray-500">
                {field.uniqueReference.accountName ||
                  field.uniqueReference.accountId}
              </p>
            )}
          </div>
        </div>

        <div className="text-right">
          <p
            className={`font-semibold text-dark-gray ${
              hasSubFields ? "text-sm" : "text-sm"
            }`}
          >
            {formatCurrency(fieldValue)}
          </p>
        </div>
      </div>

      {/* Sub-fields */}
      {hasSubFields && isExpanded && (
        <div className="border-t border-gray-100 bg-gray-25">
          <div className="space-y-1 p-2">
            {field?.fields?.map((subField) => (
              <ReportField
                key={subField.id}
                field={subField}
                currentPeriod={currentPeriod}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportField;
