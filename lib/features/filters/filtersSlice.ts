import { JobStatus } from "@/lib/api/smApi";
import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

export interface ExecutionsFiltersState {
  includeRunning: boolean;
  includeFinished: boolean;
  startDate: number;
  endDate: number;
}

export interface UiFiltersState {
  error: string | undefined;
  status: JobStatus[];
  ids: string[];
  includeSuccess: boolean;
  includeError: boolean;
}

export interface FiltersSlice {
  ui: UiFiltersState;
  executions: ExecutionsFiltersState;
}

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    ui: {
      error: "",
      status: ["ACTIVE", "INACTIVE", "RUNNING"],
      ids: [],
      includeSuccess: true,
      includeError: true,
    },
    executions: {
      includeRunning: true,
      includeFinished: true,
      startDate: DateTime.now().minus({ weeks: 1 }).startOf("day").toMillis(),
      endDate: DateTime.now().startOf("day").toMillis(),
    },
  } as FiltersSlice,
  reducers: {
    setUiFilters: (state, action) => {
      state.ui = action.payload;
    },
    setExecutionsFilters: (state, action) => {
      state.executions = action.payload;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;

export const { setUiFilters, setExecutionsFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
