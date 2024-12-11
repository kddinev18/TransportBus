import { defineStore } from 'pinia'
import { RouteModel } from '../models/routeModel';

export const routesStore = defineStore('routes', {
  state: () => {
    return { 
      routes: [] 
    }
  },
  actions: {
    addRoute(routeData) {
      const newStop = new RouteModel(routeData);
      this.routes.push(newStop);
    },

    addRoutes(routesData) {
      const newRoutes = routesData.map(
        (routeData) => new RouteModel(routeData)
      );
      this.routes.push(...newRoutes);
    },

    updateRoute(id, updatedData) {
      const route = this.routes.find((s) => s.id === id);
      if (route) {
        // todo: update route properties
        console.log('new route: ', updatedData)
      }
    },

    removeRoute(id) {
      this.routes = this.routes.filter((s) => s.id !== id);
    },

    getRouteById(id) {
      return this.routes.find((s) => s.id === id);
    },

    getPagedRoutes(page, pageSize) {
      const startIndex = (page - 1) * pageSize;
      return this.routes.slice(startIndex, startIndex + pageSize);
    }
  },
})