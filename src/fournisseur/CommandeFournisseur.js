import React, { useEffect, useRef, useState } from 'react'
import ProductService from '../backEndService/ProductService';
import LignCmdFourAjout from './LignCmdFourAjout';
import FournisseurService from '../backEndService/FournisseurService';
import CommandeFourService from '../backEndService/CommandeFourService';
import { useNavigate } from 'react-router-dom';

const CommandeFournisseur = () => {
    const navigate = useNavigate();
    const dateCommande = useRef();
    const idFournisseur = useRef();
    const dateDevis = useRef();
    const datePrevue = useRef();
    const conditionReglement = useRef();
    const produitField = useRef();
    const quantite = useRef();
    const moyenneReglement = useRef();
    const [productList, setProductList] = useState([]);
    const [listFournisseur, setListFournisseur] = useState([]);
    const [errors, setErrors] = useState({});
    let isValid = true;
    const [alertMessage, setAlertMessage] = useState("");
    const [productId, setProductId] = useState(0);
    const [quantiteValue, setQuantiteValue] = useState(0);
    const [lignCommandeAfficher, setLignCommandeAfficher] = useState([]);
    const [lignCommandeEnvoyer, setLignCommandeEnvoyer] = useState([]);
    const [montantTotalHT, setMontantTotalHT] = useState(0);
    const [montantTotalTTC, setMontantTotalTTC] = useState(0);
    const [isLoad,setLoad] =useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [idFour,setIdFour] =useState('');
    const addCmd="successCmd";
    const [commande, setCommande] = useState({
        "idFournisseur": "",
        "dateCommande": "",
        "datePrevue": "",
        "dateSortie":"",
        "conditionReglement": "",
        "moyenneReglement": "",
        "etat": "",
        "dateDevis": "",
        "ligneCmdFourDtos": [],

    })

    const closeAlert = () => {
        setShowAlert(false);
    };

    //function to reset form 
    const resetForm = () => {
        idFournisseur.current.value = '';
        dateDevis.current.value = '';
        datePrevue.current.value = '';
        conditionReglement.current.value = '';
        produitField.current.value = '';
        quantite.current.value = '';
        moyenneReglement.current.value = '';
    }
    useEffect(() => {
        calculMToatalHT();
        calculMTotalTTC();
    }, [lignCommandeAfficher])

    useEffect(() => {
        getAllFournisseur();
    }, []);

    useEffect(() =>{
        if(idFour!=''){
            getAllProduct(idFour)
        }
    },[idFour])
    
    useEffect(() =>{
        if(isLoad){
            setLoad(false)
        }
    },[isLoad])
    //function to get all product list 
    const getAllProduct = (id) => {
       FournisseurService.getProducts(id)
            .then(response => {
                console.log("get all product to add cmd four is success");
                setProductList(response.data);
                setLoad(true);
                console.log(productList)
            })
            .catch(error => {
                console.error("error to get product list ");
            })
    }

    //function to get all fournisseure
    const getAllFournisseur = () => {
        FournisseurService.getAllFournisseurs()
            .then(response => {
                console.log("get all fournisseur was succed");
                setListFournisseur(response.data);
            })
            .catch(error => {
                console.error("error to get list fournisseur", error);
            })
    }


    //function to validate form 
    const validatForm = () => {
        setErrors({});
        const fournisseurValue = idFournisseur.current.value
        const dateDevisValues = dateDevis.current.value
        const datePrevueValue = datePrevue.current.value
        const MoyenneRegValue = moyenneReglement.current.value

        if (!dateDevisValues) { // Vérifier si la chaîne de date est vide
            setErrors(prevState => ({
                ...prevState,
                dateDevis: "La date de reception de devis est obligatoire"
            }));
            isValid = false;
        }
        if (!datePrevueValue) { // Vérifier si la chaîne de date est vide
            setErrors(prevState => ({
                ...prevState,
                datePrevue: "La date prevue est obligatoire"
            }));
            isValid = false;
        }

        if (fournisseurValue.trim() == '') {
            setErrors(prevState => {
                return { ...prevState, ...{ idFournisseur: "vueillez specifier le  fournisseur" } }
            });
            isValid = false;
        }

        if (MoyenneRegValue.trim() == '') {
            setErrors(prevState => {
                return { ...prevState, ...{ moyenneReglement: "vuillez specifier la moyenne de reglement" } }
            });
            isValid = false;
        }
        return isValid;
    }
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
        console.log(commande);

        setProductId(produitField.current.value);
        setQuantiteValue(quantite.current.value);
        console.log(productList)
        setIdFour(idFournisseur.current.value);

    }

    //handle click add product 
    const handleClickAddProduct = () => {
        ProductService.getProduct(productId)
            .then(response => {
                console.log("success to get command of given id", response.data);
                const refProduitV = response.data.refProd;
                const nomProduitV = response.data.nomProd;
                const prixV = response.data.prixAchatHT;
                const quantiteV = quantiteValue;
                const tva = response.data.tva;
                const lignCmdAfficher = {
                    "refProduit": refProduitV,
                    "nomProduit": nomProduitV,
                    "prix": prixV,
                    "quantite": quantiteV,
                    "tva": tva,
                    "totalHT": prixV * quantiteV,
                    "totalTTC": (prixV * quantiteV) * (1 + (tva / 100)),
                };
                const lignCmdEnvoyer = {
                    "idProduit": response.data.idProduit,
                    "quantite": quantiteValue,
                }
                console.log(lignCmdAfficher);
                console.log(lignCmdEnvoyer)

                setLignCommandeAfficher(prevState => ([...prevState, lignCmdAfficher]));
                setLignCommandeEnvoyer(prevState => ([...prevState, lignCmdEnvoyer]));
                calculMToatalHT();
                calculMTotalTTC();
            })
            .catch(error => {
                console.error("error to get product", error);
            });
    }

    //function to calculate montant total ht of order line
    const calculMToatalHT = () => {
        let MontantTotl = 0
        for (const lign of lignCommandeAfficher) {
            const montantLign = lign.prix * lign.quantite;
            MontantTotl += montantLign;
        }
        setMontantTotalHT(MontantTotl);
    }

    //function to calculate montant total ttc of order line
    const calculMTotalTTC = () => {
        let MontantTotl = 0
        for (const lign of lignCommandeAfficher) {
            const montantLign = (lign.prix * lign.quantite) * (1 + (lign.tva / 100));
            MontantTotl += montantLign;
        }
        setMontantTotalTTC(MontantTotl);
    }

    //function to handle delete row of table basing on its reference
    const handleDelete = (id) => {
        setLignCommandeAfficher(prevState => prevState.filter(item => item.idProduit !== id));
        setLignCommandeEnvoyer(prevState => prevState.filter(item => item.idProduit !== id));
    }
    //function confirmatio to forward to pdf 
    const forwardSuccessPage = (idCommande, idFournisseur,msg) => {
        navigate("/CreateEmail", { state: { idCommande, idFournisseur,msg } });
    }

    //function to handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatForm()) {
            if (lignCommandeEnvoyer.length > 0) {
                const commandeFourDto = {
                    "idFournisseur": commande.idFournisseur,
                    "dateCommande": commande.dateCommande,
                    "datePrevue": commande.datePrevue,
                    "dateSortie": "",
                    "conditionReglement": commande.conditionReglement,
                    "moyenneReglement": commande.moyenneReglement,
                    "etat": "EN_ATTENT",
                    "montantTotalHT": montantTotalHT,
                    "montantTotalTTC": montantTotalTTC,
                    "dateDevis": commande.dateDevis,
                    "ligneCmdFourDtos": lignCommandeEnvoyer,
                }
                console.log("four dto", commandeFourDto);
                CommandeFourService.createCommandeFour(commandeFourDto)
                    .then(response => {
                        console.log("la commande a été ajoutée avec succès", response.data);
                        forwardSuccessPage(response.data.idCommande, commande.idFournisseur,addCmd);
                    })
                    .catch(error => {
                        setAlertMessage("error");
                        console.error("error to add four commande", error);
                    })
            }
            else {
                setAlertMessage("errorProduit")
            }
        }
    }

    const alertOfError = () => {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                <span >error dans l'ajoute de commande </span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
    const alertOfErrorProduit = () => {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif' }}>
                <span>veuillez ajouter au moins un produit </span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
    const alert = (alertMessage) => {
        switch (alertMessage) {
            case "errorProduit":
                return alertOfErrorProduit();
            case "error":
                return alertOfError();
            case "":
                return null;
        }
    }


    const datashow = lignCommandeAfficher.map((item, key) => (
        <LignCmdFourAjout key={`${item.idProduit}-${key}`} idProduit={item.idProduit} refProduit={item.refProduit} nomProduit={item.nomProduit} prix={item.prix} quantite={item.quantite} totalHT={item.totalHT} tva={item.tva} totalTTC={item.totalTTC} onDelete={handleDelete} />
    ));
    return (
        <div className="container ajouter-cmd-four Myfont">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-info text-white">
                            <h3>Nouveau commande fournisseur</h3>
                            {alert(alertMessage)}
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateCommande">Date commande</label>
                                        <input type="date" className="form-control" name="dateCommande" id="dateCommande" ref={dateCommande} placeholder="date dommande" onChange={handleChange} required  />
                                    </div>
                                    <div className="form-group col-md-6 position-relative">
                                        <label htmlFor="idFournisseur">Fournisseur</label>
                                        <select className="form-control" name="idFournisseur" id="idFournisseur" ref={idFournisseur} onChange={handleChange} >
                                            <option value=''>Select Raison Social </option>
                                            {listFournisseur.map((item, key) => <option key={item.key} value={item.idFournisseur}>{item.raisonSocial}</option>)}
                                        </select>
                                        <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '74%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                                        {dispalyErr("idFournisseur")}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateDevis">Date réception devis</label>
                                        <input type="date" className="form-control" name='dateDevis' id="dateDevis" ref={dateDevis} placeholder="Date reception devis" onChange={handleChange} required />
                                        {dispalyErr("dateDevis")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="datePrevue">date de réception prévue</label>
                                        <input type="date" className="form-control" name='datePrevue' id="datePrevue" ref={datePrevue} placeholder="Date recue prevue" onChange={handleChange} required />
                                        {dispalyErr("datePrevue")}
                                    </div>
                                </div>
                                {/* Répétez les lignes ci-dessus pour les autres champs de votre classe Fournisseur */}
                                <div className="form-row">
                                    <div className="form-group col-md-6 position relative">
                                        <label htmlFor="moyenneReglement">Moyenne  Règlement</label>
                                        <select className="form-control moyReg" name="moyenneReglement" id="moyenneReglement" ref={moyenneReglement} onChange={handleChange}  >
                                            <option value=''>Choisir le mode paiement souhaité</option>
                                            <option value='CACH_ON_DELIVRY'>Paiement à la livraison</option>
                                            <option value='TRAITEBANCAIRE'>Traite bancaire</option>
                                            <option value='VAIREMENTBANCAIRE'>Virement bancaire</option>
                                            <option value='CHEQUE'>Chèque</option>
                                        </select>
                                        <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '56%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                                        {dispalyErr("moyenneReglement")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="conditionReglement">Condition Règlement</label>
                                        <textarea type="" className="form-control" name='conditionReglement' id="conditionReglement" ref={conditionReglement} placeholder="Veuillez ajouter une nate(if any)" onChange={handleChange} required />

                                    </div>
                                </div>
                                <h4>List des produit à commander</h4>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="produitField">Produit</label>
                                        <select className="form-control" id="produitField" ref={produitField} onChange={handleChange} >
                                            <option value=''>Select Produit-Reference</option>
                                            {productList.map((item, key) => <option key={item.key} value={item.idProduit}>{item.nomProd}-{item.refProd}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="quantite">Quantité</label>
                                        <input type="number" className="form-control" id="quantite" ref={quantite} placeholder=" Saisir la quantité de  produit" onChange={handleChange} />
                                    </div>
                                    <div className='form-group col-md-4 align-self-end'>
                                        <button type="button" className="btn btn-dark" onClick={handleClickAddProduct}><i className='fas fa-plus'></i> &nbsp;&nbsp;Ajouter</button>
                                    </div>
                                    <table class="table table-bordered  table-striped" >
                                        <thead >
                                            <tr>
                                                <th scope="col" style={{ textAlign: "center" }}>Refernce </th>
                                                <th scope="col" style={{ textAlign: "center" }}>Nom</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Prix U</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Quantite</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Total HT</th>
                                                <th scope="col" style={{ textAlign: "center" }}>TVA</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Total TTC</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Supprimer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datashow}
                                            <tr>
                                                <td colSpan={6}></td>
                                                <td>total HT</td>
                                                <td>{montantTotalHT}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6}></td>
                                                <td>total TTC</td>
                                                <td>{montantTotalTTC}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <button type="submit" className="btn btn-primary Myfont" ><i className='fas fa-plus'></i> Ajouter commande</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommandeFournisseur