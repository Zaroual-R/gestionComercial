import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceClient from '../backEndService/ServiceClient';
const ModefieClient = () => {
    const nomClientRef = useRef();
    const prenomClientRef = useRef();
    const societeRef = useRef();
    const paysRef = useRef();
    const villeRef = useRef();
    const telRef = useRef();
    const emailRef = useRef();
    const codePostalRef = useRef();
    const codeComptableRef = useRef();
    const addressRef = useRef();
    const rcRef = useRef();
    const cnssRef = useRef();
    let isValide = true;

    const location = useLocation()
    const { state } = location;
    const { idC } = state || {};
 
        const [client, setClient] = useState({
            nomClient: '',
            prenomClient: '',
            societe: '',
            pays: '',
            ville: '',
            tel: '',
            email: '',
            codePostal: '',
            codeComptable: '',
            address: '',
            rc: '',
            cnss: ''
        });
    useEffect(() => {
        ServiceClient.getClient(idC).then(response => {
            const clientData = response.data; // Récupérer les données du client depuis la réponse
            // Mettre à jour l'état avec les données du client
            nomClientRef.current.value = clientData.nomClient;
            prenomClientRef.current.value = clientData.prenomClient;
            societeRef.current.value = clientData.societe;
            paysRef.current.value = clientData.pays;
            villeRef.current.value = clientData.ville;
            telRef.current.value = clientData.tel;
            emailRef.current.value = clientData.email;
            codePostalRef.current.value = clientData.codePostal;
            codeComptableRef.current.value = clientData.codeComptable;
            addressRef.current.value = clientData.address;
            rcRef.current.value = clientData.rc;
            cnssRef.current.value = clientData.cnss;
        }).catch(error => {
            console.log("hhhhhh ", error);
        })
        
    }, []);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); 

    const handleReset = () => {
        const resetFields = [nomClientRef, prenomClientRef, societeRef, paysRef, villeRef, telRef, emailRef, codePostalRef, codeComptableRef, addressRef, rcRef, cnssRef];
        resetFields.forEach(ref => {
            if (ref.current) {
                ref.current.value = '';
            }
        });
        setClient({
            nomClient: '',
            prenomClient: '',
            societe: '',
            pays: '',
            ville: '',
            tel: '',
            email: '',
            codePostal: '',
            codeComptable: '',
            address: '',
            rc: '',
            cnss: ''
        });
        setAlertMessage("");
        setAlertType("");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setClient(prevClient => ({
            ...prevClient,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ServiceClient.updateClient(client, idC)
            .then(response => {
                console.log("Client added successfully", response.data);
                handleReset();
                setAlertMessage("Client successfully added.");
                setAlertType("success");
            })
            .catch(error => {
                console.error("Error adding client", error);
                setAlertMessage("Failed to add client.");
                setAlertType("error");

            });

    };
    const renderAlert = () => {
        if (!alertMessage) return null;
        const alertClass = alertType === "success" ? "alert-success" : "alert-danger";
        return (
            <div className={`alert ${alertClass}`} role="alert">
                {alertMessage}
            </div>
        );
    };

    

    return (
        <div className="container ajouter-four">
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header bg-info text-white">
                        <h3>Add New Client</h3>
                    </div>
                    <div className="card-body">
                    {renderAlert()}
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="nomClient">Nom</label>
                                    <input type="text" className="form-control" name="nomClient" id="nomClient" ref={nomClientRef} placeholder="Nom" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="prenomClient">Prénom</label>
                                    <input type="text" className="form-control" name="prenomClient" id="prenomClient" ref={prenomClientRef} placeholder="Prénom" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="societe">Société</label>
                                    <input type="text" className="form-control" name="societe" id="societe" ref={societeRef} placeholder="Société" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="pays">Pays</label>
                                    <input type="text" className="form-control" name="pays" id="pays" ref={paysRef} placeholder="Pays" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="ville">Ville</label>
                                    <input type="text" className="form-control" name="ville" id="ville" ref={villeRef} placeholder="Ville" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="tel">Téléphone</label>
                                    <input type="tel" className="form-control" name="tel" id="tel" ref={telRef} placeholder="Téléphone" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" ref={emailRef} placeholder="Email" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="codePostal">Code Postal</label>
                                    <input type="text" className="form-control" name="codePostal" id="codePostal" ref={codePostalRef} placeholder="Code Postal" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="codeComptable">Code Comptable</label>
                                    <input type="text" className="form-control" name="codeComptable" id="codeComptable" ref={codeComptableRef} placeholder="Code Comptable" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="address">Adresse</label>
                                    <input type="text" className="form-control" name="address" id="address" ref={addressRef} placeholder="Adresse" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="rc">Registre de Commerce</label>
                                    <input type="text" className="form-control" name="rc" id="rc" ref={rcRef} placeholder="Registre de Commerce" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="cnss">CNSS</label>
                                    <input type="text" className="form-control" name="cnss" id="cnss" ref={cnssRef} placeholder="CNSS" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                
                                    <button type="submit" className="btn btn-primary">Modifier client</button>
                                
                                    <button type="reset" className="btn btn-danger">Effacer</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ModefieClient