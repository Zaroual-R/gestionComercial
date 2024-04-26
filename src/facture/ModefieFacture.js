import React, { useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import FactureService from "../backEndService/FactureService";

const ModefieFacture = ()=>{
    const dateFactureField = useRef();
    const datePrevuePayementField = useRef();
    const dateReelPayementField = useRef();
    const statusFactureField = useRef();
    const modPayementField = useRef();
    
    const location = useLocation();
    const { idFacture, modPayement, dateFacture, datePrevuePayement, dateReelPayement, statusFacture} = location.state || {};
    
    const [formData, setFormData] = useState({
        //idFacture: idFacture,
        modPayement: modPayement,
        dateFacture: dateFacture,
        dateReelPayement: dateReelPayement,
        datePrevuePayement: datePrevuePayement,
        statusFacture: statusFacture,
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        console.log(formData);
    }

    const handleUpdateFacture = (event)=>{
        event.preventDefault();
        FactureService.updateFacture(formData,idFacture).then(response => console.log(response.data)).catch(error => console.log(error));
    }

    const handleReset = (event) => {
        event.preventDefault();
        dateFactureField.current.value="";
        datePrevuePayementField.current.value="";
        dateReelPayementField.current.value="";
        statusFactureField.current.value="";
        modPayementField.current.value="";
    }


    return (
        <div className="container ajouter-cmd-four Myfont">
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header bg-info text-white">
                        <h3>Créer la Facture</h3>
                    </div>
                    <div className="card-body">
                        {/* Reste du formulaire */}
                        <form onSubmit={handleUpdateFacture} onReset={handleReset}>
                            {/* Champs du formulaire */}
                            {/* ... */}
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
                    
                            {/* Boutons */}
                            <div className="form-row">
                                <div className="col-md-12 text-center">
                                    <button type="submit" className="btn btn-primary Myfont me-2">
                                        Enregistrer
                                    </button>
                                    <button type="reset" className="btn btn-danger Myfont">
                                        Effacer
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
export default ModefieFacture;