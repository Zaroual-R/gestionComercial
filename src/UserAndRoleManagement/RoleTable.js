import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleService from '../backEndService/RoleService';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RoleTable = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(1); // Nombre de produits par page
  const indexOfLastRole = currentPage * rowsPerPage;
  const indexOfFirstRole = indexOfLastRole - rowsPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(roles.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Define your colors at the top of the file or in a separate style file
  const colors = {
    edit: '#FFC107',
    delete: '#DC3545',
    addButton: '#28A745',
    dropdown: '#343A40',
    tableHeader: '#6c757d',
    cardBackground: '#F8F9FA'
  };

  // Use these colors in your inline styles or className styles

  useEffect(() => {
    RoleService.getAllRoles().then(response => response.data).then(data => setRoles(data)).catch(error => console.log(error));
  }, [])

  const handleDelete = (roleId) => {
    RoleService.deleteRole(roleId).then(() => {
      RoleService.getAllRoles()
        .then(response => response.data)
        .then(data => setRoles(data))
        .catch(error => console.log(error))
    })
  }

  const handleEdit = (roleId, roleName, privilege) => {
    navigate("/ModifierRole", { state: { roleId, roleName, privilege } });
  }


  const handleNewRole = () => {
    navigate("/AddRole");
  }

  return (
    <div className='container  Myfont list-client'>
      <div className='card ' style={{ maxHeight: 'calc(100vh - 90px)', overflow: 'auto' }}>
        <div className="card-header bg-info">
          <h3 className="text-light">Tous Les Rôles</h3>
        </div>
        <div className='card-body cardBody' >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button onClick={handleNewRole} className="btn btn-dark">
              <i className='fas fa-plus-circle'/>&nbsp; Nouveau Role
            </button>
          </div>
          <div >
            <table className=" custom-table">
              <thead className="thead-dark">
                <tr>
                  <th style={{ width: "20%", textAlign: "center" }}>Nom</th>
                  <th style={{ width: "70%", textAlign: "center", fontWeight: "bold" }}>Permissions</th>
                  <th style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentRoles.map(role => (
                    <tr key={role.idRole}>
                      <td style={{textAlign:"center",fontWeight:"bold"}}>{role.roleName}</td>
                      <td>
                        {role.previlegeSet.map((privilege, index) => (
                          <span key={index} className='badge bg-warning m-1'>{privilege}</span>
                        ))}
                      </td>
                      <td style={{ width: "100px", textAlign: "center" }}>
                        <div className="dropdown " >
                          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" >
                            Actions
                          </button>
                          <div className="dropdown-menu" style={{ backgroundColor: '#F7ED12  ', fontWeight: "bolder" }} aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={() => handleEdit(role.id, role.roleName, role.previlegeSet)} >
                              <i className="fas fa-edit"></i> Modifier
                            </button>
                            <button className="dropdown-item" onClick={() => { handleDelete(role.id) }}>
                              <i className="fas fa-trash"></i> Supprimer
                            </button>

                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
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
    </div>
  );
}

export default RoleTable;
