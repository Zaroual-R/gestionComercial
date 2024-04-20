import axios from "axios";

const API_URL = 'http://localhost:8088/api/Product';

class ProductService {
   
    createProduct(produitDto) {
        return axios.post(`${API_URL}/create`, produitDto);
    }

    updateProduct(produitDto ,id) {
        return axios.put(`${API_URL}/update/${id}`, produitDto);
    }

    deleteProduct(id) {
        return axios.delete(`${API_URL}/delete/${id}`);
    }

    getProduct(id) {
        return axios.get(`${API_URL}/resProduit/${id}`);
    }

    getAllProducts() {
        return axios.get(`${API_URL}/all`);
    }

    searchProducts(rechPDto) {
        return axios.post(`${API_URL}/recherche`,rechPDto);
    }

    getNbrLignes(id){
        return axios.get(`${API_URL}/nbrLignes/${id}`);
    }

}

export default new ProductService();
