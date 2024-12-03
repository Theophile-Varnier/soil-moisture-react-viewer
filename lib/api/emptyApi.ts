// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { envs, selectAuth } from "../features/auth/authSlice";
import { RootState } from "../store";

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const auth = selectAuth(api.getState() as RootState);

  const urlEnd = typeof args === "string" ? args : args.url;
  // construct a dynamically generated portion of the url
  const adjustedUrl = `/latest${urlEnd}`;
  const adjustedArgs =
    typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl };

  // provide the amended url and other params to the raw base query
  return fetchBaseQuery({
    baseUrl: envs[auth.env],
    headers: [["access_token", auth.apiKey]],
  })(adjustedArgs, api, extraOptions);
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: dynamicBaseQuery,
  reducerPath: "api",
  endpoints: () => ({}),
});
