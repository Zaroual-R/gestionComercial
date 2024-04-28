import React, { useEffect, useRef, useState } from 'react'
import LignAddDevis from './LignAddDevis'
import ServiceClient from '../backEndService/ServiceClient';


const AddDevis = () => {
  const [clients, setClients] = useState([]);
  const searchKeyClient = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Nombre de produits par page
  const indexOfLastClient = currentPage * rowsPerPage;
  const indexOfFirstClient = indexOfLastClient - rowsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(clients.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    getAllClients();
  }, [])


  //function to get all clients to specify whish of client want to make an order
  const getAllClients = () => {
    ServiceClient.getAllClients()
      .then(response => {
        setClients(response.data);
        console.log("get all client has done seccessefuly");
      })
      .catch(error => {
        console.error("error to get clients to add commande", error);
      });
  }

  const searchedClients = (key) => {
    ServiceClient.rechercheClients(key)
      .then(response => {
        console.log("success to get all client with name contain :" + key, response.data);
        setClients(response.data);
      })
      .catch(error => {
        console.error("error to get clients searched", error);
      })
  }

  const handleChange = (e) => {
    const searchValue = searchKeyClient.current.value;
    const searchDto = { "nomClient": searchValue };
    if (searchValue == '') {
      getAllClients();
    }
    else {
      searchedClients(searchDto);
    }
  }

  const datashow = currentClients ? currentClients.map((item, key) => <LignAddDevis key={key.id} id={item.idClient} nom={item.nomClient} prenom={item.prenomClient} societe={item.societe} pays={item.pays} ville={item.ville} tel={item.tel} />) : null;
  return (
    <div className='container mt-2 list-client Myfont' style={{ width: '100%' }}>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)' }}>
        <div class="card-header cardHeader text-white">
          <h4>veuillez choisez un clients:<span className='text text-warning  text-md' style={{ fontFamily: 'Arial', }}> si la commande concerne un nouveau client vous devez le créer en premeier</span></h4>
        </div>
        <div className='card-body cardBody' style={{ overflowY: 'auto', width: '100%' }}>
          <form method="get form-list-client">
            <div className='form-row'>
              <div className='col-8'>
              </div>
              <div className='col-4'>
                <div className='input-group mb-2'>
                  <div className="input-group-prepend">
                    <div className="input-group-text bg-success"><i className='fas fa-search'></i></div>
                  </div>
                  <input type="text" id="searchKeyClient" ref={searchKeyClient} className="form-control" style={{ width: "250px" }} placeholder="Nom client" onChange={handleChange} />
                </div>
              </div>
              <div className='col-md-6'></div>
            </div>
          </form>
          <table className="custom-table " style={{ width: '100%', paddingRight: "0px" }}>
            <thead>
              <tr>
                <th scope="col" style={{ width: "80px", textAlign: "center" }}>#Réference</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Nom</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Prénom</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Société</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Pays</th>
                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Ville</th>
                <th scope="col" style={{ width: "140px", textAlign: "center" }}>Tel</th>
                <th scope="col" style={{ width: "80px", textAlign: "center" }}>Action</th>
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


export default AddDevis;