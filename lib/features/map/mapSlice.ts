import { createSlice } from "@reduxjs/toolkit";
import { JobExecutionCreated } from "@/lib/api/smApi";
import { DateTime } from "luxon";

export interface MapState {
  selectedAggregationId: string | undefined;
}

export interface Aggregation {
  id: string;
  jobs: string[];
  executions: JobExecutionCreated[];
  start: DateTime;
  end: DateTime;
  name?: string;
  geoLocation?: string;
}

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    selectedAggregationId: undefined,
  } as MapState,
  reducers: {
    setSelectedAggregationId: (state, action) => {
      state.selectedAggregationId = action.payload;
    },
  },
  selectors: {
    selectSelectedAggregationId: (state) => state.selectedAggregationId,
  },
});

export const aggregationsFromExecutions = (
  executions: JobExecutionCreated[] | undefined
) =>
  executions?.reduce<Aggregation[]>((acc, execution) => {
    let previousAggregation: Aggregation | undefined = undefined;
    for (const job of execution.jobs) {
      const jobAggregation = acc.find((agg) => agg.jobs.includes(job));
      if (!jobAggregation && !previousAggregation) {
        previousAggregation = {
          id: execution.id,
          jobs: execution.jobs,
          executions: [],
          start: DateTime.fromISO(execution.startDate),
          end: DateTime.fromISO(execution.endDate),
        };
        acc.push(previousAggregation);
      } else if (
        previousAggregation &&
        jobAggregation &&
        previousAggregation !== jobAggregation
      ) {
        previousAggregation.executions.push(...jobAggregation.executions);
        acc = acc.filter((agg) => agg !== jobAggregation);
      } else {
        previousAggregation = previousAggregation || jobAggregation!;
      }
      if (!previousAggregation.executions.find((e) => e.id === execution.id)) {
        previousAggregation.executions.push(execution);
      }
      if (
        execution.jobs.length >= previousAggregation.jobs.length &&
        execution.geoLocation
      ) {
        const geoLocation = execution.geoLocation as any;
        previousAggregation.geoLocation = `${geoLocation.toponymName}, ${geoLocation.adminName1}, ${geoLocation.countryName}`;
      }

      previousAggregation.start = DateTime.min(
        ...previousAggregation.executions.map((e) =>
          DateTime.fromISO(e.startDate)
        )
      );
      previousAggregation.end = DateTime.max(
        ...previousAggregation.executions.map((e) =>
          DateTime.fromISO(e.endDate)
        )
      );
    }
    return acc;
  }, []);

export const { setSelectedAggregationId } = mapSlice.actions;
export const { selectSelectedAggregationId } = mapSlice.selectors;
export default mapSlice.reducer;
