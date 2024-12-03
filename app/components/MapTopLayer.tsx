import { selectJobs } from "@/lib/features/jobs/jobsSlice";
import { useAppSelector } from "@/lib/hooks";
import JobRender from "./JobRender";
import { GeoProjection } from "@isardsat/tero-maps-2d";

export interface MapTopLayerProps {
  width: number;
  height: number;
  variableProjection: GeoProjection;
}

export function MapTopLayer({
  width,
  height,
  variableProjection,
}: MapTopLayerProps) {
  const jobs = useAppSelector(selectJobs);
  return (
    <div style={{ position: "absolute" }}>
      <svg width={width} height={height}>
        {jobs?.map((job) => (
          <JobRender
            key={job.id}
            job={job}
            variableProjection={variableProjection}
          />
        ))}
      </svg>
    </div>
  );
}
