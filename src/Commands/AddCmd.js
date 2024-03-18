import React, { useEffect, useState } from 'react'
import LignAddCmd from './LignAddCmd'
import ServiceClient from '../backEndService/ServiceClient';


const AddCmd = () => {
  const [clients,setClients]=useState();


  useEffect(() => {
    getAllClients();
  },[])


  //function to get all clients to specify whish of client want to make an order
  const getAllClients = ()=>{
    ServiceClient.getAllClients()
        .then(response =>{
            setClients(response.data);
            console.log("get all client has done seccessefuly");
        })
        .catch(error =>{
            console.error("error to get clients to add commande",error);
        });
  }
  const datashow = clients?clients.map((item, key) => <LignAddCmd key={key.id} id={item.idClient} nom={item.nomClient} prenom={item.prenomClient} societe={item.societe} pays={item.pays} ville={item.ville} tel={item.tel} />):null;
  return (
    <div className='container mt-2 list-addC-client' style={{ width: '100%' }}>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)' }}>
        <div class="card-header bg-dark">
          <h4>veuillez choisez un clients:<span className='text text-warning  text-md' style={{fontFamily:'Arial',}}> si la commande concerne un nouveau client vous devez le créer en premeier</span></h4>
        </div>
        <div className='card-body' style={{ overflowY: 'auto', width: '100%' }}>
          <form method="get form-list-client">
            <div className='input-group mb-2'>
              <div className="input-group-prepend">
                <div className="input-group-text bg-success">Keyword</div>
              </div>
              <input type="text" className="form-control" style={{ width: "250px" }} placeholder="nom client" />
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
                <th scope="col" style={{ width: "300px", textAlign: "center" }}>Action</th>
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

export default AddCmd;