import React, { useMemo } from "react";

import type { GeoProjection } from "d3-geo";
import { geoPath as d3geoPath } from "d3-geo";

import { JobDto } from "@/lib/api/smApi";
import { shadeColor } from "../gral/helpers";

export interface RegionRenderProps {
  job: JobDto;
  variableProjection: GeoProjection;
}

const JobRender = ({ job, variableProjection }: RegionRenderProps) => {
  const geoPath = useMemo(() => {
    if (!job) return null;

    return d3geoPath().projection(variableProjection)(job.aoi);
  }, [job, variableProjection]);

  const color = "#A3F02B";

  const strokeColor = shadeColor(color, -40);

  return job ? (
    <g
      key={job.id}
      fill={color}
      opacity="0.6"
      stroke={strokeColor}
      strokeWidth="1"
    >
      <path d={geoPath || undefined} />
    </g>
  ) : null;
};

export default React.memo(JobRender);
