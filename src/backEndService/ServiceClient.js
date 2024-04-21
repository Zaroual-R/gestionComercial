import axios from "axios";

const API_URL="http://localhost:8088/api/client";

class ServiceClient{

  ajouterClient(client){
        return axios.post(`${API_URL}/create`, client);        
  }

  deleteClient(id){
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  getClient(id){
    return axios.get(`${API_URL}/${id}`);
  }
  updateClient(client , id){
    return axios.put(`${API_URL}/update/${id}`,client);
  }

  getAllClients(){
    return axios.get(`${API_URL}/all`);
  }

  rechercheClients(searchClient){
    return axios.post(`${API_URL}/recherche`,searchClient);
  }

  getNbrClient (){
    return axios.get(`${API_URL}/nbrClient`);
  }
}
export default new ServiceClient();