import apiService from "./baseService";

export class BusDataService {
    static async getRoutes(){
        return await apiService.get('/routes');
    }
    static async addRoute(routeData){
        return await apiService.post('/routes', routeData);
    }
    static async updateRoute(routeId, routeData){
        return await apiService.put(`/routes/${routeId}`, routeData);
    }
    static async deleteRoute(routeId){
        return await apiService.delete(`/routes/${routeId}`);
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