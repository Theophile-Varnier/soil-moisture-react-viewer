import { useGetRunsRunsGetQuery } from "@/lib/api/smApi";
import { selectAuth } from "@/lib/features/auth/authSlice";
import { selectFilteredExecutions } from "@/lib/features/executions/executionsSlice";
import { selectFilters } from "@/lib/features/filters/filtersSlice";
import { useAppSelector } from "@/lib/hooks";
import { DateTime } from "luxon";

function useGetExecutions() {
  const auth = useAppSelector(selectAuth);
  const filters = useAppSelector(selectFilters);
  return useGetRunsRunsGetQuery(
    {
      from: DateTime.fromMillis(filters.executions.startDate).toISODate(),
      to: DateTime.fromMillis(filters.executions.endDate)
        .plus({ days: 1 })
        .toISODate(),
    },
    {
      skip: !auth.user,
      selectFromResult: (result) => ({
        ...result,
        executions: selectFilteredExecutions(result, filters),
      }),
    }
  );
}

export default useGetExecutions;
