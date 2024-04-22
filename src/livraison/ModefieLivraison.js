import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import LivraisonService from "../backEndService/LivraisonService";

const ModefieLivraison = () => {
    const adresseLivraisonField = useRef();
    const dateLivraisonField = useRef();
    const datePrevueField = useRef();
    const dateReceptionField = useRef();
    const statusLivraisonField = useRef();
    const location = useLocation();
    const {idLivraison, idClient, dateLivraison, datePrevue, dateReception, statusLivraison, adresseLivraison} = location.state;
    console.log("ID Livraison:", idLivraison);  // Ceci vous aidera à déboguer si l'ID est passé correctement
    const [deliveryData, setDeliveryData] = useState({
        adresseLivraison: adresseLivraison,
        dateLaivrison: dateLivraison,
        datePrevue: datePrevue,
        dateReception: dateReception,
        statusLivraison: statusLivraison
    });

    const handleChange = (event) => {
        setDeliveryData({
            ...deliveryData,
            [event.target.name]: event.target.value
        });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        LivraisonService.updateLivraison(deliveryData, idLivraison).then(response => console.log(response.data)).catch(error => console.log(error))
        
    };
    const handleReset = (event) => {
        event.preventDefault();
        adresseLivraisonField.current.value="";
        dateLivraisonField.current.value="";
        datePrevueField.current.value="";
        dateReceptionField.current.value="";
        statusLivraisonField.current.value="";
        
    };

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y ajouter-livraison">
            <div className="card mb-4">
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '5px' }}>
            <div className="card-header mb-4 d-flex justify-content-between border-bottom-1 shadow-sm bg-light align-items-center">
                <h3 className="mb-0 text-dark font-bold">Modifier la livraison</h3>
            </div>
        <form onSubmit={handleUpdate}>
            <div className="container"></div>
            <div className="form-group">
                <label htmlFor="adresseLivraison">Adresse de Livraison:</label>
                <input
                    type="text"
                    className="form-control"
                    id="adresseLivraison"
                    name="adresseLivraison"
                    ref={adresseLivraisonField}
                    value={deliveryData.adresseLivraison}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateLaivrison">Date de Livraison:</label>
                <input
                    type="date"
                    className="form-control"
                    id="dateLaivrison"
                    name="dateLaivrison"
                    ref={dateLivraisonField}
                    value={deliveryData.dateLaivrison}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="datePrevue">Date Prévue:</label>
                <input
                    type="date"
                    className="form-control"
                    id="datePrevue"
                    name="datePrevue"
                    ref={datePrevueField}
                    value={deliveryData.datePrevue}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateReception">Date de Réception:</label>
                <input
                    type="date"
                    className="form-control"
                    id="dateReception"
                    name="dateReception"
                    ref={dateReceptionField}
                    value={deliveryData.dateReception}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="statusLivraison">Statut de Livraison:</label>
                <select
                    className="form-control"
                    id="statusLivraison"
                    name="statusLivraison"
                    ref={statusLivraisonField}
                    value={deliveryData.statusLivraison}
                    onChange={handleChange}
                >
                    <option value="">Sélectionnez un statut</option>
                    <option value="EXPEDIEE">Expédiée</option>
                    <option value="LIVREE">Livrée</option>
                    <option value="EN_RETARD">Retardée</option>
                    <option value="EN_LIVRAISON">en livraison</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="reset" className="btn btn-danger" onClick={handleReset}>Effacer</button>
        </form>
        </div>
        </div>
        </div>
        </div>
    );
}
export default ModefieLivraison;