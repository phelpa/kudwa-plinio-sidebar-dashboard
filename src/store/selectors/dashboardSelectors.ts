import type { RootState } from "../index";

// Basic selectors
export const selectDashboardData = (state: RootState) => state.dashboard.data;
export const selectCurrentPeriod = (state: RootState) =>
  state.dashboard.currentPeriod;
export const selectIsLoading = (state: RootState) => state.dashboard.isLoading;
export const selectError = (state: RootState) => state.dashboard.error;
