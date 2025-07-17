import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Basic selectors
export const selectReportData = (state: RootState) => state.report.data;
export const selectCurrentPeriod = (state: RootState) =>
  state.report.currentPeriod;
export const selectExpandedFields = (state: RootState) =>
  state.report.expandedFields;
export const selectIsLoading = (state: RootState) => state.report.isLoading;
export const selectError = (state: RootState) => state.report.error;

// Memoized selector for checking if a field is expanded
export const selectIsFieldExpanded = (fieldId: number) =>
  createSelector([selectExpandedFields], (expandedFields) =>
    expandedFields.includes(fieldId)
  );

// Memoized selector for profit and loss sections
export const selectProfitLossSections = createSelector(
  [selectReportData],
  (data) => data?.reportResult?.profitnLoss || []
);
