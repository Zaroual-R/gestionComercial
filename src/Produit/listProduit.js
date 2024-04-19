import React, { useEffect, useRef, useState } from 'react'
import LignProduit from './LignProduit'
import ProductService from '../backEndService/ProductService';
import CategorieService from '../backEndService/CategorieService';


const ListProduit = () => {
    const [listProduit, setListProduit] = useState([]);
    const searchKeyProduct = useRef('');
    const categorieProduct = useRef('');
    const [ListCategorie, setListCategorie] = useState([]);
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(4); // Nombre de produits par page
    const indexOfLastProduct = currentPage * rowsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
    const currentProducts = listProduit.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(listProduit.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
      };    

    useEffect(() => {
        getAllProductLists();
        getAllCategorie();
    }, []);
    //fonction pour chercher tout les categories
    const getAllCategorie = () => {
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
                console.log("Recherche de produits réussie", response.data)
            })
            .catch(error => {
                console.error("Erreur lors de la recherche de produits ");
            })
    };

    const handleChange = (e) => {
        const searchNameValue = searchKeyProduct.current.value;
        const selectCatValue = categorieProduct.current.value;
        const rechDto = { "idCategorie": selectCatValue, "produitNom": searchNameValue }
        console.log(rechDto);
        if (searchNameValue == '' && selectCatValue == '') {
            getAllProductLists();
        }
        else {
            searchProductList(rechDto);
        }

    }

    const alertError = (msg) =>{
        switch(msg){
          case '':
            return <div></div>;
          case "error":
            return  (
                <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                <span >vous pouvez pas de supprimer ce produite  </span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            )
        }
      }


    const datashow = currentProducts.map((item, key) => <LignProduit key={item.idProduit} id={item.idProduit} refProduit={item.refProd} nom={item.nomProd} prix={item.prixUnitaireHT} categorie={item.categoryName} details={item.details} tva={item.tva} onDelete={getAllProductLists} alert={setAlertMessage}/>)

    return (
        <div className='container mt-2 list-produit'>
            <div className='card ' style={{ maxHeight: 'calc(100vh - 70px)', width: "800" }}>
                <div className="card-header bg-dark">
                   <h3>Liste des produits</h3>
                   {alertError(alertMessage)}
                </div>
                <div className='card-body ' >
                    <form method="get" >
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text " style={{ backgroundColor: '#00FF00' }} ><i className='fas fa-search'></i></div>
                            </div>
                            <input type="text" id="searchKeyProduct" ref={searchKeyProduct} className="form-control col-6" style={{ width: "250px" }} placeholder="Chercher par nom produit" onChange={handleChange} />
                            <div className="input-group-append ">
                                <select className="form-control product-listCategore-serach" id="categorieProduct" ref={categorieProduct} onChange={handleChange}>
                                    <option value="">Toutes les catégories</option>
                                    {ListCategorie.map((item, key) => (<option key={item.idCategorie} value={item.idCategorie}>{item.nomCategorie}</option>))}
                                </select>
                            </div>
                            <div className='col-5'></div>
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
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>TVA</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datashow}
                        </tbody>
                    </table>
                    <br/>
                    <nav>
                        <ul className='pagination'>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className='page-link' onClick={() => paginate(currentPage - 1)}>Previous</button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                    <button className='page-link' onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className='page-link' onClick={() => paginate(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ListProduit;
