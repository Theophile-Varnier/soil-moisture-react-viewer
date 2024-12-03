"use client";
import styles from "./map.module.css";
import {
  Extent,
  GeoProjection,
  LonLat,
  Map2d,
  MapLayers,
} from "@isardsat/tero-maps-2d";
import { useRef } from "react";
import { useMeasure } from "../hooks/useMeasure";
import { Aggregations } from "../components/Aggregations";
import { MapTopLayer } from "../components/MapTopLayer";

const DEFAULT_CENTER: LonLat = [0, 10];
const DEFAULT_ZOOM = 10.5;
const DEFAULT_VISIBLE_EXTENT_LIMITS: Extent = {
  bottomLeft: [-179.99, -85],
  topRight: [+179.99, 85],
};

const BASEMAP = {
  title: "basemap",
  type: "tileUrl",
  opacity: undefined,
  bgColor: undefined,
  pixelateAboveZoomMax: false,
  id: "lobeliaBathymetry",
  url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
  resolutionMax: 2,
  className: "basemap",
};

const getBaseMapLayer = (layer: typeof BASEMAP): MapLayers => ({
  basemap: {
    id: layer.id,
    className: layer.className ?? "",
    opacity: layer.opacity ?? 1,
    type: "tiles",
    tileSpec: {
      id: layer.url,
      url: layer.url,
      bgColor: layer.bgColor,
      pixelateAboveZoomMax: layer.pixelateAboveZoomMax,
    },
  },
});

function CoreMap({ width, height }: { width: number; height: number }) {
  const mapRef = useRef<Map2d>(null);

  return (
    <>
      <Map2d
        ref={mapRef}
        width={width}
        height={height}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        zoomLimits={[1, 23]}
        layers={getBaseMapLayer(BASEMAP)}
        visibleExtentLimits={DEFAULT_VISIBLE_EXTENT_LIMITS}
      >
        {({ variableProjection }) => (
          <MapTopLayer
            width={width}
            height={height}
            variableProjection={variableProjection as GeoProjection}
          />
        )}
      </Map2d>
      <Aggregations></Aggregations>
    </>
  );
}

export default function RootMap() {
  const { ref: refMeasurer, width, height } = useMeasure<HTMLDivElement>();

  const canRenderMap = width && height;

  return (
    <div className={styles.mapWrapper} ref={refMeasurer}>
      {canRenderMap && <CoreMap width={width} height={height} />}
    </div>
  );
}
