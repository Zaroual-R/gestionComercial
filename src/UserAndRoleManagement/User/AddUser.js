import React from 'react'
import '../AddRole.css'
const AddUser = ()=>{
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
                                    <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Prénom" />
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="lastName">Nom</label>
                                    <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Nom" />
                                </div>
    
                                {/* Contact Information */}
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" />
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Téléphone</label>
                                    <input type="tel" className="form-control" name="phoneNumber" id="phoneNumber" placeholder="Téléphone" />
                                </div>
    
                                {/* Address */}
                                <div className="form-group">
                                    <label htmlFor="address">Adresse</label>
                                    <input type="text" className="form-control" name="address" id="address" placeholder="Adresse" />
                                </div>
    
                                {/* Account Details */}
                                <div className="form-group">
                                    <label htmlFor="password">Mot de Passe</label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Mot de Passe" />
                                </div>
    
                                {/* Buttons */}
                                <button type="submit" className="btn btn-primary">Ajouter</button>
                                <button type="reset" className="btn btn-danger">Effacer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AddUser;