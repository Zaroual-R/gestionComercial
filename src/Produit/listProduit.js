import React, { useEffect, useRef, useState } from 'react'
import LignProduit from './LignProduit'
import ProductService from '../backEndService/ProductService';
import CategorieService from '../backEndService/CategorieService';


const ListProduit = () => {
    const [listProduit, setListProduit] = useState([]);
    const searchKeyProduct = useRef('');
    const categorieProduct = useRef('');
    const [ListCategorie, setListCategorie] = useState([]);
    
    useEffect(() => {
        getAllProductLists();
        getAllCategorie();
    },[]);    
    //fonction pour chercher tout les categories
    const getAllCategorie =() =>{
        CategorieService.getAllCategorie()
        .then(responce => {
            setListCategorie(responce.data);
            console.log("Liste des catégories récupérée avec succès")
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des catégories de produits");
        })

    }
    
    //fonction pour chercher tout les produit 
    const getAllProductLists = () => {
        ProductService.getAllProducts()
            .then(responce => {
                setListProduit(responce.data);
                console.log("Liste des produits:", responce.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la liste des produits");
            })
    }
    //function pour chrcher produits par nom 
    const searchProductList = (rechDto) => {
        ProductService.searchProducts(rechDto)
            .then(response => {
                setListProduit(response.data);
                console.log("Recherche de produits réussie",response.data)
            })
            .catch(error => {
                console.error("Erreur lors de la recherche de produits ");
            })
    };

    const handleChange = (e) => {
        const searchNameValue = searchKeyProduct.current.value;
        const selectCatValue = categorieProduct.current.value;
        const rechDto={"idCategorie":selectCatValue,"produitNom":searchNameValue}
        console.log(rechDto);
        if (searchNameValue == '' && selectCatValue == '') {
            getAllProductLists();
        }
        else {
            searchProductList(rechDto);
        }

    }


    const datashow = listProduit.map((item, key) => <LignProduit key={item.idProduit} id={item.idProduit} refProduit={item.refProd} nom={item.nomProd} prix={item.prixUnitaireHT} categorie={item.categoryName} details={item.details} onDelete={getAllProductLists} />)
    
    return (
        <div className='container mt-2 list-produit'>
            <div className='card ' style={{ maxHeight: 'calc(100vh - 100px)', width: "800" }}>
                <div className="card-header bg-dark"> <h3>Liste des produits</h3></div>
                <div className='card-body ' style={{ overflowY: 'auto' }}>
                    <form method="get" >
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text bg-success">Keyword</div>
                            </div>
                            <input type="text" id="searchKeyProduct" ref={searchKeyProduct} className="form-control" style={{ width: "250px" }} placeholder="chercher par nom produit" onChange={handleChange} />
                            <div className="input-group-append">
                                <select className="form-control product-listCategore-serach"  id="categorieProduct" ref={categorieProduct} onChange={handleChange}>
                                    <option value="">Toutes les catégories</option>
                                    {ListCategorie.map((item, key) => (<option key={item.idCategorie} value={item.idCategorie}>{item.nomCategorie}</option>))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>#ID</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Référence</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Nom</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Prix</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Catégorie</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Détails</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datashow}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListProduit;
