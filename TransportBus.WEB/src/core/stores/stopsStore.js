import { defineStore } from 'pinia'
import { StopModel } from '../models/stopModel';

export const stopsStore = defineStore('stops', {
  state: () => {
    return { 
      stops: [] 
    }
  },
  actions: {
    addStop(stopData) {
      const newStop = new StopModel(stopData);
      this.stops.push(newStop);
    },

    addStops(stopsData) {
      const newStops = stopsData.map(
        (stopData) => new StopModel(stopData)
      );
      this.stops.push(...newStops);
    },

    updateStop(id, updatedData) {
      const stop = this.stops.find((s) => s.id === id);
      if (stop) {
        console.log('new stop: ', updatedData)
        // todo: update stop properties
      }
    },

    removeStop(id) {
      this.stops = this.stops.filter((s) => s.id !== id);
    },

    getStopById(id) {
      return this.stops.find((s) => s.id === id);
    },

    getPagedStops(page, pageSize) {
      const startIndex = (page - 1) * pageSize;
      return this.stops.slice(startIndex, startIndex + pageSize);
    }
  },
})