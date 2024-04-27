import React, { useState, useEffect } from 'react';
import AppUserService from '../backEndService/AppUserService';


const UserTable = () => {
    const [users, setUsers] = useState([]); // Assuming 'users' is the state for your user data

    useEffect(() => {
        // You should replace this with actual API call to fetch users
        AppUserService.getAllUsers().then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.error("Error fetching users: ", error);
        });
    }, []);

    // Function to handle when the "Edit" button is clicked
    const handleEdit = (userId) => {
        // Logic to handle user edit
        console.log("Edit user with ID: ", userId);
    };

    // Function to handle when the "Delete" button is clicked
    const handleDelete = (userId) => {
        // Logic to handle user delete
        console.log("Delete user with ID: ", userId);
    };

    return (
<div className='container mt-2 list-user Myfont'>
            <div className='card ' style={{ maxHeight: 'calc(100vh - 90px)', overflow: 'auto' }}>
                <div className="card-header bg-dark">
                    <h3 className="text-white">Liste des Utilisateurs</h3>
                </div>
                <div className='card-body ' >
                    <button className='btn btn-dark mb-3' onClick={() => {/* navigate to add user page */}}>
                        <i className='fas fa-plus-circle' /> Ajouter Utilisateur
                    </button>
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                                <th>Adresse</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user.id)} className="btn btn-primary mr-2">
                                            <i className='fas fa-edit' /> Modifier
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="btn btn-danger">
                                            <i className='fas fa-trash' /> Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserTable;
