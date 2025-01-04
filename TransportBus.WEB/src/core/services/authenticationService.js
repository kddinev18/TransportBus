import apiService from "./baseService";

export default class AuthenticationService {
    static async logIn(userName, password) {
        let result = await apiService.post('/login', { email: userName, password: password })
        if(result.status !== 200) {
            return false;
        }
        else{
            localStorage.setItem('authToken', result.data.accessToken);
            return true;
        }
    }
}