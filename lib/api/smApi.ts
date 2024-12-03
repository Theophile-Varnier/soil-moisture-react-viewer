import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["jobs", "runs", "users"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      queueJobsJobsQueuePost: build.mutation<
        QueueJobsJobsQueuePostApiResponse,
        QueueJobsJobsQueuePostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/queue`,
          method: "POST",
          body: queryArg.jobsId,
        }),
        invalidatesTags: ["jobs"],
      }),
      finishJobsJobsFinishPost: build.mutation<
        FinishJobsJobsFinishPostApiResponse,
        FinishJobsJobsFinishPostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/finish`,
          method: "POST",
          body: queryArg.jobsId,
        }),
        invalidatesTags: ["jobs"],
      }),
      getJobListJobsGet: build.query<
        GetJobListJobsGetApiResponse,
        GetJobListJobsGetApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/`,
          params: {
            userid: queryArg.userid,
            status: queryArg.status,
            outputEnvironment: queryArg.outputEnvironment,
            page: queryArg.page,
            itemsPerPage: queryArg.itemsPerPage,
          },
        }),
        providesTags: ["jobs"],
      }),
      createJobJobsPost: build.mutation<
        CreateJobJobsPostApiResponse,
        CreateJobJobsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/`,
          method: "POST",
          body: queryArg.jobBase,
        }),
        invalidatesTags: ["jobs"],
      }),
      getJobDetailJobsJobIdGet: build.query<
        GetJobDetailJobsJobIdGetApiResponse,
        GetJobDetailJobsJobIdGetApiArg
      >({
        query: (queryArg) => ({ url: `/jobs/${queryArg.jobId}` }),
        providesTags: ["jobs"],
      }),
      updateJobJobsJobIdPatch: build.mutation<
        UpdateJobJobsJobIdPatchApiResponse,
        UpdateJobJobsJobIdPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/${queryArg.jobId}`,
          method: "PATCH",
          body: queryArg.jobUpdate,
        }),
        invalidatesTags: ["jobs"],
      }),
      getRunsRunsGet: build.query<
        GetRunsRunsGetApiResponse,
        GetRunsRunsGetApiArg
      >({
        query: (queryArg) => ({
          url: `/runs/`,
          params: {
            userid: queryArg.userid,
            finished: queryArg.finished,
            from: queryArg["from"],
            to: queryArg.to,
          },
        }),
        providesTags: ["runs"],
      }),
      startExecutionRunsPost: build.mutation<
        StartExecutionRunsPostApiResponse,
        StartExecutionRunsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/runs/`,
          method: "POST",
          body: queryArg.jobExecutionCreated,
        }),
        invalidatesTags: ["runs"],
      }),
      updateExecutionsRunsPatch: build.mutation<
        UpdateExecutionsRunsPatchApiResponse,
        UpdateExecutionsRunsPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/runs/`,
          method: "PATCH",
          body: queryArg.executionResults,
        }),
        invalidatesTags: ["runs"],
      }),
      getHistoricalExecutionsForJobsRunsHistoricalPost: build.mutation<
        GetHistoricalExecutionsForJobsRunsHistoricalPostApiResponse,
        GetHistoricalExecutionsForJobsRunsHistoricalPostApiArg
      >({
        query: (queryArg) => ({
          url: `/runs/historical`,
          method: "POST",
          body: queryArg.jobsId,
        }),
        invalidatesTags: ["runs"],
      }),
      rerunJobsJobsRerunPost: build.mutation<
        RerunJobsJobsRerunPostApiResponse,
        RerunJobsJobsRerunPostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/rerun`,
          method: "POST",
          body: queryArg.jobsId,
        }),
        invalidatesTags: ["jobs"],
      }),
      queryJobListJobsQueryPost: build.mutation<
        QueryJobListJobsQueryPostApiResponse,
        QueryJobListJobsQueryPostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/query`,
          method: "POST",
          body: queryArg.ids,
        }),
        invalidatesTags: ["jobs"],
      }),
      getJobFilesJobsFilesPost: build.mutation<
        GetJobFilesJobsFilesPostApiResponse,
        GetJobFilesJobsFilesPostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/files`,
          method: "POST",
          body: queryArg.ids,
        }),
        invalidatesTags: ["jobs"],
      }),
      getJobExecutionDetailRunsExecutionIdGet: build.query<
        GetJobExecutionDetailRunsExecutionIdGetApiResponse,
        GetJobExecutionDetailRunsExecutionIdGetApiArg
      >({
        query: (queryArg) => ({ url: `/runs/${queryArg.executionId}` }),
        providesTags: ["runs"],
      }),
      getUserUsersWhoamiGet: build.query<
        GetUserUsersWhoamiGetApiResponse,
        GetUserUsersWhoamiGetApiArg
      >({
        query: () => ({ url: `/users/whoami` }),
        providesTags: ["users"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as smApi };
export type QueueJobsJobsQueuePostApiResponse =
  /** status 200 Successful Response */ JobDto[];
export type QueueJobsJobsQueuePostApiArg = {
  jobsId: string[];
};
export type FinishJobsJobsFinishPostApiResponse =
  /** status 200 Successful Response */ JobDto[];
export type FinishJobsJobsFinishPostApiArg = {
  jobsId: string[];
};
export type GetJobListJobsGetApiResponse =
  /** status 200 Successful Response */ JobDto[];
export type GetJobListJobsGetApiArg = {
  userid?: string | null;
  status?: JobStatus | null;
  outputEnvironment?: string | null;
  page?: number | null;
  itemsPerPage?: number | null;
};
export type CreateJobJobsPostApiResponse =
  /** status 201 Successful Response */ JobDto;
export type CreateJobJobsPostApiArg = {
  jobBase: JobBase;
};
export type GetJobDetailJobsJobIdGetApiResponse =
  /** status 200 Successful Response */ JobDto;
export type GetJobDetailJobsJobIdGetApiArg = {
  jobId: string;
};
export type UpdateJobJobsJobIdPatchApiResponse =
  /** status 200 Successful Response */ JobDto;
export type UpdateJobJobsJobIdPatchApiArg = {
  jobId: string;
  jobUpdate: JobUpdate;
};
export type GetRunsRunsGetApiResponse =
  /** status 200 Successful Response */ JobExecutionCreated[];
export type GetRunsRunsGetApiArg = {
  userid?: string | null;
  finished?: boolean | null;
  from?: string | null;
  to?: string | null;
};
export type StartExecutionRunsPostApiResponse =
  /** status 200 Successful Response */ JobExecutionCreated;
export type StartExecutionRunsPostApiArg = {
  jobExecutionCreated: JobExecutionCreated;
};
export type UpdateExecutionsRunsPatchApiResponse =
  /** status 200 Successful Response */ JobExecutionUpdate[];
export type UpdateExecutionsRunsPatchApiArg = {
  executionResults: JobExecutionUpdate[];
};
export type GetHistoricalExecutionsForJobsRunsHistoricalPostApiResponse =
  /** status 200 Successful Response */ {
    [key: string]: JobExecutionInfo[];
  };
export type GetHistoricalExecutionsForJobsRunsHistoricalPostApiArg = {
  jobsId: string[];
};
export type RerunJobsJobsRerunPostApiResponse =
  /** status 200 Successful Response */ {
    [key: string]: JobExecutionInfo[];
  };
export type RerunJobsJobsRerunPostApiArg = {
  jobsId: string[];
};
export type QueryJobListJobsQueryPostApiResponse =
  /** status 200 Successful Response */ JobDto[];
export type QueryJobListJobsQueryPostApiArg = {
  ids: string[];
};
export type GetJobFilesJobsFilesPostApiResponse =
  /** status 200 Successful Response */ object;
export type GetJobFilesJobsFilesPostApiArg = {
  ids: string[];
};
export type GetJobExecutionDetailRunsExecutionIdGetApiResponse =
  /** status 200 Successful Response */ JobExecutionCreated;
export type GetJobExecutionDetailRunsExecutionIdGetApiArg = {
  executionId: string;
};
export type GetUserUsersWhoamiGetApiResponse =
  /** status 200 Successful Response */ User;
export type GetUserUsersWhoamiGetApiArg = void;
export type Priority = "very_low" | "low" | "normal" | "high" | "very_high";
export type Position2D = [number, number];
export type Position3D = [number, number, number];
export type LineString = {
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null;
  type: "LineString";
  coordinates: (Position2D | Position3D)[];
};
export type MultiLineString = {
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null;
  type: "MultiLineString";
  coordinates: (Position2D | Position3D)[][];
};
export type MultiPoint = {
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null;
  type: "MultiPoint";
  coordinates: (Position2D | Position3D)[];
};
export type MultiPolygon = {
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null;
  type: "MultiPolygon";
  coordinates: (Position2D | Position3D)[][][];
};
export type Point = {
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null;
  type: "Point";
  coordinates: Position2D | Position3D;
};
export type Polygon = {
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null;
  type: "Polygon";
  coordinates: (Position2D | Position3D)[][];
};
export type GeometryCollection = {
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null;
  type: "GeometryCollection";
  geometries: (
    | ({
        type: "GeometryCollection";
      } & GeometryCollection)
    | ({
        type: "LineString";
      } & LineString)
    | ({
        type: "MultiLineString";
      } & MultiLineString)
    | ({
        type: "MultiPoint";
      } & MultiPoint)
    | ({
        type: "MultiPolygon";
      } & MultiPolygon)
    | ({
        type: "Point";
      } & Point)
    | ({
        type: "Polygon";
      } & Polygon)
  )[];
};
export type ProductType = "SM100m" | "SM1km" | "BIOMASS" | "WHC";
export type JobStatus =
  | "INACTIVE"
  | "ACTIVE"
  | "QUEUED"
  | "RUNNING"
  | "UNPROCESSABLE";
export type ProductSubType = "L1" | "L2";
export type JobExecutionResult = "SUCCESS" | "ERROR";
export type JobExecutionInfo = {
  startDate: string;
  endDate: string;
  executionStartDate: string;
  id: string;
  outputPath?: string | null;
  result?: JobExecutionResult | null;
  executionEndDate?: string | null;
  userId: string;
  productType: ProductType;
  jobId: string;
  callbackUrl: string | null;
  rerun?: boolean;
};
export type JobDto = {
  startDate?: string | null;
  endDate?: string | null;
  outputEnvironment?: string | null;
  transferType?: string | null;
  transferCredentials?: any | null;
  priority?: Priority | null;
  callbackUrl?: string | null;
  name?: string | null;
  aoi: GeometryCollection | MultiPolygon | Polygon;
  productType: ProductType;
  id: string;
  status: JobStatus;
  userId: string;
  rerunPending: boolean;
  subtype: ProductSubType;
  createdAt: string;
  executions: JobExecutionInfo[];
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type GeoJsonToWkbPolygon = {
  type: "Polygon";
  coordinates: [number, number][][];
};
export type GeoJsonToWkbMultiPolygon = {
  type: "MultiPolygon";
  coordinates: [number, number][][][];
};
export type JobBase = {
  startDate?: string | null;
  endDate?: string | null;
  outputEnvironment?: string | null;
  transferType?: string | null;
  transferCredentials?: any | null;
  priority?: Priority | null;
  callbackUrl?: string | null;
  name?: string | null;
  aoi: GeoJsonToWkbPolygon | GeoJsonToWkbMultiPolygon;
  productType: ProductType;
};
export type JobUpdate = {
  status?: JobStatus | null;
  endDate?: string | null;
  priority?: Priority | null;
};
export type SentryError = {
  id?: string | null;
  message?: string | null;
  name?: string | null;
};
export type JobExecutionCreated = {
  startDate: string;
  endDate: string;
  executionStartDate: string;
  id: string;
  outputPath?: string | null;
  result?: JobExecutionResult | null;
  executionEndDate?: string | null;
  userId: string;
  productType: ProductType;
  jobs: string[];
  rootPath: string;
  rerun?: boolean;
  errors?: SentryError[] | null;
  geoLocation?: object | null;
};
export type JobExecutionUpdate = {
  executionId: string;
  jobId: string;
  result: JobExecutionResult;
  executionEndDate: string;
  additionalInformation?: string | null;
  errorId?: string | null;
  errorName?: string | null;
  files?: string[] | null;
};
export type User = {
  id: string;
  email: string;
  givenNames: string;
  familyName: string;
};
export const {
  useQueueJobsJobsQueuePostMutation,
  useFinishJobsJobsFinishPostMutation,
  useGetJobListJobsGetQuery,
  useCreateJobJobsPostMutation,
  useGetJobDetailJobsJobIdGetQuery,
  useUpdateJobJobsJobIdPatchMutation,
  useGetRunsRunsGetQuery,
  useStartExecutionRunsPostMutation,
  useUpdateExecutionsRunsPatchMutation,
  useGetHistoricalExecutionsForJobsRunsHistoricalPostMutation,
  useRerunJobsJobsRerunPostMutation,
  useQueryJobListJobsQueryPostMutation,
  useGetJobFilesJobsFilesPostMutation,
  useGetJobExecutionDetailRunsExecutionIdGetQuery,
  useGetUserUsersWhoamiGetQuery,
} = injectedRtkApi;
