import React, { useEffect, useRef, useState } from 'react'
import LignCmdFour from './LignCmdFour';
import FournisseurService from '../backEndService/FournisseurService';
import CommandeFourService from '../backEndService/CommandeFourService';
import Loader from '../components/Loader';

const ListCmdFour = () => {
    const [listFournisseur, setListFournisseur] = useState([]);
    const [listCommandes, setListCommandes] = useState([]);
    const searchKeyCommande = useRef();
    const idFournisseur = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const indexOfLastCmdFournisseur = currentPage * rowsPerPage;
    const indexOfFirstCmdFournisseur = indexOfLastCmdFournisseur - rowsPerPage;
    const currentCmdFournisseur = listCommandes.slice(indexOfFirstCmdFournisseur, indexOfLastCmdFournisseur);
    const totalPages = Math.ceil(listCommandes.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getAllFournisseur();
        getAllCommande();
    }, [])

    const getAllFournisseur = () => {
        FournisseurService.getAllFournisseurs()
            .then(response => {
                setListFournisseur(response.data);
                console.log("get all fournisseur was succed")
            })
            .catch(error => {
                console.error("error to get all fournisseur", error);
            })
    }

    const rechercheCmd = (searchdto) => {
        CommandeFourService.recherche(searchdto)
            .then(response => {
                setListCommandes(response.data);
                console.log("get search commmandes was succed");
            })
            .catch(error => {
                console.error("error to get search commandes", error);
            })
    }

    //function to get all Commandes 

    const getAllCommande = () => {
        CommandeFourService.getAllCommande()
            .then(response => {
                setListCommandes(response.data);
                setLoader(true)
                console.log("get all commande was succed");
            })
            .catch(error => {
                console.error("error to get allfournisseur ", error);
            })
    }

    //function handle chage 
    const handleChange = () => {
        const idCmdValue = searchKeyCommande.current.value;
        const idFour = idFournisseur.current.value;
        const searchDto = { 'idCommande': idCmdValue, 'idFournisseur': idFour };
        console.log(searchDto);
        if (idCmdValue == '' && idFour == '') {
            getAllCommande();
        }
        else {
            rechercheCmd(searchDto);
        }


    }

    const ajouterCommande =() =>{
        Navigate("/CommandeFournisseur");
    }
    /*
                                    <div className="form-group mb-2">
                                    <div className='col-4'></div>
                                    <div className="input-group-prepend ">
                                        <div className="input-group-text " style={{ backgroundColor: '#00FF00'}} ><i className='fas fa-search' ></i></div>
                                    </div>
                                    <input type="text" id="searchKeyCommande" ref={searchKeyCommande} className="form-control" style={{width: "200px" }} placeholder="chercher par reference" onChange={handleChange} />
                                    <div className="input-group-append">
                                        <select className="form-control product-listCategore-serach" idFournisseur="idFournisseur" ref={idFournisseur} onChange={handleChange}>
                                            <option value="">Toutes les fournisseur</option>
                                            {listFournisseur.map((item, key) => (<option key={item.idFournisseur} value={item.idFournisseur}>{item.raisonSocial}</option>))}
                                        </select>
                                    </div>
                                </div>






    */

    const datashow = currentCmdFournisseur.map((item, key) => <LignCmdFour key={item.idCommande} commande={item} onDelete={getAllCommande} />)
    return (
        <div>
            {!loader ? <div>...loading</div> :
                <div className='container mt-2 list-produit'>
                    <div className='card ' style={{ maxHeight: 'calc(100vh - 100px)', width: "800" }}>
                        <div className="card-header bg-dark"> <h3>List commandes fournisseur </h3></div>
                        <div className='card-body ' >
                            <form method="get"  >
                                <div className='input-group mb-2'>
                                    <div className='col-6'>
                                        <button className='btn btn-primary' onClick={() => ajouterCommande()}><i class="fas fa-plus-circle" /><i class="fas fa-shopping-cart" />Ajoute</button>
                                    </div>
                                    <div style={{width: '64px'}}>

                                    </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text " style={{ backgroundColor: '#CDCDC7' }} ><i className='fas fa-search'></i></div>
                                    </div>
                                    <input type="text" id="searchKeyCommande" ref={searchKeyCommande} className="form-control col-2" style={{ width: "200px" }} placeholder=" Chercher par réference" onChange={handleChange} />
                                    <div className="input-group-append position-relative ">
                                        <select className="form-control product-listCategore-serach" id="idFournisseur" ref={idFournisseur} onChange={handleChange}>
                                            <option value="">Toutes les fournisseur</option>
                                            {listFournisseur.map((item, key) => (<option key={item.idFournisseur} value={item.idFournisseur}>{item.raisonSocial}</option>))}
                                        </select>
                                        <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                                    </div>
                                </div>

                            </form>
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ textAlign: "center" }}>#Reference </th>
                                        <th scope="col" style={{ textAlign: "center" }}>Date Commande</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Fournisseur</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Details</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datashow}
                                </tbody>
                            </table>
                            <br />
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
                </div>}
        </div>
    )
}

export default ListCmdFour