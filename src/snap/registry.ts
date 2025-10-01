import type { PartSnapData } from "@/types/snap";

import SNAP_2456_JSON from "@/snap/brick-json-data/2456-snap.json";
import SNAP_3001_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3002_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3003_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3004_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3005_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3020_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3021_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3022_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3023_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3024_JSON from "@/snap/brick-json-data/3001-snap.json";
import SNAP_3795_JSON from "@/snap/brick-json-data/3001-snap.json";

export const SNAP_REGISTRY: Record<string, PartSnapData> = {
  "2456.dat": SNAP_2456_JSON as PartSnapData,
  "3001.dat": SNAP_3001_JSON as PartSnapData,
  "3002.dat": SNAP_3002_JSON as PartSnapData,
  "3003.dat": SNAP_3003_JSON as PartSnapData,
  "3004.dat": SNAP_3004_JSON as PartSnapData,
  "3005.dat": SNAP_3005_JSON as PartSnapData,
  "3020.dat": SNAP_3020_JSON as PartSnapData,
  "3021.dat": SNAP_3021_JSON as PartSnapData,
  "3022.dat": SNAP_3022_JSON as PartSnapData,
  "3023.dat": SNAP_3023_JSON as PartSnapData,
  "3024.dat": SNAP_3024_JSON as PartSnapData,
  "3795.dat": SNAP_3795_JSON as PartSnapData,
};
