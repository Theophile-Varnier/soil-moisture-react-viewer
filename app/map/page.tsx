"use client";
import styles from "./map.module.css";
import "@isardsat/le-components/styles";
import { useEffect, useRef, useState } from "react";
import { useMeasure } from "../hooks/useMeasure";
import { Aggregations } from "../components/Aggregations";
import { MapTopLayerProps } from "../components/MapTopLayer";
import { availableVariables, getInitialConfig, getJobLayer } from "./le";
import {
  createStore,
  actions,
  processAppConfig,
  setEnvironment,
} from "@isardsat/le-components";
import EmbeddedLobeliaExplore from "@isardsat/le-components/components/App";
import type * as Le from "@isardsat/le-components/types";
import { Provider, useDispatch } from "react-redux";
import JobRender from "../components/JobRender";
import useGetDisplayedJobs from "../hooks/useGetDisplayedJobs";
import { geometry, geometryCollection } from "@turf/helpers";
import center from "@turf/center";
import { getCircumscribingZoomLevel } from "../gral/helpers";
import {
  selectDisplayedVariable,
  setDisplayedVariable,
} from "@/lib/features/map/mapSlice";
import { Select } from "@mantine/core";
import { useAppSelector } from "@/lib/hooks";
const { initActions } = actions;
import { merge, setIn } from "timm";

function CoreMap({ width, height }: { width: number; height: number }) {
  const [leStore, setStore] = useState<Le.StoreType>();
  const refMap = useRef<typeof EmbeddedLobeliaExplore>(null);
  const [appConfigProcessed, setAppConfigProcessed] = useState<boolean>(false);
  const [appConfig, setAppConfig] = useState(getInitialConfig());
  const displayedVariable = useAppSelector(selectDisplayedVariable);

  const dispatch = useDispatch();

  const jobs = useGetDisplayedJobs();

  const WrappedMapTopLayer = ({
    width,
    height,
    variableProjection,
  }: MapTopLayerProps) => (
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

  const dataPackage = { lang: "en", appConfig: appConfig };

  useEffect(() => {
    if (appConfigProcessed) return;

    setEnvironment({
      name: process.env.NODE_ENV,
      dataUrl: process.env.NEXT_PUBLIC_LE_DATA_URL!,
      featuresetsUrl: process.env.NEXT_PUBLIC_LE_FEATURESETS_URL,
      mapboxToken: "",
      appVersion: process.env.APP_VERSION,
      ga: process.env.NEXT_PUBLIC_GA,
    });
    console.log(process.env.NEXT_PUBLIC_LE_DATA_URL);

    const onStoreChange = () => {
      const state = leStore?.getState();
      if (!state) return;
    };

    // TODO fix this hacky way to detect if app config has already been processed.
    // An already processed app config errors when trying to process it again.
    if (appConfig.presets.main.position) {
      processAppConfig(appConfig, "en");
    }

    const localStore = createStore();
    setStore(localStore);
    const unsubscribe = localStore.subscribe(onStoreChange);

    localStore.dispatch(initActions(dataPackage));
    setAppConfigProcessed(true);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!jobs || !jobs.length || !refMap.current) return;
    const collection = geometryCollection(
      jobs.map((job) => geometry(job.aoi.type, job.aoi.coordinates))
    );
    const newBbox = center(collection);
    refMap.current.panZoomTo(
      [newBbox.geometry.coordinates[0], newBbox.geometry.coordinates[1]],
      getCircumscribingZoomLevel(collection.geometry)
    );
  }, [jobs]);

  useEffect(() => {
    if (!jobs || !jobs.length || !refMap.current) return;
    let tmpAppConfig = getInitialConfig();
    let layers = {};
    jobs.reduce((acc, job) => {
      acc[job.id] = getJobLayer(job.id, displayedVariable);
      return acc;
    }, layers);
    layers = merge(tmpAppConfig.presets.main.layers, layers);
    tmpAppConfig = setIn(
      tmpAppConfig,
      ["presets", "main", "layers"],
      layers
    ) as Le.AppConfig;
    setAppConfig(tmpAppConfig);
  }, [jobs, displayedVariable]);

  if (!leStore) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.filtersWrapper}>
        <Select
          data={availableVariables}
          value={displayedVariable}
          onChange={(v) => dispatch(setDisplayedVariable(v))}
        ></Select>
      </div>
      <Provider store={leStore}>
        <EmbeddedLobeliaExplore
          ref={refMap}
          dataPackage={dataPackage}
          width={width}
          height={height}
          UserMapTopLayer={WrappedMapTopLayer}
        ></EmbeddedLobeliaExplore>
      </Provider>
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
