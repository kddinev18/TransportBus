import apiService from "./baseService";

export class BusDataService {
    async getRoutes(){
        return await apiService.get('/routes');
    }
    async getStops(){
        return await apiService.get('/stops');
    }
    async addStop(stopData){
        return await apiService.post('/stops', stopData);
    }
    async updateStop(stopId, stopData){
        return await apiService.put(`/stops/${stopId}`, stopData);
    }
    async deleteStop(stopId){
        return await apiService.delete(`/stops/${stopId}`);
    }
}