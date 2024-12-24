import { defineStore } from "pinia";
import { BusDataService } from "../services/busDataService";

export const useRoutesStore = defineStore("routes", {
  state: () => {
    return {
      routes: [],
    };
  },
  actions: {
    async fetchRoutes() {
      let reponse = await BusDataService.getRoutes();
      if (reponse.status == 200) {
        this.routes = reponse.data;
      }
    },
    async addRoute(routeData) {
      let reponse = await BusDataService.addRoute(routeData);
      console.log("response: ", reponse);
      if (reponse.status == 200) {
        this.routes.push(routeData);
      }
    },
    async updateRoute(id, updatedData) {
      const route = this.routes.find((s) => s.id === id);
      if (route) {
        let reponse = await BusDataService.updateRoute(route.id, updatedData);
        console.log("response: ", reponse);
        if (reponse.status == 200) {
          // update data
        }
      }
    },
    async removeRoute(id) {
      const route = this.routes.find((s) => s.id === id);
      if (route) {
        let reponse = await BusDataService.deleteRoute(id);
        console.log("response: ", reponse);
        if (reponse.status == 200) {
          this.routes = this.routes.filter((s) => s.id !== id);
        }
      }
    },
    getRouteById(id) {
      return this.routes.find((s) => s.id === id);
    },
    getroutesByIds(ids) {
      return this.routes.filter((s) => ids.includes(s.id));
    },
    getPagedRoutes(page, pageSize) {
      const startIndex = (page - 1) * pageSize;
      return this.routes.slice(startIndex, startIndex + pageSize);
    }
  },
});
