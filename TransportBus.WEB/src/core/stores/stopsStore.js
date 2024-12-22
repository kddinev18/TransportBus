import { defineStore } from "pinia";
import { BusDataService } from "../services/busDataService";

export const useStopsStore = defineStore("stops", {
  state: () => {
    return {
      stops: [],
    };
  },
  actions: {
    async fetchStops() {
      let reponse = await BusDataService.getStops();
      console.log("response: ", reponse);
      if(reponse.status == 200)
      {
        this.stops = reponse.data;
      }
    },
    async addStop(stopData) {
      let reponse = await BusDataService.addStop(stopData);
      console.log("response: ", reponse);
      if(reponse.status == 200) {
        this.stops.push(stopData);
      }
    },
    async updateStop(id, updatedData) {
      const stop = this.stops.find((s) => s.id === id);
      if (stop) {
        let reponse = await BusDataService.addStop(stop.id, updatedData);
        console.log("response: ", reponse);
        if(reponse.status == 200) {
            stop.name = updatedData.name;
            stop.code = updatedData.code;
            stop.latitude = updatedData.latitude;
            stop.longitude = updatedData.longitude;
        } 
      }
    },
    async removeStop(id) {
      const stop = this.stops.find((s) => s.id === id);
      if (stop) {
        let reponse = await BusDataService.deleteStop(id);
        console.log("response: ", reponse);
        if(reponse.status == 200) {
            this.stops = this.stops.filter((s) => s.id !== id);
        } 
      }
    },
    getStopById(id) {
      return this.stops.find((s) => s.id === id);
    },
    getStopsByIds(ids) {
      return this.stops.filter((s) => ids.includes(s.id));
    },
    getPagedStops(page, pageSize) {
      const startIndex = (page - 1) * pageSize;
      return this.stops.slice(startIndex, startIndex + pageSize);
    },
  },
});
