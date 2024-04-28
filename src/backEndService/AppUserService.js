import axiosInstance from './axisConfig'; // Assurez-vous que le chemin d'importation est correct
import axios from 'axios';
const API_URL='http://localhost:8088/api/appUser';

class AppUserService {

    register(registerRequest) {
        return axios.post(`${API_URL}/register`, registerRequest);
    }
    authenticate(credentials) {
        return axios.post(`${API_URL}/authenticate`, credentials);
    }

    refreshToken() {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        console.log('Le refreshToken est: ', refreshTokenValue);
        const refreshTokenDTO = {
            "refreshToken": refreshTokenValue
        }
        return axios.post(`${API_URL}/refresh-token`, refreshTokenDTO);
    }
    getAllUsers = async () => {
            return axios.get(API_URL);
           
      };
}


export default new AppUserService();