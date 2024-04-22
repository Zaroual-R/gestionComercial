// CreateInvoiceForm.js
import React from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import FactureService from '../backEndService/FactureService';

const CreateFacture = () => {
    const dateFactureField = useRef();
    const datePrevuePayementField = useRef();
    const dateReelPayementField = useRef();
    const statusFactureField = useRef();
    const modPayementField = useRef();

    const location = useLocation();
    const idCommand = location.state ? location.state.idCommand : null;
    

    console.log("l id command : ",idCommand )


    const [formData, setFormData] = useState({
        //idFacture: idFacture,
        modPayement: '',
        dateFacture: '',
        dateReelPayement: '',
        datePrevuePayement: '',
        statusFacture: '',
    
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        console.log(formData);
    }

    const handleReset = (event) => {
        event.preventDefault();
        dateFactureField.current.value="";
        datePrevuePayementField.current.value="";
        dateReelPayementField.current.value="";
        statusFactureField.current.value="";
        modPayementField.current.value="";
    }
    const handleFacture = (event)=>{
        event.preventDefault();
        FactureService.ajouterFacture(formData,idCommand).then(response => console.log(response.data)).catch(error => console.log(error));
    }

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y ajouter-facture">
            <div className="card mb-4">
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '5px' }}>
            <div className="card-header mb-4 d-flex justify-content-between border-bottom-1 shadow-sm bg-light align-items-center">
                <h3 className="mb-0 text-dark font-bold">Créer la Facture</h3>
            </div>
            <form>
                    <div className="mb-3">
                        <label htmlFor="modPayement" className="form-label">Mode de Paiement:</label>
                        <select 
                        name="modPayement"
                        className="form-select"
                        id="modPayement"
                        value={formData.modPayement}
                        onChange={handleInputChange}
                        >
                            <option value=''>séléctionnez le mode de paiement : </option>
                            <option value="CHEQUE">Chèque</option>
                            <option value="ESPECE">Espèce</option>
                            <option value="CARTE_BANCAIRE">Carte bancaire</option>
                            <option value="VIREMENT_BANCAIRE">Virement Bancaire</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateFacture" className="form-label">Date de Facture:</label>
                        <input 
                        name="dateFacture"
                        type="date"
                        className="form-control"
                        id="dateFacture"
                        ref={dateFactureField}
                        value={formData.dateFacture}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="datePrevuePayement" className="form-label">Date prévue de paiement:</label>
                        <input 
                        name="datePrevuePayement"
                        type="date"
                        className="form-control"
                        id="datePrevuePayement"
                        ref={datePrevuePayementField}
                        value={formData.datePrevuePayement}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateReelPayement" className="form-label">Date réelle de paiement:</label>
                        <input 
                        name="dateReelPayement"
                        type="date"
                        className="form-control"
                        id="dateReelPayement"
                        ref={dateReelPayementField}
                        value={formData.dateReelPayement}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="statusFacture" className="form-label">Statut de la facture:</label>
                        <select 
                        name="statusFacture"
                        id="statusFacture"
                        ref={statusFactureField}
                        className="form-select"
                        onChange={handleInputChange}
                        value={formData.statusFacture}
                        >
                        <option value=''>Sélectionnez un statut</option>
                        <option value="NON_PAYEE">Non payée</option>
                        <option value="PAYEE">Payée</option>
                        <option value="EN_RETARD">En retard</option>
                        </select>
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary me-2" onClick={handleFacture} >Enregistrer</button>
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>Effacer</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    );
}

export default CreateFacture;
