import React from 'react'
import { useRef, useState, useEffect } from 'react';
import LigneProduitAjout from './LigneProduitAjout';
import { useLocation } from 'react-router-dom';
import ServiceClient from '../backEndService/ServiceClient';
import ProductService from '../backEndService/ProductService';
import ServiceCommande from '../backEndService/ServiceCommande';

const AjouterCmd = () => {
    const dateCmdField = useRef();
    const dateRegField = useRef();
    const statusCmd = useRef();
    const produitField = useRef();
    const quantiteField = useRef();
    const [errors, setErrors] = useState({});
    let isValid = true;
    const location = useLocation();
    const { state } = location;
    const { idC } = state || {};
    const [commmande, setCommande] = useState({ "idClient": idC, "montantTotal": 0, "status": '', "dateReglement": '', "dateCommande": '', "ligneCommande": [] });
    const [lignCommandeAfficher, setLignCommandeAfficher] = useState([]);
    const [lignCommandeEnvoyer, setLignCommandeEnvoyer] = useState([])
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(0);
    const [quantite, setQuantite] = useState(0);
    const [montantTotal, setMontantTotal] = useState(0);
    const [alertMessage,setAlertMessage]=useState("");

    // Remplir automatiquement le champ de date de commande avec la date actuelle
    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        dateCmdField.current.value = today;
        setCommande(prevcmd => (
            {
                ...prevcmd,
                "dateCommande": today,
            }
        ))
        getAllProduct();
    }, []);
    useEffect(() => {
        calculMToatal();
    }, [lignCommandeAfficher])
    /*start form validation function*/
    const validatForm = () => {
        setErrors({});
        const dateRegValue = dateRegField.current.value;
        const produitValue = produitField.current.value;
        const quatiteValue = quantiteField.current.value;
        const statusValue=statusCmd.current.value;
        if (!dateRegValue) { // Vérifier si la chaîne de date est vide
            setErrors(prevState => ({
                ...prevState,
                dateRegField: "La date de règlement est obligatoire"
            }));
            isValid = false;
        } 
        if(dateRegValue) {
            const dateReg = new Date(dateRegValue); // Convertir la chaîne de date en objet Date
            const isValidDate = !isNaN(dateReg.getTime()); // Vérifier si la date est valide
            if (!isValidDate) {
                setErrors(prevState => ({
                    ...prevState,
                    dateRegField: "La date de règlement n'est pas valide"
                }));
                isValid = false;
            }
        }
        if (statusValue.trim() == '') {
            setErrors(prevState => {
                return { ...prevState, ...{ statusCmd: "le champe status est obligatoire" } }
            });
            isValid = false;
        }
        if(lignCommandeEnvoyer.length ==0){
            if (produitValue.trim() == '') {
                setErrors(prevState => {
                    return { ...prevState, ...{ produitField: "le champe ref-produit est obligatoire" } }
                });
                isValid = false;
            }
            if (quatiteValue < 1 || isNaN(quatiteValue)) {
                setErrors(prevState => ({ ...prevState, quantiteField: "quantite doit etre superieue a 1" }));
                isValid = false;
            }
        }
        return isValid;
    }
    //function to delete item of lign commande given id 
    const handleDelete = (id) => {
        setLignCommandeAfficher(prevState => prevState.filter(item => item.idProduit !== id));
        setLignCommandeEnvoyer(prevState =>prevState.filter(item => item.idProduit !==id));
    }
    
    /*end form validation function*/

    //handle reset function 
    const handleReset = (e) => {
        e.preventDefault();
        dateRegField.current.value = '';
        produitField.current.value = '';
        quantiteField.current.value = '';
    }
    const handleReset2 = () =>{
        dateRegField.current.value='';
        produitField.current.value='';
        quantiteField.current.value='';
        statusCmd.current.value='';
        produitField.current.value='';
        quantiteField.current.value='';
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

        setProductId(produitField.current.value);
        setQuantite(quantiteField.current.value);
    }

    //function handle click add product to order
    const handleClickAddProduct = () => {
        ProductService.getProduct(productId)
            .then(response => {
                console.log("success to get command of given id", response.data);
                const lignCmdAfficher = {
                    "idProduit":response.data.idProduit,
                    "refProduit": response.data.refProd,
                    "nomProduit": response.data.nomProd,
                    "prix": response.data.prixUnitaireHT,
                    "quantite": quantite
                };
                const lignCmdEnvoyer = {
                    "idProduit": response.data.idProduit,
                    "quantite": quantite,
                }
                console.log(lignCmdAfficher);
                console.log(lignCmdEnvoyer)

                setLignCommandeAfficher(prevState => ([...prevState, lignCmdAfficher]));
                setLignCommandeEnvoyer(prevState =>( [...prevState, lignCmdEnvoyer]))
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
    const alertOfSucces = () =>{
       return (<div className='alert alert-success ' role="alert">
           la commande a été ajouté avec succés
        </div>)
    }
    //function to return alert of error
    const alertOfErrorProduct = () =>{
        return(
            <div className='alert alert-danger' role="alert">
                veuillez ajouter un ligne de commande
            </div>
        )
    }
    //function to return erro 
    const alertOfError = () =>{
        return(
            <div className='alert alert-danger' role="alert">
                error dans l'ajout de produit
            </div>
        )
    }

    //function to return a correspondant alert
    const alert = (message) =>{
        switch(message){
            case "error":
                return  alertOfError();
            case "success":
                return  alertOfSucces();
            case "errorProduit" :
                return  alertOfErrorProduct();
            default :
                return null;
            
        }
          
    }

    /*handle submit function */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatForm() ) {
            if(lignCommandeEnvoyer.length >0){
                const commandeDto = {
                    "idClient": commmande.idClient,
                    "montantTotal": montantTotal,
                    "status": commmande.status,
                    "dateReglement": commmande.dateReglement,
                    "dateCommande": commmande.dateCommande,
                    "ligneCommandes": lignCommandeEnvoyer // Utilisez lignCommandeEnvoyer pour les données d'envoi
                };
                setLignCommandeAfficher([]); 
                setLignCommandeEnvoyer([]); 
                console.log(commandeDto);
                ServiceCommande.ajouterCommande(commandeDto)
                    .then(response => {
                        handleReset2();
                        setAlertMessage("success");
                        console.log("la commande a été ajoutée avec succès", response.data);
                        console.log(lignCommandeAfficher);
                        console.log(montantTotal);
                        
                    })
                    .catch(error => {
                        console.error("erreur dans l'ajout de commande", error);
                        setAlertMessage("error");
                    })
            }
            else{
                setAlertMessage("errorProduit");
            }
        }
    }

    const datashow = lignCommandeAfficher.map((item, key) => (
        <LigneProduitAjout key={`${item.idProduit}-${key}`} idProduit={item.idProduit} refProduit={item.refProduit} nomProduit={item.nomProduit} prix={item.prix} quantite={item.quantite} onDelete={handleDelete}/>
    ));
        return (
        <div className="container ajouter-cmd">
            <div className='row '>
                <div className='col-7 ajouter-cmd-form' style={{ border: '1px solid #ccc', padding: '20px', paddingBottom: '0px' }}>
                    <form onSubmit={handleSubmit}>
                        <h2>Nouveau commande</h2>
                            {alert(alertMessage)}                        
                        <hr></hr>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="dateCmdField">Date commande :</label>
                            <input type="date" name="dateCommande" id="dateCmdField" className="form-control" ref={dateCmdField} readOnly onChange={handleChange} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="dateRegField">Date regelement :</label>
                            <input type="date" name="dateReglement" id="dateRegField" className="form-control" placeholder='date regelement' ref={dateRegField} onChange={handleChange} />
                            {dispalyErr("dateRegField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label htmlFor="Status">Status commande :</label>
                            <select className="form-control" name="status" id="statusCmd" ref={statusCmd} onChange={handleChange}>
                                <option value=''>select status</option>
                                <option value="TRAITE">traité</option>
                                <option value="ENCOURS" >En cours</option>
                            </select>
                            {dispalyErr("statusCmd")}
                        </div>
                        <div className="form-group">
                            <label htmlFor="produitCommande">Produit :</label>
                            <div className="d-flex align-items-center">
                                <select className="form-control" id="produitField" style={{ width: '220px' }} ref={produitField} onChange={handleChange} >
                                    <option value=''>Select produit-reference</option>
                                    {products.map((item, key) => <option key={item.key} value={item.idProduit}>{item.nomProd}-{item.refProd}</option>)}
                                </select>
                                &nbsp; &nbsp;
                                <input type="number" id="quantiteField" className="form-control" placeholder="Quantité" style={{ width: '140px' }} ref={quantiteField} onChange={handleChange} />
                                &nbsp; &nbsp;
                                <button type="button" className='btn btn-info ms-2' onClick={handleClickAddProduct}>Ajouter</button>
                            </div>
                            <div>
                                {dispalyErr("produitField")}
                                {dispalyErr("quantiteField")}
                            </div>
                        </div>

                        <span className="badge bg-dark mb-4 p-3">Montant total: {montantTotal} &nbsp;&nbsp;MAD</span>

                        <div>
                            <input type="submit" value="Ajouter cmd" className='btn btn-primary btn-ajouter-cmd'></input>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="reset" value="Reset" className='btn btn-danger btn-reset-cmd' onClick={handleReset}></input>
                        </div>
                    </form>
                </div>
                <div className='col-5'>
                    <div className='container mt-2'>
                        <div className='card' style={{ maxHeight: 'calc(100vh - 90px)' }}>
                            <div className="card-header bg-dark"> <h4>Listes des produits commandés</h4></div>
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

export default AjouterCmd;
