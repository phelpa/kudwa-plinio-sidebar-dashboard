import type { ReportField, TopLevelField, PeriodType } from "../types/report";

/**
 * Calculate the value for a field based on the current period
 */
export const calculateFieldValue = (
  field: ReportField | TopLevelField,
  period: PeriodType
): number => {
  try {
    // Choose the appropriate data source based on period
    let dataArray: number[] | undefined;

    switch (period) {
      case "yearly":
        dataArray = field.yearly || field.yearlyResult;
        break;
      case "quarterly":
        dataArray = field.quarterly || field.quarterlyResult;
        break;
      case "monthly":
      default:
        // For monthly, use actualData.value if available, otherwise fall back to result
        if (
          "actualData" in field &&
          field.actualData &&
          field.actualData.length > 0
        ) {
          dataArray = field.actualData[0].value;
        } else {
          dataArray = field.result;
        }
        break;
    }

    // Calculate sum from the array
    if (dataArray && Array.isArray(dataArray)) {
      const sum = dataArray.reduce((total, value) => total + (value || 0), 0);
      return sum;
    }

    return 0;
  } catch (error) {
    console.warn(`Error calculating value for field ${field.name}:`, error);
    return 0;
  }
};

/**
 * Calculate the total for a section based on the current period
 */
export const calculateSectionTotal = (
  section: TopLevelField,
  period: PeriodType
): number => {
  try {
    // First try to get the section-level total
    const sectionValue = calculateFieldValue(section, period);
    if (sectionValue !== 0) {
      return sectionValue;
    }

    // Fallback: sum all field values
    let total = 0;
    section.fields.forEach((field) => {
      total += calculateFieldValue(field, period);
    });

    return total;
  } catch (error) {
    console.warn(`Error calculating section total for ${section.name}:`, error);
    return 0;
  }
};
