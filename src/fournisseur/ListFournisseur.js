import React, { useEffect, useRef, useState } from 'react'
import FournisseurService from '../backEndService/FournisseurService';
import LignFournisseur from './LignFournisseur';
import { useNavigate } from 'react-router-dom';

const ListFournisseur = () => {
    const [listFournisseur, setListFournisseur] = useState([]);
    const navigate = useNavigate();
    const searchKey=useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const indexOfLastFournisseur = currentPage * rowsPerPage;
    const indexOfFirstFournisseur = indexOfLastFournisseur - rowsPerPage;
    const currentFournisseur = listFournisseur.slice(indexOfFirstFournisseur, indexOfLastFournisseur);
    const totalPages = Math.ceil(listFournisseur.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        getAllFournisseur();
    }, [])

    //function to get all fournisseur
    const getAllFournisseur = () => {
        FournisseurService.getAllFournisseurs()
        .then(response => {
            console.log(response.data);
            setListFournisseur(response.data);
        })
        .catch(error => {
          console.error("error to get all fournisseurs", error);
        })
    }

    //function to get all fournisseur searched by key 
    const searchFournisseur = (key) => {
        FournisseurService.chercherFournisseur(key)
            .then(response => {
                console.log(response.data);
                setListFournisseur(response.data);
            })
            .catch(error => {
                console.error("error at seach fournisseur", error);
            })
    }

    //function handle change 
   const handleChange = (e) => {
        const keyValue = searchKey.current.value;
        if (keyValue !== '') {
            searchFournisseur(keyValue);
        }
        else {
            getAllFournisseur();
        }
    }

    const addFournisseur = () =>{
        navigate("/AjouterFournisseur");
    }

    const datashow = currentFournisseur.map((item, key) => <LignFournisseur key={item.idFournisseur} fournisseur={item} onDelete={getAllFournisseur}/>)
    return (
        <div className='container mt-2 list-fournisseur Myfont'>
            <div className='card ' style={{ maxHeight: 'calc(100vh - 90px)', width: "800" }}>
                <div className="card-header bg-dark"> <h3>Consulter les fournisseur</h3></div>
                <div className='card-body ' >
                    <form method="get" >
                        <div className='form-row'>
                            <div className='col-6'>
                                <button className='btn btn-dark' onClick={() =>{addFournisseur()}}><i className='fas fa-plus-circle'/><i className='fas fa-building'/> Ajouter</button>
                            </div>
                            <div className='col-4'>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text "style={{ backgroundColor: '#CDCDC7' }}><i className='fas fa-search'></i></div>
                                    </div>
                                    <input type="text" id="searchKey" ref={searchKey} className="form-control" style={{ width: "250px" }} placeholder="Chercher par raison social de fournisseur" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='col-md-6'></div>
                        </div>
                    </form>
                    <table className="table custom-table" style={{width:'85%'}}>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "30px", textAlign: "center" }}>#referece</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Code comptable</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Raison social</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Responsable</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Savoir plus</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Action</th>
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
        </div>
    )
}

export default ListFournisseur