"use client";
import styles from "./map.module.css";
import { useRef, useState } from "react";
import { useMeasure } from "../hooks/useMeasure";
import { Aggregations } from "../components/Aggregations";
import { MapTopLayer } from "../components/MapTopLayer";
import { getInitialConfig } from "./le";
import { EmbeddedLobeliaExplore } from "@isardsat/le-client";

function CoreMap({ width, height }: { width: number; height: number }) {
  const refMap = useRef<EmbeddedLobeliaExplore>(null);
  const [leStore, setLeStore] = useState(null);
  const [appConfig, setAppConfig] = useState(getInitialConfig());

  const WrappedMapTopLayer = (props) => (
    <MapTopLayer
      width={width}
      height={height}
      variableProjection={props.variableProjection}
    />
  );

  const dataPackage = { lang: "en", appConfig: appConfig };

  return (
    <>
      <EmbeddedLobeliaExplore
        ref={refMap}
        dataPackage={dataPackage}
        width={width}
        height={height}
        MapTopLayer={WrappedMapTopLayer}
        onStoreCreated={setLeStore}
      ></EmbeddedLobeliaExplore>
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
