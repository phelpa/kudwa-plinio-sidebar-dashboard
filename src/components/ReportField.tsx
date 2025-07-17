import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFieldExpansion } from "../store/slices/reportSlice";
import { selectIsFieldExpanded } from "../store/selectors/reportSelectors";
import type {
  ReportField as ReportFieldType,
  PeriodType,
} from "../types/report";
import { formatCurrency } from "../utils/formatters";
import { calculateFieldValue } from "../utils/reportCalculations";

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
    dispatch(toggleFieldExpansion(field.id));
  };

  const fieldValue = calculateFieldValue(field, currentPeriod);
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
            <p className="font-medium text-dark-gray text-sm">{field.name}</p>
            {field.uniqueReference && (
              <p className="text-xs text-gray-500">
                {field.uniqueReference.accountName ||
                  field.uniqueReference.accountId}
              </p>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold text-dark-gray text-sm">
            {formatCurrency(fieldValue)}
          </p>
        </div>
      </div>

      {/* Sub-fields */}
      {hasSubFields && isExpanded && (
        <div className="border-t border-gray-100 bg-gray-25">
          <div className="space-y-1 p-2">
            {field.fields?.map((subField) => (
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
