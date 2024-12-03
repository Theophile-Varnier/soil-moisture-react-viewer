import { AppConfig, MapLayer, Position, Ui } from "@isardsat/le-client";

const INITIAL_CENTER = [0, 15] as [number, number];
const INITIAL_ZOOM = 12;
const ZOOM_LIMITS = [8, 25] as [number, number];

const BASEMAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const UI_CONFIG: Ui = {
  // Positions
  positionCreateDelete: false,
  positionDifference: false,
  abDimensions: [],
  // Control block
  controlBlock: false,
  cbHeader: false,
  cbCopyright: false,
  cbPresets: false,
  cbLayers: false,
  cbOpenDrawer: {},
  // Objects
  objectCreate: false,
  objectCreatePoint: false,
  objectCreateLine: false,
  objectCreateArea: true,
  objectDelete: false,
  objectUpdate: false,
  pinBoxAnchorsForPointFeatures: false,
  // Graphs
  graphCreate: false,
  graphDelete: false,
  graphDifference: false,
  numAutoGraphs: 0,
  addPinValuesOnlyForShownLayers: false,
  // Map tools
  mapTools: false,
  settings: false,
  // Time/elevation controls
  timeElevation: false,
  // Toolbox
  initialTool: null,
  featureSelectConfigs: [], // conditional
  // Debug
};

const BASEMAP_CONFIG: MapLayer = {
  id: "basemap",
  title: "Basemap",
  notListed: true,
  type: "tileUrl",
  url: BASEMAP_URL,
  zIndex: 0,
};

let APP_CONFIG: AppConfig = {
  id: "Jesac",
  title: "Soil Moisture",
  ui: UI_CONFIG,
  authorized: ".*",
  presets: {
    main: {
      id: "s2a",
      positions: [
        {
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM,
          time: "2024-01-01",
        },
      ],
      navConfigs: [
        {
          dimReqs: {
            zoom: {
              range: ZOOM_LIMITS,
            },
          },
          time: {
            range: ["2018-01-01T00:00", new Date()],
            timeSpec: "day",
          },
        },
      ],
      layers: {
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
};

export const getInitialConfig = (position?: Position) => {
  if (!position) return APP_CONFIG;

  return setIn(APP_CONFIG, ["presets", "main", "position"], position);
};
