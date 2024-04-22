import React from "react"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import FactureService from "../backEndService/FactureService";
import LigneListFacture from "./LigneListFacture";

const ListFactures = ()=>{
    const [listFactures, setListFactures] = useState([]);
    const searchKeyword=useRef();
  
  
    useEffect(() => {
      getAllFacture();
    }, []);
    
    console.log("list factures",listFactures)  ;
    const handleChange =(e) =>{
      const searchValue=searchKeyword.current.value;
      const searchDto={"nomClient":searchValue};
      if(searchValue==''){
        getAllFacture();
      }
      else{
        searchedFacture(searchDto);
      }
    }
    //function to get all commandes searched by name of client
    const searchedFacture = (factureDTO) =>{
      FactureService.searchFacture(factureDTO)
        .then(responce =>{
            setListFactures(responce.data);
            console.log("get searched commandes was done");
        })
        .catch(error =>{
          console.error("error to get searched commande",error)
        })
    }
  
    //functin to get all commandes 
    const getAllFacture = (id) => {
      setListFactures(prevListCommande => prevListCommande.filter(item => item.idFacture !== id));
      FactureService.getAllFactures()
        .then(response => {
          setListFactures(response.data);
          console.log("get all factures has bees succed", response.data);
        })
        .catch(error => {
          console.error("error to get all factures", error);
        })
    }
    const datashow = listFactures.map((item, key) => <LigneListFacture idFacture={item.idFacture} idClient={item.idClient} nomClient={item.nomClient} dateFacture={item.dateFacture} dateReelPayement={item.dateReelPayement} datePrevuePayement={item.datePrevuePayement} modPayement={item.modPayement} statusFacture={item.statusFacture} onDelete={getAllFacture}/>)


    return (
        <div className='container mt-2 list-facture'>
          <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)' }}>
            <div class="card-header bg-dark"> <h3>Listes des factures</h3></div>
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
                    <th scope="col" style={{ textAlign: "center" }}>Date de facture</th>
                    <th scope="col" style={{ textAlign: "center" }}>Date prévue de payement</th>
                    <th scope="col" style={{ textAlign: "center" }}>Date réel de payement</th>
                    <th scope="col" style={{ textAlign: "center" }}>mode de payement</th>
                    <th scope="col" style={{ textAlign: "center" }}>status de facture</th>
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

export default ListFactures;