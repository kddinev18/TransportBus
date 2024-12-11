import apiService from "./baseService";

export default class AuthenticationService {
    async logIn(userName, password) {
        let result = await apiService.post('/login', { userName, password })
        localStorage.setItem('authToken', result.data.token);
    }
}