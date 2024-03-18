import axios from "axios";

const API_URL = 'http://localhost:8088/api/commande';

class ServiceCommande{

    ajouterCommande(commandeDto){
        return axios.post(`${API_URL}/create`, commandeDto);
    }

    updateCommande(commandeDto,id){
        return axios.put(`${API_URL}/update/${id}`, commandeDto);
    }

    deleteCommande(id){
        return axios.delete(`${API_URL}/delete/${id}`);
    }

    getCommande(id){
        return axios.get(`${API_URL}/${id}`);
    }

    getAllCommande(){
        return axios.get(`${API_URL}/all`);
    }

    getLignesCommande(id){
        return axios.get(`${API_URL}/LignesCommandes/${id}`);
    }

    searchCommande(rechCmdDto) {
        return axios.post(`${API_URL}/recherche`,rechCmdDto);
    }

}
export default new ServiceCommande();