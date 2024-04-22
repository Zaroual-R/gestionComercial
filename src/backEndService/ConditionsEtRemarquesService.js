import axios from "axios";

const API_URL='http://localhost:8088/api/termes';

class ConditionsEtRemarquesService{

    createConditionsEtCategories(conditions){
       return  axios.put(`${API_URL}/create`,conditions);
    }
    getConditionsEtCategories(type){
        return axios.get(`${API_URL}/${type}`);
    }

}
export default new ConditionsEtRemarquesService();
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