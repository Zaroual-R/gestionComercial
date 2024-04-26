import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LivraisonService from "../backEndService/LivraisonService";
import LigneListLivraison from "./LigneListLivraison";
import { useRef } from "react";

const ListLivraison = () => {

    const [listLivraison, setListLivraison] = useState([]);
    const searchKeyword=useRef();
  
  
    useEffect(() => {
      getAllLivraison();
    }, []);
    
    //console.log("list factures",listFactures)  ;
    const handleChange =(e) =>{
      const searchValue=searchKeyword.current.value;
      const searchDto={"nomClient":searchValue};
      if(searchValue==''){
        getAllLivraison();
      }
      else{
        searchedLivraison(searchDto);
      }
    }
    //function to get all commandes searched by name of client
    const searchedLivraison = (livraisonDto) =>{
      LivraisonService.searchLivraison(livraisonDto)
        .then(responce =>{
            setListLivraison(responce.data);
            console.log("get searched commandes was done");
        })
        .catch(error =>{
          console.error("error to get searched commande",error)
        })
    }
    const updateLivraisonStatus = (idLivraison, newStatus) => {
      const statusLivraisonDto = {
        statusLivraison: newStatus
      }
      // Appeler le backend pour mettre à jour le statut
      LivraisonService.updateLivraisonStatus(idLivraison, statusLivraisonDto)
        .then((response) => {
          // Mise à jour de l'état local si nécessaire
          // Peut-être une nouvelle récupération de toutes les livraisons
          
          getAllLivraison();
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du statut de la livraison', error);
        });
    };
  
    //functin to get all commandes 
    const getAllLivraison = (id) => {
      setListLivraison(prevListLivraison => prevListLivraison.filter(item => item.idLivraison !== id));
      LivraisonService.getAllLivraisons()
        .then(response => {
          setListLivraison(response.data);
          console.log("get all livraisons has bees succed", response.data);
        })
        .catch(error => {
          console.error("error to get all livraisons", error);
        })
    }
    const datashow = listLivraison.map((item, key) => <LigneListLivraison idLivraison={item.idLivraison} idClient={item.idClient} nomClient={item.nomClient} dateLivraison={item.dateLaivrison} datePrevue={item.datePrevue} dateReception={item.dateReception} adresseLivraison={item.adresseLivraison} statusLivraison={item.statusLivraison} onDelete={getAllLivraison} onUpdateStatus={updateLivraisonStatus}/>)


    return (
<div className='container mt-2 Myfont'>
    <div className='card ' style={{ maxHeight: 'calc(100vh - 90px)', overflow: 'auto' }}>
        <div className="card-header bg-dark">
            <h3 className="text-light">Listes des livraisons</h3>
        </div>
        <div className='card-body '>
            <form method="get">
                <div className='form-row align-items-center'>
                    <div className='col'>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text bg-success"><i className='fas fa-search'></i></div>
                            </div>
                            <input type="text" className="form-control" style={{ width: "250px" }} placeholder="Chercher par nom de client" id="searchKeyword" ref={searchKeyword} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </form>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th style={{ textAlign: "center" }}>#ID</th>  
                        <th style={{ textAlign: "center" }}>Nom client</th>
                        <th style={{ textAlign: "center" }}>Date de livraison</th>
                        <th style={{ textAlign: "center" }}>Date prévue de reception</th>
                        <th style={{ textAlign: "center" }}>Date réel de réception</th>
                        <th style={{ textAlign: "center" }}>Adresse de livraison</th>
                        <th style={{ textAlign: "center" }}>Status de livraison</th>
                        <th style={{ textAlign: "center" }} colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {datashow}
                </tbody>
            </table>
            {/* Pagination can go here */}
        </div>
    </div>
</div>

    
      )
}

export default ListLivraison;