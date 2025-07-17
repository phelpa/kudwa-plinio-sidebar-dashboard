import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Basic selectors
export const selectDashboardData = (state: RootState) => state.dashboard.data;
export const selectCurrentPeriod = (state: RootState) =>
  state.dashboard.currentPeriod;
export const selectError = (state: RootState) => state.dashboard.error;

// Memoized selectors
export const selectKPIs = createSelector(
  [selectDashboardData],
  (data) => data?.mainDashboardKPIs || null
);

export const selectMainDashboard = createSelector(
  [selectDashboardData],
  (data) => data?.mainDashboard || null
);
