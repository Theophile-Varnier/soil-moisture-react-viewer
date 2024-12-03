import { JobDto } from "@/lib/api/smApi";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectFilters } from "../filters/filtersSlice";

export interface JobsState {
  jobs: JobDto[] | undefined;
}

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: undefined,
  } as JobsState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
  selectors: {
    selectJobs: (state) => state.jobs,
  },
});

export const { setJobs } = jobsSlice.actions;
export const { selectJobs } = jobsSlice.selectors;

export const selectDisplayedJobs = createSelector(
  selectFilters,
  selectJobs,
  (filters, jobs) => {
    return !filters.ui.ids.length
      ? jobs
      : jobs?.filter((job) => {
          return filters?.ui.ids.includes(job.id);
        });
  }
);

export default jobsSlice.reducer;
