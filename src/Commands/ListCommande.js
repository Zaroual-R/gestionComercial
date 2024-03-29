import React, { useEffect, useRef, useState } from 'react'
import LignListCommande from './LignListCommand'
import ServiceCommande from '../backEndService/ServiceCommande';


const ListCommande = () => {
  const [listCommande, setListCommande] = useState([]);
  const searchKeyword=useRef();


  useEffect(() => {
    getAllCommande();
  }, []);
  
  console.log("list commnds",listCommande)  ;
  const handleChange =(e) =>{
    const searchValue=searchKeyword.current.value;
    const searchDto={"nomClient":searchValue};
    if(searchValue==''){
      getAllCommande();
    }
    else{
      searchedCommande(searchDto);
    }
  }
  //function to get all commandes searched by name of client
  const searchedCommande = (cmdDto) =>{
    ServiceCommande.searchCommande(cmdDto)
      .then(responce =>{
          setListCommande(responce.data);
          console.log("get searched commandes was done");
      })
      .catch(error =>{
        console.error("error to get searched commande",error)
      })
  }

  //functin to get all commandes 
  const getAllCommande = () => {
    ServiceCommande.getAllCommande()
      .then(response => {
        setListCommande(response.data);
        console.log("get all commandes has bees succed", response.data);
      })
      .catch(error => {
        console.error("error to get all commandes", error);
      })
  }
  //function to formate the date 
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 
  const datashow = listCommande.map((item, key) => <LignListCommande key={item.idCommand} id={item.idCommande} idClient={item.idClient} nomClient={item.nomClient} dateCmd={item.dateCommande} dateReglement={item.dateReglement} montantTotal={item.montantTotal} status={item.status} onDelete={getAllCommande}/>)
  return (
    <div className='container mt-2 list-commande'>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)' }}>
        <div class="card-header bg-dark"> <h3>Listes des commandes</h3></div>
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
                <th scope="col" style={{ textAlign: "center" }}>Date cmd</th>
                <th scope="col" style={{ textAlign: "center" }}>Date regelement</th>
                <th scope="col" style={{ textAlign: "center" }}>Montant total</th>
                <th scope="col" style={{ textAlign: "center" }}>status</th>
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

export default ListCommande;