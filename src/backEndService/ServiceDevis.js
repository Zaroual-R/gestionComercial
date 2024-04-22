import axios from "axios";

const API_URL = 'http://localhost:8088/api/devis';

class ServiceDevis{

    ajouterCommande(commandeDto){
        return axios.post(`${API_URL}`, commandeDto);
    }

    updateCommande(commandeDto,id){
        return axios.put(`${API_URL}/${id}`, commandeDto);
    }

    deleteCommande(id){
        return axios.delete(`${API_URL}/${id}`);
    }

    getCommande(id){
        return axios.get(`${API_URL}/${id}`);
    }

    getAllCommande(){
        return axios.get(`${API_URL}`);
    }

    getLignesCommande(id){
        return axios.get(`${API_URL}/lignes/${id}`);
    }

    searchCommande(rechCmdDto) {
        return axios.post(`${API_URL}/recherche`,rechCmdDto);
    }
    sendDevis(id){
        return axios.post(`${API_URL}/${id}/sendEmail`);
    }
    generateDevis(id){
        return axios.get(`${API_URL}/generate/${id}`);
    }
    lanceCommand(id){
        return axios.post(`${API_URL}/${id}/confirm`);
    }

}
export default new ServiceDevis();