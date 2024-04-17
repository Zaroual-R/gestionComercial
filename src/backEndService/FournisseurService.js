import axios from "axios"
const API_URL="http://localhost:8088/api/fournisseur"

class FournisserService{

    createFournisseur(founisseurDto){
        return axios.post(`${API_URL}/create`,founisseurDto);
    }

    updateFournisseur(id,founisseurDto){
        return axios.put(`${API_URL}/update/${id}`,founisseurDto);
    }

    getFournisseur(id){
        return axios.get(`${API_URL}/${id}`);
    }

    deleteFournisseur(id){
        return axios.delete(`${API_URL}/delete/${id}`)
    }

    getAllFournisseurs(){
        return axios.get(`${API_URL}/all`);
    }
    chercherFournisseur(key){
        return axios.get(`${API_URL}/chercher/${key}`)
    }

}
export default new FournisserService();