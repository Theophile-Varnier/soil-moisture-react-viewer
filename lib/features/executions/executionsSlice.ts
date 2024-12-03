import { JobExecutionCreated } from "@/lib/api/smApi";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectFilters } from "../filters/filtersSlice";
import { TypedUseQueryStateResult } from "@reduxjs/toolkit/query/react";

export interface ExecutionsState {
  executions: JobExecutionCreated[];
}

export const executionsSlice = createSlice({
  name: "executions",
  initialState: {
    executions: [],
  } as ExecutionsState,
  reducers: {
    setExecutions: (state, action) => {
      state.executions = action.payload;
    },
  },
});

type GetExecutionsSelectFromResultArg = TypedUseQueryStateResult<
  JobExecutionCreated[],
  any,
  any
>;

export const selectFilteredExecutions = createSelector(
  (executions: GetExecutionsSelectFromResultArg) => executions.data,
  (
    executions: GetExecutionsSelectFromResultArg,
    filters: ReturnType<typeof selectFilters>
  ) => filters.ui,
  (executions, filters) => {
    console.log(`Filtering ${executions?.length} executions...`);
    return !filters.error &&
      !filters.ids.length &&
      filters.includeError &&
      filters.includeSuccess
      ? executions
      : executions?.filter(
          (execution) =>
            (!filters.error ||
              execution.errors?.find(
                (e) =>
                  e.id?.toLowerCase().includes(filters.error!.toLowerCase()) ||
                  e.message
                    ?.toLowerCase()
                    .includes(filters.error!.toLowerCase()) ||
                  e.name?.toLowerCase().includes(filters.error!.toLowerCase())
              )) &&
            (!filters.ids.length ||
              execution.jobs.some((job) => filters.ids.includes(job))) &&
            (filters.includeError || execution.result !== "ERROR") &&
            (filters.includeSuccess || execution.result !== "SUCCESS")
        );
  }
);

export const { setExecutions } = executionsSlice.actions;
export default executionsSlice.reducer;
