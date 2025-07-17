import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ReportData, PeriodType } from "../../types/report";

// Import report data
import reportData from "../../report-json/report.json";

interface ReportState {
  data: ReportData | null;
  currentPeriod: PeriodType;
  expandedFields: number[];
  error: string | null;
}

const initialState: ReportState = {
  data: null,
  currentPeriod: "monthly",
  expandedFields: [],
  error: null,
};

// Async thunk for loading report data
export const loadReportData = createAsyncThunk("report/loadData", async () => {
  return reportData as unknown as ReportData;
});

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<PeriodType>) => {
      state.currentPeriod = action.payload;
    },
    toggleFieldExpansion: (state, action: PayloadAction<number>) => {
      const fieldId = action.payload;
      const index = state.expandedFields.indexOf(fieldId);

      if (index > -1) {
        // Field is expanded, remove it
        state.expandedFields.splice(index, 1);
      } else {
        // Field is collapsed, add it
        state.expandedFields.push(fieldId);
      }
    },
    expandAllFields: (state) => {
      if (state.data) {
        const allFieldIds: number[] = [];

        // Collect all field IDs from the report
        state.data.reportResult.profitnLoss.forEach((section) => {
          allFieldIds.push(section.id);
          section.fields.forEach((field) => {
            allFieldIds.push(field.id);
            if (field.fields) {
              field.fields.forEach((subField) => {
                allFieldIds.push(subField.id);
              });
            }
          });
        });

        state.expandedFields = allFieldIds;
      }
    },
    collapseAllFields: (state) => {
      state.expandedFields = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadReportData.pending, () => {
        // No-op, as isLoading is removed
      })
      .addCase(loadReportData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loadReportData.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load report data";
      });
  },
});

export const {
  setPeriod,
  toggleFieldExpansion,
  expandAllFields,
  collapseAllFields,
  clearError,
} = reportSlice.actions;

export default reportSlice.reducer;
