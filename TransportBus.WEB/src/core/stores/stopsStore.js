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
      let service = new BusDataService();
      let reponse = await service.getStops();
      console.log("response: ", reponse);
      if(reponse.status == 200)
      {
        this.stops = reponse.data;
      }
    },
    async addStop(stopData) {
      let service = new BusDataService();
      let reponse = await service.addStop(stopData);
      console.log("response: ", reponse);
      if(reponse.status == 200) {
        this.stops.push(stopData);
      }
    },
    async updateStop(id, updatedData) {
      const stop = this.stops.find((s) => s.id === id);
      if (stop) {
        let service = new BusDataService();
        let reponse = await service.addStop(stop.id, updatedData);
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
        let service = new BusDataService();
        let reponse = await service.deleteStop(id);
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
