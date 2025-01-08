import apiService from "../../../core/services/baseService";

export default class UserService {
    static async getAllUsers() {
        return await apiService.get('/users');
    }
    static async addUser(data) {
        const result = await apiService.post('/users', data);
        if (result.status == 200) {
            return true;
        }
        return false;
    }
    static async updateUser(id, data) {
        const result = await apiService.put('/users/'+id, data);
        if (result.status == 200) {
            return true;
        }
        return false;
    }
}