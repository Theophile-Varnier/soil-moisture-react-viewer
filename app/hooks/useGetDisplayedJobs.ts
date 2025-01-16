import { useAppSelector } from "@/lib/hooks";
import useGetAggregations from "./useGetAggregations";
import { selectSelectedAggregationId } from "@/lib/features/map/mapSlice";
import { selectJobs } from "@/lib/features/jobs/jobsSlice";
import { useMemo } from "react";

export default function useGetDisplayedJobs() {
  const { aggregations } = useGetAggregations();
  const aggregationId = useAppSelector(selectSelectedAggregationId);
  const jobs = useAppSelector(selectJobs);
  const aggregation =
    aggregationId &&
    aggregations &&
    aggregations.find((a) => a.id === aggregationId);
  return useMemo(
    () =>
      aggregation
        ? jobs.filter((job) => aggregation.jobs.includes(job.id))
        : jobs,
    [aggregationId, jobs]
  );
}
