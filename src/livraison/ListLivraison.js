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
    const datashow = listLivraison.map((item, key) => <LigneListLivraison idLivraison={item.idLivraison} idClient={item.idClient} nomClient={item.nomClient} dateLivraison={item.dateLaivrison} datePrevue={item.datePrevue} dateReception={item.dateReception} adresseLivraison={item.adresseLivraison} statusLivraison={item.statusLivraison} onDelete={getAllLivraison}/>)


    return (
        <div className='container mt-2 list-facture'>
          <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)' }}>
            <div class="card-header bg-dark"> <h3>Listes des livraisons</h3></div>
            <div className='card-body' style={{ overflowY: 'auto', width: '100%' }}>
              <form method="get form-list-client">
                <div className="form-outline mb-4 d-flex align-items-center">
                  <div className='input-group mb-2'>
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-success">Keyword</div>
                    </div>
                    <input type="text" className="form-control" style={{ width: "250px" }} placeholder="nom client" id="searchKeyword" ref={searchKeyword} onChange={handleChange} />
                  </div>
                </div>
              </form>
              <table className="table table-striped" style={{ width: '100%', paddingRight: "0px" }}>
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: "center" }}>#ID</th>  
                    <th scope="col" style={{ textAlign: "center" }}> Nom client</th>
                    <th scope="col" style={{ textAlign: "center" }}>Date de livraison</th>
                    <th scope="col" style={{ textAlign: "center" }}>Date prévue de reception</th>
                    <th scope="col" style={{ textAlign: "center" }}>Date réel de réception</th>
                    <th scope="col" style={{ textAlign: "center" }}>Adresse de livraison</th>
                    <th scope="col" style={{ textAlign: "center" }}>status de livraison</th>
                    <th scope="col" style={{ textAlign: "center" }} colSpan={2}>Action</th>
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

export default ListLivraison;