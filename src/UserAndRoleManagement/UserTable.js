import React, { useState, useEffect } from 'react';
import AppUserService from '../backEndService/AppUserService'; // Update this import based on your actual service file



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
        <div className='container'>
            <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-primary">Liste des Utilisateurs</h4>
                    <button className="btn btn-success">+Nouveau Utilisateur</button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
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
                        {users.map(user => (
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
            </div>
        </div>
    );
};

export default UserTable;
