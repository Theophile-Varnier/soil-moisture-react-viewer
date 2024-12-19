import { aggregationsFromExecutions } from "@/lib/features/map/mapSlice";
import useGetExecutions from "./useGetExecutions";

export default function useGetAggregations() {
  const executions = useGetExecutions();
  return {
    ...executions,
    aggregations: aggregationsFromExecutions(executions.data),
  };
}
