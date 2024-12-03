import { createListenerMiddleware } from "@reduxjs/toolkit";
import { smApi } from "./api/smApi";
import { setJobs } from "./features/jobs/jobsSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: smApi.endpoints.getRunsRunsGet.matchFulfilled,
  effect: async (action, listenerApi) => {
    if (action.payload && action.payload.length) {
      const query = smApi.endpoints.queryJobListJobsQueryPost.initiate({
        ids: [...new Set(action.payload.flatMap((e) => e.jobs))],
      });
      const jobs = await query(listenerApi.dispatch, listenerApi.getState, {});
      listenerApi.dispatch(setJobs(jobs.data));
    }
  },
});

export default listenerMiddleware;
