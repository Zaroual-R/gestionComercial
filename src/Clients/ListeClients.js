import React, { useEffect, useRef, useState } from 'react'
import LignClient from './LignClient'
import ServiceClient from '../backEndService/ServiceClient';


const ListeClients = () => {

  const [listClient, setListClient] = useState([]);
  const searchKeyClient=useRef();

  useEffect(() => {
    getAllClients();
  }, [])

  //function to get all clients
  const getAllClients = () => {
    ServiceClient.getAllClients()
      .then(responce => {
        setListClient(responce.data);
        console.log("get the list of client with success", responce.data);
      })
      .catch(error => {
        console.error("error to get the list of clients")
      })
  }

  //function to get all client searched by nom client
  const searchedClients = (key) =>{
     ServiceClient.rechercheClients(key)
        .then(response =>{
            console.log("success to get all client with name contain :"+key ,response.data);
            setListClient(response.data);
        })
        .catch(error =>{
          console.error("error to get clients searched",error);
        })
  }
  
  const handleChange =(e) =>{
    const searchValue=searchKeyClient.current.value;
    const searchDto={"nomClient":searchValue};
    if(searchValue==''){
      getAllClients();
    }
    else{
      searchedClients(searchDto);
    }
  }

  const datashow = listClient.map((item, key) => <LignClient key={item.idClient} id={item.idClient} nom={item.nomClient} prenom={item.prenomClient} societe={item.societe} pays={item.pays} ville={item.ville} tel={item.tel} email={item.email} codePostal={item.codePostal} onDelete={getAllClients} />)

  return (
    <div className='container mt-2 list-client' style={{ width: '100%' }}>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)' }}>
        <div class="card-header bg-dark"> <h3>Listes des clients</h3></div>
        <div className='card-body' style={{ overflowY: 'auto', width: '100%' }}>
          <form method="get form-list-client">
            <div className='input-group mb-2'>
              <div className="input-group-prepend">
                <div className="input-group-text bg-success">Keyword</div>
              </div>
              <input type="text" id="searchKeyClient" ref={searchKeyClient} className="form-control"  placeholder="nom client" onChange={handleChange}/>
            </div>
          </form>
          <table className="table table-striped" style={{ width: '100%', paddingRight: "0px" }}>
            <thead>
              <tr>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>#ID</th>
                <th scope="col" style={{ width: "90px", textAlign: "center" }}>Nom</th>
                <th scope="col" style={{ width: "90px", textAlign: "center" }}>Prenom</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Société</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Pays</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Ville</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Tel</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Email</th>
                <th scope="col" style={{ width: "90px", textAlign: "center" }}>Code postal</th>
                <th scope="col" style={{ width: "400px", textAlign: "center" }}>Action</th>
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

export default ListeClients