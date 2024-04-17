
import axios from "axios";

const API_URL="http://localhost:8088/api/bonLivraisonF";

class BonLivFourService {
    createBonLivFour(bonlivFourDto){
        return axios.post(`${API_URL}/create`,bonlivFourDto);
    }

    updateBonLivFour(bonlivFourDto,id){
        return axios.put(`${API_URL}/update/${id}`,bonlivFourDto);
    }

    getBonLivFourDto(id){
        return axios.get(`${API_URL}/${id}`);
    }

    deleteBonLivFour(id){
        return axios.delete(`${API_URL}/delete/${id}`);
    }
}

export default new BonLivFourService();