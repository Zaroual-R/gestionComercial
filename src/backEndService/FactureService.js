import axios from "axios";

const API_URL = 'http://localhost:8088/api/factures';

class FactureService{

    ajouterFacture(factureDTO){
        return axios.post(`${API_URL}`, factureDTO);
    }

    updateFacture(factureDTO,id){
        return axios.put(`${API_URL}/${id}`, factureDTO);
    }

    deleteFacture(id){
        return axios.delete(`${API_URL}/${id}`);
    }

    getFacture(id){
        return axios.get(`${API_URL}/${id}`);
    }

    getAllFactures(){
        return axios.get(`${API_URL}`);
    }


    searchFacture(rechCmdDto) {
        return axios.post(`${API_URL}/recherche`,rechCmdDto);
    }

}
export default new FactureService();

