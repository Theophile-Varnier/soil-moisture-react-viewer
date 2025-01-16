import type * as Le from "@isardsat/le-components/types";
import { setIn } from "timm";

const INITIAL_CENTER = [0, 15] as [number, number];
const INITIAL_ZOOM = 12;
const ZOOM_LIMITS = [8, 25] as [number, number];

const BASEMAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// const UI_CONFIG: Le.Ui = {
//   // Positions
//   positionCreateDelete: false,
//   positionDifference: false,
//   abDimensions: [],
//   // Control block
//   controlBlock: false,
//   cbHeader: false,
//   cbCopyright: false,
//   cbPresets: false,
//   cbLayers: false,
//   cbOpenDrawer: {},
//   // Objects
//   objectCreate: false,
//   objectCreatePoint: false,
//   objectCreateLine: false,
//   objectCreateArea: false,
//   objectDelete: false,
//   objectUpdate: false,
//   pinBoxAnchorsForPointFeatures: false,
//   // Graphs
//   graphCreate: true,
//   graphDelete: false,
//   graphDifference: false,
//   numAutoGraphs: 0,
//   addPinValuesOnlyForShownLayers: false,
//   // Map tools
//   mapTools: true,
//   settings: false,
//   // Time/elevation controls
//   timeElevation: true,
//   // Toolbox
//   initialTool: null,
//   featureSelectConfigs: [], // conditional
//   // Debug
// };

export type AvailableVariable =
  | "fc"
  | "wp"
  | "wp_stp"
  | "fc_std"
  | "sm100m"
  | "sm1km";

export const availableVariables: AvailableVariable[] = [
  "fc",
  "wp",
  "wp_stp",
  "fc_std",
  "sm100m",
  "sm1km",
];

export const variablesParams = {
  fc: {
    datasetId: "whc",
    valueMin: 0,
    valueMax: 0.5,
    colormapId: "inferno",
    colormapInvert: true,
  },
  wp: {
    datasetId: "whc",
    valueMin: 0,
    valueMax: 0.25,
    colormapId: "inferno",
    colormapInvert: true,
  },
  wp_stp: {
    datasetId: "whc",
    valueMin: 0,
    valueMax: 0.1,
    colormapId: "inferno",
    colormapInvert: true,
  },
  fc_std: {
    datasetId: "whc",
    valueMin: 0,
    valueMax: 0.1,
    colormapId: "inferno",
    colormapInvert: true,
  },
  sm100m: {
    datasetId: "sm100m",
    valueMin: 0,
    valueMax: 0.5,
    colormapId: "inferno",
    colormapInvert: true,
  },
  sm1km: {
    datasetId: "sm1km",
    valueMin: 0,
    valueMax: 0.5,
    colormapId: "inferno",
    colormapInvert: true,
  },
};

export const getJobLayer = (id: string, variable: AvailableVariable) => {
  const params = variablesParams[variable];
  return {
    id,
    type: "variable",
    datasetId: `sm/${id}/${params.datasetId}`,
    opacity: 1,
    variableId: variable,
    noPinValue: true,
    autoAddGraphs: ["v(t)"],
    valueMin: 0,
    valueMax: 0.25,
    colormapId: "inferno",
    colormapInvert: true,
    subsetReq: {
      dimReqs: { time: { coord: "current" } },
      representedDimReqs: {
        time: { coord: "current", filterTime: "day" },
      },
    },
  };
};

const UI_CONFIG = {
  settings: false,
  controlBlock: false,
  objectCreateLine: false,
  objectCreateArea: false,
};

const BASEMAP_CONFIG: Le.MapLayer = {
  id: "basemap",
  title: "Basemap",
  notListed: true,
  type: "tileUrl",
  url: BASEMAP_URL,
  zIndex: 0,
};

let APP_CONFIG: Le.AppConfig = {
  id: "SoilMoisture",
  title: "Soil Moisture",
  ui: UI_CONFIG,
  authorized: ".*",
  presets: {
    main: {
      id: "sm",
      title: "Soil Moisture",
      position: {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
        time: "2024-01-01",
      },
      navConfig: {
        zoom: {
          range: ZOOM_LIMITS,
        },
        time: { range: ["2018-01-01", "2024-12-31"], timeSpec: "month" },
      },
      layers: {
        // sm: {
        //   type: "variable",
        //   datasetId: "sm/e48d2319-8824-4715-8a18-645a9ad67f98/whc",
        //   opacity: 1,
        //   variableId: "whc",
        //   noPinValue: true,
        //   autoAddGraphs: ["v(t)"],
        //   valueMin: 0,
        //   valueMax: 0.25,
        //   colormapId: "inferno",
        //   colormapInvert: true,
        //   subsetReq: {
        //     dimReqs: { time: { coord: "current" } },
        //     representedDimReqs: {
        //       time: { coord: "current", filterTime: "day" },
        //     },
        //   },
        // },
        // s2a: {
        //   type: 'variable',
        //   datasetId: DATASET_ID,
        //   variableId: 'rgba',
        //   valueColor: true,
        //   subsetReq: {
        //     dimReqs: { time: { coord: 'current' } },
        //     representedDimReqs: {
        //       time: { coord: 'current', filterTime: 'day' },
        //     },
        //   },
        // },
        // overlay: BASEMAP_OVERLAY,
        basemap: BASEMAP_CONFIG,
      },
    },
  },
  presetId: "main",
};

export const getInitialConfig = (position?: Le.Position): Le.AppConfig => {
  const res = { ...APP_CONFIG };
  if (!position) return res;

  return setIn(res, ["presets", "main", "position"], position) as Le.AppConfig;
};
