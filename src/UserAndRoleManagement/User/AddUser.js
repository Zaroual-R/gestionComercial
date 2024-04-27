import React from 'react'
import '../AddRole.css'
import AppUserService from '../../backEndService/AppUserService';
import RoleService from '../../backEndService/RoleService';
import { useState } from 'react';
import { useEffect } from 'react';
const AddUser = ()=>{
    const [roles, setRoles] = useState([])
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        roleId: '', // assuming you want to store role ID
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    useEffect(() => {
        RoleService.getAllRoles() 
                    .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error("Error fetching roles:", error);
            });
    }, []);

    

        // Handle form submit
        const handleSubmit = (e) => {
            e.preventDefault();
            AppUserService.addUser(user)
                .then(response => {
                    console.log('User created successfully:', response.data);
                    // Optionally clear the form or handle further actions here
                    // e.g., reset the form state if needed:
                     setUser({
                         firstname: '',
                         lastname: '',
                         email: '',
                         phoneNumber: '',
                         address: '',
                         password: '',
                     });
                })
                .catch(error => {
                    console.error('Failed to create user:', error);
                    alert('Failed to create user');
                    // Optionally handle additional error logic here
                });
        };
    const handleReset = () => {
        setUser({
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            address: '',
            password: '',
        });
    };
    return (
        <div className="container ajouter-four">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h3>Créer Utilisateur</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                {/* Basic Information */}
                                <div className="form-group">
                                    <label htmlFor="firstName">Prénom</label>
                                    <input type="text" className="form-control" onChange={handleChange} value={user.firstname} name="firstname" id="firstName" placeholder="Prénom" />
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="lastName">Nom</label>
                                    <input type="text" className="form-control" onChange={handleChange} value={user.lastname} name="lastname" id="lastName" placeholder="Nom" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select
                                        className="form-control"
                                        name="roleId"
                                        id="role"
                                        value={user.roleId}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map((role) => (
                                            <option key={role.idRole} value={role.idRole}>
                                                {role.roleName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
    
                                {/* Contact Information */}
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" onChange={handleChange} value={user.email} name="email" id="email" placeholder="Email" />
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Téléphone</label>
                                    <input type="tel" className="form-control" onChange={handleChange} value={user.phoneNumber} name="phoneNumber" id="phoneNumber" placeholder="Téléphone" />
                                </div>
    
                                {/* Address */}
                                <div className="form-group">
                                    <label htmlFor="address">Adresse</label>
                                    <input type="text" className="form-control" onChange={handleChange} value={user.address} name="address" id="address" placeholder="Adresse" />
                                </div>
    
                                {/* Account Details */}
                                <div className="form-group">
                                    <label htmlFor="password">Mot de Passe</label>
                                    <input type="password" className="form-control" onChange={handleChange} value={user.password} name="password" id="password" placeholder="Mot de Passe" />
                                </div>

                                {/* Buttons */}
                                <div className="text-center">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary me-2"><i className='fas fa-plus-circle'/>Soumettre</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AddUser;