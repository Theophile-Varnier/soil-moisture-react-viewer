import turfBbox from "@turf/bbox";
import turfBuffer from "@turf/buffer";
import turfDistance from "@turf/distance";
import { getCrsSpec } from "@isardsat/tero-maps-helpers";

export const shadeColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? Math.round(R) : 255;
  G = G < 255 ? Math.round(G) : 255;
  B = B < 255 ? Math.round(B) : 255;

  const RR = R.toString(16).padStart(2, "0");
  const GG = G.toString(16).padStart(2, "0");
  const BB = B.toString(16).padStart(2, "0");

  return `#${RR}${GG}${BB}`;
};

export const getCircumscribingZoomLevel = (geometry: GeoJSON.Geometry) => {
  /*
    
       Bbox: minX, minY, maxX, maxY
              0     1     2     3
    
                3
             _______
            |       |
          0 |       | 2
            |_______|
                1
    
      */

  const paddingFactor = 0;

  const bbox = turfBbox(geometry);
  const bboxWidth = turfDistance([bbox[0], bbox[1]], [bbox[2], bbox[1]]);
  const bboxHeight = turfDistance([bbox[0], bbox[1]], [bbox[0], bbox[3]]);
  const maxDistance = Math.max(bboxWidth, bboxHeight);
  const bufferedArea = turfBuffer(geometry as any, maxDistance * paddingFactor);
  const bufferedBbox = turfBbox(bufferedArea);

  const projection = getCrsSpec("epsg:3857").getProjection(1, 0, 0);

  let [arbXMin, arbYMin] = projection([bufferedBbox[0], bufferedBbox[3]])!;
  let [arbXMax, arbYMax] = projection([bufferedBbox[2], bufferedBbox[1]])!;
  if (arbXMin < -0.5) arbXMin = -0.5;
  if (arbXMax > +0.5) arbXMax = +0.5;
  if (arbYMin < -0.5) arbYMin = -0.5;
  if (arbYMax > +0.5) arbYMax = +0.5;
  const arbW = Math.abs(arbXMax - arbXMin);
  const arbH = Math.abs(arbYMax - arbYMin);

  const longest = arbW > arbH ? arbW : arbH;
  const z = -Math.log2(longest);

  return Math.max(9, z + 9);
};
