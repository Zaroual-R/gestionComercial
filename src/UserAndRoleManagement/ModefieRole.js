import React, { useState } from 'react';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import RoleService from '../backEndService/RoleService';

const ModefieRole = () => {

    const location = useLocation()
    const { state } = location;
    const {idRole, roleName, privilege }= state || {};
    const [formData, setFormData] = useState({
        roleName: roleName,
        previlegeSet: privilege
    });

    const options = [
        { value: 'CREATE_USER', label: 'Créer utilisateur' },
        { value: 'READ_USER', label: 'Lire utilisateur' },
        { value: 'UPDATE_USER', label: 'Mettre à jour utilisateur' },
        { value: 'DELETE_USER', label: 'Supprimer utilisateur' },
        { value: 'CREATE_ROLE', label: 'Créer rôle' },
        { value: 'UPDATE_ROLE', label: 'Mettre à jour rôle' },
        { value: 'READ_ROLE', label: 'Lire rôle' },
        { value: 'DELETE_ROLE', label: 'Supprimer rôle' },
        { value: 'ADD_PRODUIT', label: 'Ajouter produit' },
        { value: 'UPDATE_PRODUIT', label: 'Mettre à jour produit' },
        { value: 'DELETE_PRODUIT', label: 'Supprimer produit' },
        { value: 'GET_PRODUIT', label: 'Obtenir produit' },
        { value: 'ADD_CATEGORY', label: 'Ajouter catégorie' },
        { value: 'UPDATE_CATEGORY', label: 'Mettre à jour catégorie' },
        { value: 'DELETE_CATEGORY', label: 'Supprimer catégorie' },
        { value: 'GET_CATEGORY', label: 'Obtenir catégorie' },
        { value: 'ADD_CLIENT', label: 'Ajouter client' },
        { value: 'UPDATE_CLIENT', label: 'Mettre à jour client' },
        { value: 'GET_CLIENT', label: 'Obtenir client' },
        { value: 'DELETE_CLIENT', label: 'Supprimer client' },
        { value: 'ADD_DEVIS', label: 'Ajouter devis' },
        { value: 'UPDATE_DEVIS', label: 'Mettre à jour devis' },
        { value: 'GET_DEVIS', label: 'Obtenir devis' },
        { value: 'GENERATE_DEVIS', label: 'Générer devis' },
        { value: 'SEND_DEVIS', label: 'Envoyer devis' },
        { value: 'ADD_FACTURE', label: 'Ajouter facture' },
        { value: 'UPDATE_FACTURE', label: 'Mettre à jour facture' },
        { value: 'DELETE_FACTURE', label: 'Supprimer facture' },
        { value: 'GET_FACTURE', label: 'Obtenir facture' },
        { value: 'GENERATE_FACTURE', label: 'Générer facture' },
        { value: 'SEND_FACTURE', label: 'Envoyer facture' },
        { value: 'ADD_COMMANDVENTE', label: 'Ajouter commande de vente' },
        { value: 'UPDATE_COMMANDVENTE', label: 'Mettre à jour commande de vente' },
        { value: 'DELETE_COMMANDVENTE', label: 'Supprimer commande de vente' },
        { value: 'GET_COMMANDVENTE', label: 'Obtenir commande de vente' },
        { value: 'UPLOAD_IMAGE', label: 'Téléverser image' },
        { value: 'GET_IMAGE', label: 'Obtenir image' },
        { value: 'UPDATE_ENTREPRISE', label: 'Mettre à jour entreprise' },
        { value: 'ADD_LIVRAISON', label: 'Ajouter livraison' },
        { value: 'GET_LIVRAISON', label: 'Obtenir livraison' },
        { value: 'UPDATE_LIVRAISON', label: 'Mettre à jour livraison' }
    ];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (selectedOptions) => {
        setFormData({
            ...formData,
            previlegeSet: selectedOptions.map(option => option.value)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RoleService.updateRole(idRole,formData).then(response => response.data).then(data => console.log(data)).catch(error => console.log(error));
    };

    return (
        <div className="container" >
            <div className='row '>
                <div className='col-8'>
                    <form onSubmit={handleSubmit}>
                        <h2>Nouveau Role</h2>
                        <hr></hr>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="roleName">Nom : </label>
                            <input type="text" name="roleName" value={formData.roleName} onChange={handleChange} id="roleName" className="form-control" placeholder='nom de role' />
                        </div>

                        <div className="form-outline mb-4">
                            <label htmlFor="permissions">Permissions :</label>
                            <Select options={options} isMulti value={options.filter(option => formData.previlegeSet.includes(option.value))} onChange={handleSelectChange} />
                        </div>
                        <div>
                            <input type="submit" value="Ajouter" className='btn btn-primary'></input>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="reset" value="Reset" className='btn btn-danger'></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModefieRole;
