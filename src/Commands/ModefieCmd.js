import React from 'react'
import LigneProduitAjout from './LigneProduitAjout';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceClient from '../backEndService/ServiceClient';
import ProductService from '../backEndService/ProductService';
import ServiceCommande from '../backEndService/ServiceCommande';

const ModefieCmd = () => {
    const dateCmdField1 = useRef();
    const dateRegField1 = useRef();
    const statusCmd1 = useRef();
    const produitField1 = useRef();
    const quantiteField1 = useRef();
    const [errors, setErrors] = useState({});
    let isValid = true;
    const location = useLocation();
    const { state } = location;
    const { idC, idClient,dateCommandeC, dateReglementC, montantTotalC, statusC } = state || {};
    const [commmande, setCommande] = useState({ "idClient": idClient, "montantTotal": montantTotalC, "status":statusC, "dateReglement":dateReglementC, "dateCommande":dateCommandeC , "ligneCommande": [] });
    const [lignCommandeAfficher, setLignCommandeAfficher] = useState([]);
    const [lignCommandeEnvoyer, setLignCommandeEnvoyer] = useState([])
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(0);
    const [quantite, setQuantite] = useState(0);
    const [montantTotal, setMontantTotal] = useState(montantTotalC);
    const [alertMessage, setAlertMessage] = useState("");

    //console.log("this is the state",state);
    // Remplir automatiquement le champ de date de commande avec la date actuelle
    // Remplir automatiquement le champ de date de commande avec la date actuelle
    useEffect(() => {
        initialiseFields();
        getAllProduct();
        getLignesCommande();
    }, []);

    useEffect(() => {
        calculMToatal();
    }, [lignCommandeAfficher])
    //function to formate the date 
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    
    //function to get all lignd commande  of commande
    const getLignesCommande = () => {
        ServiceCommande.getLignesCommande(idC)
            .then(response => {
                const lignesAfficheTemp = [];
                const lignesEnvoyerTemp = [];
                setLignCommandeAfficher([]);
                setLignCommandeEnvoyer([]);
                for (const item of response.data) {
                    const lignAffiche = {
                        "idProduit": item.produit.idProduit,
                        "refProduit": item.produit.refProd,
                        "nomProduit": item.produit.nomProd,
                        "prix": item.produit.prixUnitaireHT,
                        "quantite": item.quantite
                    }
                    const lignEnvoyer = {
                        "idProduit": item.produit.idProduit,
                        "quantite": item.quantite
                    }
                    lignesAfficheTemp.push(lignAffiche);
                    lignesEnvoyerTemp.push(lignEnvoyer);
                }
                setLignCommandeAfficher(prevState => ([...prevState, ...lignesAfficheTemp]));
                setLignCommandeEnvoyer(prevState => ([...prevState, ...lignesEnvoyerTemp]));
                console.log("get all lignes of commandes was done", response.data);
            })
            .catch(error => {
                console.error("error to get lines of order ", error);
            })
    }
    
    //function to initialise  the value of fields 
    const initialiseFields = () => {
        dateRegField1.current.value = formatDate(dateReglementC);
        dateCmdField1.current.value = formatDate(dateCommandeC);
        statusCmd1.current.value = statusC;
    }
    
    //function empty fields 
    const handleReset2 = () => {
        dateRegField1.current.value = '';
        produitField1.current.value = '';
        statusCmd1.current.value = '';
        produitField1.current.value = '';
        quantiteField1.current.value = '';
    }

    //function to delete item of lign commande given id 
    const handleDelete = (id) => {
        setLignCommandeAfficher(prevState => prevState.filter(item => item.idProduit !== id));
        setLignCommandeEnvoyer(prevState => prevState.filter(item => item.idProduit !== id));
    }

    /*start form validation function*/
    const validatForm = () => {
        setErrors({});
        const dateRegValue = dateRegField1.current.value;
        const produitValue = produitField1.current.value;
        const quatiteValue = quantiteField1.current.value;
        const statusValue=statusCmd1.current.value;
        if (!dateRegValue) { // Vérifier si la chaîne de date est vide
            setErrors(prevState => ({
                ...prevState,
                dateRegField1: "La date de règlement est obligatoire"
            }));
            isValid = false;
        } 
        if(dateRegValue) {
            const dateReg = new Date(dateRegValue); // Convertir la chaîne de date en objet Date
            const isValidDate = !isNaN(dateReg.getTime()); // Vérifier si la date est valide
            if (!isValidDate) {
                setErrors(prevState => ({
                    ...prevState,
                    dateRegField1: "La date de règlement n'est pas valide"
                }));
                isValid = false;
            }
        }
        if (statusValue.trim() == '') {
            setErrors(prevState => {
                return { ...prevState, ...{ statusCmd1: "le champe status est obligatoire" } }
            });
            isValid = false;
        }
        if(lignCommandeEnvoyer.length == 0){
            if (produitValue.trim() == '') {
                setErrors(prevState => {
                    return { ...prevState, ...{ produitField1: "le champe ref-produit est obligatoire" } }
                });
                isValid = false;
            }
            if (quatiteValue < 1 || isNaN(quatiteValue)) {
                setErrors(prevState => ({ ...prevState, quantiteField1: "quantite doit etre superieue a 1" }));
                isValid = false;
            }
        }
        return isValid;
    }

    /*end form validation function*/

    //handle reset function 
    const handleReset = (e) => {
        e.preventDefault();
        dateRegField1.current.value = '';
        produitField1.current.value = '';
        quantiteField1.current.value = '';
        statusCmd1.current.value = '';
    }

    //start get error of a given field
    const getError = (field) => {
        return errors[field];
    }

    //start has error of a given field 
    const hasError = (field) => {
        return (getError(field) !== undefined);
    }

    //start displayErr function 
    // start displayErr function 
    const dispalyErr = (field) => {
        const element = document.querySelector(`#${field}`);
        if (hasError(field)) {
            element.style.border = "1px solid red";
            return (
                <div>
                    <div className='text text-danger'>{getError(field)}</div>
                </div>
            );
        }
        if (element !== null) {
            element.removeAttribute('style');
        }
        return null; // Ne renvoie rien si aucune erreur n'est présente
    }

    /*handle change function*/
    const handleChange = (event) => {
        validatForm();
        setAlertMessage("");
        const { name, value } = event.target
        setCommande(prevCommande => ({
            ...prevCommande,
            [name]: value
        }));
        console.log(commmande);

        setProductId(produitField1.current.value);
        setQuantite(quantiteField1.current.value);
    }

    //function handle click add product to order
    const handleClickAddProduct = () => {
        ProductService.getProduct(productId)
            .then(response => {
                console.log("success to get command of given id", response.data);
                const lignCmdAfficher = {
                    "idProduit": response.data.idProduit,
                    "refProduit": response.data.refProd,
                    "nomProduit": response.data.nomProd,
                    "prix": response.data.prixUnitaireHT,
                    "quantite": quantite,
                };
                const lignCmdEnvoyer = {
                    "idProduit": response.data.idProduit,
                    "quantite": quantite,
                };
                console.log("lignaffic cmd ajouter",lignCmdAfficher);
                console.log("lignenv ajouter",lignCmdEnvoyer)

                setLignCommandeAfficher(prevState => ([...prevState, lignCmdAfficher]));
                setLignCommandeEnvoyer(prevState => ([...prevState, lignCmdEnvoyer]))
            })
            .catch(error => {
                console.error("error to get product", error);
            });

    }

    //function to get all product 
    const getAllProduct = () => {
        ProductService.getAllProducts()
            .then(responce => {
                setProducts(responce.data);
                console.log("success to get all product in add cmd componant");
            })
            .catch(error => {
                console.log("error to get all product ", error);
            })
    }

    //function to calculate montant total of order line
    const calculMToatal = () => {
        let MontantTotl = 0
        for (const lign of lignCommandeAfficher) {
            const montantLign = lign.prix * lign.quantite;
            MontantTotl += montantLign;
        }
        setMontantTotal(MontantTotl);
    }

    //function to return alert of success
    const alertOfSucces = () => {
        return (<div className='alert alert-success ' role="alert">
            la commande a été modifié avec succés
        </div>)
    }

    //function to return alert of error
    const alertOfErrorProduct = () => {
        return (
            <div className='alert alert-danger' role="alert">
                veuillez ajouter un ligne de commande
            </div>
        )
    }

    //function to return erro 
    const alertOfError = () => {
        return (
            <div className='alert alert-danger' role="alert">
                error dans la modefication de produit de produit
            </div>
        )
    }

    //function to return a correspondant alert
    const alert = (message) => {
        switch (message) {
            case "error":
                return alertOfError();
            case "success":
                return alertOfSucces();
            case "errorProduit":
                return alertOfErrorProduct();
            default:
                return null;

        }

    }

    /*handle submit function */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatForm()) {
            if (lignCommandeEnvoyer.length > 0) {
                const commandeDto = {
                    "idClient": commmande.idClient,
                    "montantTotal": montantTotal,
                    "status": commmande.status,
                    "dateReglement": formatDate(commmande.dateReglement),
                    "dateCommande":formatDate( commmande.dateCommande),
                    "ligneCommandes": lignCommandeEnvoyer // Utilisez lignCommandeEnvoyer pour les données d'envoi
                };
                console.log("commande dto",commandeDto);
                ServiceCommande.updateCommande(commandeDto,idC)
                    .then(response => {
                        handleReset2();
                        setAlertMessage("success");
                        console.log("la commande a été modefié avec succès", response.data);
                        console.log(lignCommandeAfficher);
                        console.log(montantTotal);
                        setLignCommandeAfficher([]);
                        setLignCommandeEnvoyer([]);
                    })
                    .catch(error => {
                        console.error("erreur dans l'modeficaion de commande", error);
                        setAlertMessage("error");
                    })
            }
            else {
                setAlertMessage("errorProduit");
            }
        }
    }

    const datashow = lignCommandeAfficher.map((item, key) => (
        <LigneProduitAjout key={`${item.idProduit}-${key}`} idProduit={item.idProduit} refProduit={item.refProduit} nomProduit={item.nomProduit} prix={item.prix} quantite={item.quantite} onDelete={handleDelete} />
    ));
    return (
        <div className="container modefier-cmd">
            <div className='row '>
                <div className='col-7 ajouter-cmd-form' style={{ border: '1px solid #ccc', padding: '20px', paddingBottom: '0px' }}>
                    <form onSubmit={handleSubmit}>
                        <h2>Modefier commande</h2>
                        {alert(alertMessage)}
                        <hr></hr>
                        <input type="text" hidden />
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="dateCmdField1">Date commande :</label>
                            <input type="date" name="dateCommande" id="dateCmdField1" className="form-control" readOnly ref={dateCmdField1} onChange={handleChange} />
                            {dispalyErr("dateCmdField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="dateRegField1">Date regelement :</label>
                            <input type="date" name="dateReglement" id="dateRegField1" className="form-control" placeholder='date regelement' ref={dateRegField1} onChange={handleChange} />
                            {dispalyErr("dateCmdField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label htmlFor="Status">Status commande :</label>
                            <select className="form-control" name="status" id="statusCmd1" ref={statusCmd1} onchange={handleChange}>
                                <option value=''>select status</option>
                                <option value='TRAITE'>traité</option>
                                <option value='ENCOURS'>En cours</option>
                                <option value='ANNULE'>Annulé</option>
                            </select>
                            {dispalyErr("statusCmd1")}
                        </div>
                        <div className="form-group">
                            <label htmlFor="produitCommande">Produit :</label>
                            <div className="d-flex align-items-center">
                                <select className="form-control" id="produitField1" style={{ width: '300px' }}  ref={produitField1} onChange={handleChange} >
                                    <option value=''>Select produit-reference</option>
                                    {products.map((item, key) => <option key={item.key} value={item.idProduit}>{item.nomProd}-{item.refProd}</option>)}
                                </select>
                                &nbsp; &nbsp;
                                <input type="text" id="quantiteField1" className="form-control" placeholder="Quantité" style={{ width: '100px' }} ref={quantiteField1} onChange={handleChange} />
                                &nbsp; &nbsp;
                                <button className='btn btn-info ms-2' type="button" onClick={handleClickAddProduct}>Ajouter</button>
                            </div>
                            <div>
                                {dispalyErr("produitField1")}
                                {dispalyErr("quantiteField1")}
                            </div>
                        </div>
                        <span className="badge bg-dark mb-4 p-3">Montant total: {montantTotal} &nbsp;&nbsp;MAD</span>
                        <div>
                            <input type="submit" value="Modefier " className='btn btn-primary btn-ajouter-cmd'></input>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="reset" value="Reset" className='btn btn-danger btn-reset-cmd' onClick={handleReset} ></input>
                        </div>
                    </form>
                </div>
                <div className='col-5'>
                    <div className='container mt-2'>
                        <div className='card' style={{ maxHeight: 'calc(100vh - 90px)' }}>
                            <div className="card-header bg-dark "> <h4>Listes des produits commandés</h4></div>
                            <div className='card-body' style={{ overflowY: 'auto' }}>
                                <table className="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Reference</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">prix</th>
                                            <th scope="col">Quantite</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datashow}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default ModefieCmd;
