import axios from "axios";

const API_URL='http://localhost:8088/api/appUser';

class AppUserService {
    register(registerRequest){
        return axios.post(`${API_URL}/register`,registerRequest );
    }
    authenticate(credentials){
        return axios.post(`${API_URL}/authenticate`,credentials);
    }
    
}

export default new AppUserService();
