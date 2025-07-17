import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DashboardData, PeriodType } from "../../types/dashboard";

// Import JSON data
import monthlyData from "../../main-dashboard-jsons/monthly.json";
import quarterlyData from "../../main-dashboard-jsons/quarterly.json";
import yearlyData from "../../main-dashboard-jsons/yearly.json";

interface DashboardState {
  data: DashboardData | null;
  currentPeriod: PeriodType;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  currentPeriod: "monthly",
  error: null,
};

// Async thunk for loading dashboard data
export const loadDashboardData = createAsyncThunk(
  "dashboard/loadData",
  async (period: PeriodType) => {
    switch (period) {
      case "monthly":
        return monthlyData as DashboardData;
      case "quarterly":
        return quarterlyData as DashboardData;
      case "yearly":
        return yearlyData as DashboardData;
      default:
        throw new Error(`Unknown period: ${period}`);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<PeriodType>) => {
      state.currentPeriod = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardData.pending, (state) => {
        state.error = null;
      })
      .addCase(loadDashboardData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loadDashboardData.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load dashboard data";
      });
  },
});

export const { setPeriod, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
