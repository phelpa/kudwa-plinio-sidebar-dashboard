import type { RootState } from "../index";

// Basic selectors
export const selectReportData = (state: RootState) => state.report.data;
export const selectCurrentPeriod = (state: RootState) =>
  state.report.currentPeriod;
export const selectExpandedFields = (state: RootState) =>
  state.report.expandedFields;
export const selectIsLoading = (state: RootState) => state.report.isLoading;
export const selectError = (state: RootState) => state.report.error;

// Selector for checking if a field is expanded
export const selectIsFieldExpanded = (fieldId: number) => (state: RootState) =>
  state.report.expandedFields.includes(fieldId);
