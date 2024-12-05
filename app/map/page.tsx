"use client";
import styles from "./map.module.css";
import { useEffect, useRef, useState } from "react";
import { useMeasure } from "../hooks/useMeasure";
import { Aggregations } from "../components/Aggregations";
import { MapTopLayer } from "../components/MapTopLayer";
import { getInitialConfig } from "./le";
import {
  createStore,
  actions,
  processAppConfig,
  setEnvironment,
} from "@isardsat/le-components";
import EmbeddedLobeliaExplore from "@isardsat/le-components/components/App";
import type * as Le from "@isardsat/le-components/types";
const { initActions } = actions;

function CoreMap({ width, height }: { width: number; height: number }) {
  const [leStore, setStore] = useState<Le.StoreType>();
  const refMap = useRef<typeof EmbeddedLobeliaExplore>(null);
  const [appConfigProcessed, setAppConfigProcessed] = useState<boolean>(false);
  const [appConfig, setAppConfig] = useState(getInitialConfig());

  const WrappedMapTopLayer = (props) => (
    <MapTopLayer
      width={width}
      height={height}
      variableProjection={props.variableProjection}
    />
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

    console.log({ dataPackage });
    localStore.dispatch(initActions(dataPackage));
    setAppConfigProcessed(true);
    return () => {
      unsubscribe();
    };
  }, []);

  if (!leStore) return <div>Loading...</div>;

  return (
    <>
      <EmbeddedLobeliaExplore
        ref={refMap}
        dataPackage={dataPackage}
        width={width}
        height={height}
        store={leStore}
        onStoreCreated={setStore}
        MapTopLayer={WrappedMapTopLayer}
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
