import apiService from "./baseService";

export class BusDataService {
    static async getRoutes(){
        return await apiService.get('/routes');
    }
    static async getStops(){
        return await apiService.get('/stops');
    }
    static async addStop(stopData){
        return await apiService.post('/stops', stopData);
    }
    static async updateStop(stopId, stopData){
        return await apiService.put(`/stops/${stopId}`, stopData);
    }
    static async deleteStop(stopId){
        return await apiService.delete(`/stops/${stopId}`);
    }
}