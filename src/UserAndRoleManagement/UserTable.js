import React, { useState, useEffect, useRef } from 'react';
import AppUserService from '../backEndService/AppUserService';
import { useNavigate } from 'react-router-dom';



const UserTable = () => {
    const [users, setUsers] = useState([]);
    const searchUserKey = useRef();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5); // Nombre de produits par page
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {

        AppUserService.getAllUsers().then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.error("Error fetching users: ", error);
        });
    }, []);


    const handleEdit = (userId) => {

        console.log("Edit user with ID: ", userId);
    };


    const handleDelete = (userId) => {

        console.log("Delete user with ID: ", userId);
    };

    const addUser = () => {
        navigate("/AddUser");
    }
    const handleChange = () => {

    }

    return (
        <div className='container list-client'>
            <div className="card">
                <div className="card-header cardHeader" >
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <h4 className="text-primary">Liste des Utilisateurs</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body cardBody">
                    <form method="get">
                        <div className='form-row'>
                            <div className='col-8'>
                                <button className='btn btn-dark' onClick={() => { addUser() }}><i className='fas fa-plus-circle' />&nbsp;<i className='fas fa-user' /> Ajouter un utilisateur</button>
                            </div>
                            <div className='col-4'>
                                <div className='input-group mb-2'>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text " style={{ backgroundColor: '#CDCDC7' }}><i className='fas fa-search'></i></div>
                                    </div>
                                    <input type="text" id="searchUserKey" ref={searchUserKey} className="form-control" style={{ width: "250px" }} placeholder="Chercher par nom utilisateur ici" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='col-md-6'></div>
                        </div>
                    </form>
                    <div className='mt-1'>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                    <th>Téléphone</th>
                                    <th>Adresse</th>
                                    <th>Rôle</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.lastName}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.address}</td>
                                        <td>{user.role && user.role.name}</td>
                                        <td>
                                            <button onClick={() => handleEdit(user.id)} className="btn btn-primary mr-2">Modifier</button>
                                            <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
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
};

export default UserTable;
