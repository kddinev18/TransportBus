import { defineStore } from "pinia";

export const useMarkersStore = defineStore("markers", {
  state: () => {
    return {
      fromMarker: null,
      toMarker: null,
    };
  },
});
