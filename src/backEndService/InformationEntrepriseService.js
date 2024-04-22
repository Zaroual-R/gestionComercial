import axios from "axios";

const API_URL='http://localhost:8088/api/information';

class InformationEntrepriseService{


    updateInformationEntreprise(nom, adresse, telephone, email, logo, signature){
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('adresse', adresse);
        formData.append('telephone', telephone);
        formData.append('email', email);
        if (logo) formData.append('logo', logo);
        if (signature) formData.append('signature', signature);

        const config = {
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        };

        return axios.put(`${API_URL}/update`, formData, config);    
    }
    getInformationEntreprise(){
        return axios.get(`${API_URL}`)
    }


}
export default new InformationEntrepriseService();

/*
    @GetMapping("/recherche/{nomCategorie}")
    public ResponseEntity<?> getAllCategoris(@PathVariable String nomCategorie){
        List<CategorieProduit> categorieProduitList = categoryService.getAllCategoryByNomContainingKey(nomCategorie);
        return ResponseEntity.ok(categorieProduitList);
    }


        @PutMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestBody CategorieProduit categorieProduit){
        CategorieProduit categorieProduit1  = categoryService.updateCategory(categorieProduit);
        return ResponseEntity.status(HttpStatus.OK).body(categorieProduit1);
    }*/