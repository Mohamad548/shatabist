// stores/mapStore.ts
import { create } from "zustand";

interface MapState {
  lat: string;
  lng: string;
  zoom: number;
}

interface MapActions {
  setLat: (lat: string) => void;
  setLng: (lng: string) => void;
  setZoom: (zoom: number) => void;
}

export const useMapStore = create<MapState & MapActions>((set) => ({
  lat: "",
  lng: "",
  zoom: 13,
  setLat: (lat) => set({ lat }),
  setLng: (lng) => set({ lng }),
  setZoom: (zoom) => set({ zoom }),
}));
