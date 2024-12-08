import apiService from "./baseService";

export default class authenticationService {
    async logIn(userName, password) {
        let result = await apiService.post('/auth/login', { userName, password })
        localStorage.setItem('authToken', result.data.token);
    }
}