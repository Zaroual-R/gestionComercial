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
    <div className='container mt-2 Myfont'>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
        <div className="card-header bg-dark">
           <h3 className="text-light">Listes des clients</h3>
        </div>
        <div className='card-body'>
          <form method="get">
            <div className='input-group mb-2'>
              <div className="input-group-prepend">
                <div className="input-group-text bg-success">Keyword</div>
              </div>
              <input type="text" id="searchKeyClient"  ref={searchKeyClient}  className="form-control" placeholder="nom client" onChange={handleChange}/>
            </div>
          </form>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>#ID</th>
                <th scope="col" style={{ textAlign: "center" }}>Nom</th>
                <th scope="col" style={{ textAlign: "center" }}>Prénom</th>
                <th scope="col" style={{ textAlign: "center" }}>Société</th>
                <th scope="col" style={{ textAlign: "center" }}>Pays</th>
                <th scope="col" style={{ textAlign: "center" }}>Ville</th>
                <th scope="col" style={{ textAlign: "center" }}>Tel</th>
                <th scope="col" style={{ textAlign: "center" }}>Email</th>
                <th scope="col" style={{ textAlign: "center" }}>savoir plus</th>
                <th scope="col" style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {datashow}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}

export default ListeClients