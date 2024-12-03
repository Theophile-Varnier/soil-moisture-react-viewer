import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice";
import executions from "./features/executions/executionsSlice";
import filters from "./features/filters/filtersSlice";
import jobs from "./features/jobs/jobsSlice";
import { smApi } from "./api/smApi";
import listenerMiddleware from "./listerner";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth,
      executions,
      filters,
      jobs,
      [smApi.reducerPath]: smApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(smApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
