import axios from 'axios';

const API_URL ="http://localhost:8088/api/facture";

class FactureFourService{
    createFacture(formData){
        return axios.post(`${API_URL}/create`,formData);
    }

    updateFacture(facturDto,id){
        return axios.put(`${API_URL}/update/${id}`,facturDto);
    }

    getFacture(id){
        return axios.get(`${API_URL}/${id}`);
    }

    deleteFacture(id){
        return axios.delete(`${API_URL}/delete/${id}`);
    }
}

export default new FactureFourService();