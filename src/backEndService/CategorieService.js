import axios from "axios";

const API_URL='http://localhost:8088/api/category';

class CategorieService{

    createCategorie(categorie){
       return  axios.post(`${API_URL}/create`,categorie);
    }

    updateCategorie(categorie){
        return  axios.put(`${API_URL}/update`, categorie);
    }

    deleteCategorie(id){
       return   axios.delete(`${API_URL}/delete/${id}`);
    }

    getCategorie(id){
       return  axios.get(`${API_URL}/${id}`);
    }

    getAllCategorie(){
       return  axios.get(`${API_URL}/all`);
    }

    searchCategories(key) {
        return axios.post(`${API_URL}/recherche`, { "nomCategorie": key });
    }
}
export default new CategorieService();
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