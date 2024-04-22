import axios from "axios";

const API_URL = 'http://localhost:8088/api/livraisons';

class LivraisonService{

    ajouterLivraison(livraisonDTO){
        return axios.post(`${API_URL}`, livraisonDTO);
    }

    updateLivraison(livraisonDTO,id){
        return axios.put(`${API_URL}/${id}`, livraisonDTO);
    }

    deleteLivraison(id){
        return axios.delete(`${API_URL}/${id}`);
    }

    getLivraison(id){
        return axios.get(`${API_URL}/${id}`);
    }

    getAllLivraisons(){
        return axios.get(`${API_URL}`);
    }


    searchLivraison(rechCmdDto) {
        return axios.post(`${API_URL}/recherche`,rechCmdDto);
    }

}
export default new LivraisonService();

