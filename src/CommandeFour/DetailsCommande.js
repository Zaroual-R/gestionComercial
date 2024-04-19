import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LignCmdFourAjout from '../fournisseur/LignCmdFourAjout';
import CommandeFourService from '../backEndService/CommandeFourService';
import LignCmdFourDetails from './LignCmdFourDetails';
import BonLivFourService from '../backEndService/BonLivFourService';
import FactureFourService from '../backEndService/FactureFourService';
const DetailsCommande = () => {
    const [lignCommandeAfficher, setLignCommandeAfficher] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location || {};
    const idCmd = state.idCmd || {};
    const [commande, setCommande] = useState({});
    const [bonLivDeleted, setBonLivDeleted] = useState(false);
    const [factureDeleted, setFactureDeleted] = useState(false);
    const [stateUpdated,setStatUpdated] =useState(false);
    const [visible, setVisible] = useState(false);
    const etat = useRef();
    const dateSortie = useRef();
    const [stateDto, setStateDto] = useState(
        {
            "etat": '',
            "dateSortie": ''
        }
    )
    //function to get commande
    useEffect(() => {
        if (idCmd) {
            getCommande();
        }
    }, [idCmd]);

    useEffect(() => {
        if (bonLivDeleted) {
            getCommande();
            setBonLivDeleted(false);  // Réinitialiser l'état après la mise à jour
        }
    }, [bonLivDeleted]);

    useEffect(() => {
        if (factureDeleted) {
            getCommande();
            setFactureDeleted(false);
        }
    }, [factureDeleted])
    
    useEffect(()=>{
        if(stateUpdated){
            getCommande();
            setStatUpdated(false);
        }
    },[stateUpdated])
    const getCommande = async () => {
        try {
            const response = await CommandeFourService.getCompletCommande(idCmd);
            setCommande(response.data);
            if (response.data && response.data.idCommande) {
                getLignCommande(response.data.idCommande);
            }
        } catch (error) {
            console.error("error to get commande", error);
        }
    };

    const getLignCommande = async (idCommande) => {
        try {
            const response = await CommandeFourService.getLignCommande(idCommande);
            setLignCommandeAfficher(response.data);
        } catch (error) {
            console.error("error to get all lign commandes", error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    //function to add bon livraison

    const handleAddBonLiv = (idCmd) => {
        navigate("/AjouterBonLivraison", { state: { idCmd } });
    }
    const handleEditBonLiv = (bon, idCmd) => {
        navigate("/ModefierBonLivraisonFour", { state: { bon, idCmd } })
    }

    //function to deleteBonlivraison
    const handleDeleteBonLiv = (idBon) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce bon de livraison ?")) {
            BonLivFourService.deleteBonLivFour(idBon)
                .then(response => {
                    console.log("success to delete bon livraison");
                    setBonLivDeleted(true);  // Indiquer que la suppression a réussi
                })
                .catch(error => {
                    console.error("error to delete bon livraison", error);
                });
        } else {
            console.log("Suppression annulée");
        }
    }
    
    //function to show Document livraison
    const handleDocBonLivraison=(bonLivraison) =>{
        navigate("/LivraisonDocument", { state: {bonLivraison} });
    }


    //la table de la bon livraison
    const tableLivraison = (bon) => {
        if (bon != null) {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center', width:'450px' }}>Date livraison</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' , width:'150px'}}>Qualite livraison</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}>Caché</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' , width:'450px'}}>{formatDate(bon.dateLivraison)}</td>
                            <td style={{ textAlign: 'center' , width:'150px'}}>{bon.qualiteLivraison}</td>
                            <td style={{ textAlign: 'center' }}>{bon.cache ? "OUI" : "NON"}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} >
                                <button className='btn btn-success' onClick={() => { handleEditBonLiv(commande.bonLivraisonFour, commande.idCommande) }}>Modefier</button>&nbsp;&nbsp;
                                <button className='btn btn-danger' onClick={() => { handleDeleteBonLiv(commande.bonLivraisonFour.idbonLivraison) }}>Supprimer</button>&nbsp;&nbsp;
                                <button className='btn btn-dark' onClick={() => { handleDocBonLivraison(commande.bonLivraisonFour) }}>Document</button>
                            </td>
                        </tr>
                    </table>
                </td>
            )
        }
        else {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} >La commande n'a pas encore été livrée.</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} ><button className='btn btn-success' onClick={() => { handleAddBonLiv(commande.idCommande) }}>Ajouter</button></td>
                        </tr>
                    </table>
                </td>
            )
        }
    }

    //function to add facture  
    const handleAddFacture = (idCmd) => {
        navigate("/AjouterFactureFour", { state: { idCmd } });
    }

    //function to edit Facture
    const handleEditFact = (facture, idCmd) => {
        navigate("/ModefierFactureFour", { state: { facture, idCmd } })
    }

    //function to delete facture
    const handleDeleteFact = (idFact) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce facture ?")) {
            FactureFourService.deleteFacture(idFact)
                .then(response => {
                    console.log("success to delete facture");
                    setFactureDeleted(true);
                })
                .catch(error => {
                    console.error("error to delete facture");
                })
        }
    }
    //fonction to download and print document of facture
    const handleShowDocument = (Fact) => {
        navigate("/FactureDocument", { state: { Fact } })
    }

    //la fonction de generation des details de la facture

    const tableFacture = (facture) => {
        if (facture != null) {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}> Date facture</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}> Status paiement</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}> Moyenne reglement</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}>Validité</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>{formatDate(facture.dateFacture)}</td>
                            <td style={{ textAlign: 'center' }}>{facture.statusPaiement}</td>
                            <td style={{ textAlign: 'center' }}>{facture.moyenneReglement}</td>
                            <td style={{ textAlign: 'center' }}>{facture.valide ? "OUI" : "NON"}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} >
                                <button className='btn btn-success' onClick={() => { handleEditFact(commande.factureCmdFour, commande.idCommande) }}>Modefier</button>&nbsp;&nbsp;
                                <button className='btn btn-danger' onClick={() => { handleDeleteFact(commande.factureCmdFour.idFacture) }}>Supprimer</button>&nbsp;&nbsp;
                                <button className='btn btn-dark' onClick={() => { handleShowDocument(commande.factureCmdFour) }}>Document</button>
                            </td>
                        </tr>
                    </table>
                </td>
            )
        }
        else {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} >La commande n'a pas encore été facturé.</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} ><button className='btn btn-success' onClick={() => { handleAddFacture(commande.idCommande) }}>Ajouter</button></td>
                        </tr>
                    </table>
                </td>
            )
        }

    }

    //function to reset form 
    const resetForm = () => {
        etat.current.value = '';
        dateSortie.current.value = '';
    }
    //funciton to hande change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStateDto(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ));
        console.log(stateDto);
    }


    //function to manage commande 
    const manageCommande = (visible) => {
        if (!visible) return null;
        else {
            return (
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row align-items-center">
                            {/* État field with label */}
                            <div className="col-auto d-flex align-items-center">
                                <label htmlFor="etat" className="mr-2" style={{ minWidth: '40px', fontWeight: 'bolder' }}>État:</label>
                                <select className="form-control" id="etat" name="etat" ref={etat} style={{ width: '200px', height: '40px' }}  onChange={handleChange}>
                                    <option disabled selected>Changer l'état ici</option>
                                    <option value="EN_TRANSPORT">En Transport</option>
                                    <option value="LIVREE">Livree</option>
                                    <option value="ANNULE">Annule</option>
                                    <option value="EN_ATTENT">En attent</option>
                                </select>
                                <i class="fas fa-chevron-down" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                            </div>
                            {/* Date Sortie field with label */}
                            <div className="col-auto d-flex align-items-center">
                                <label htmlFor="dateSortie" className="mr-2" style={{ minWidth: '80px', fontWeight: 'bolder' }}>Date Sortie:</label>
                                <input type="date" className="form-control" id="dateSortie" name="dateSortie" ref={dateSortie} style={{ width: '200px', height: '40px' }} onChange={handleChange} />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary" type="submit">Changer</button>
                            </div>
                        </div>
                    </form>

                </div>
            )
        }
    }
    const handleClickManageCommande = () => { setVisible(!visible) }

    //function to handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        CommandeFourService.editState(commande.idCommande,stateDto)
            .then(res =>{
                console.log("la commande a été modefié ");
                resetForm();
                setStatUpdated(true);
            })
            .catch(error =>{console.error("error to update commande")})
    }

    //function to handle document of commande
    const handleDocCommande = (idCmd) =>{
        navigate("/BonCmdDocument",{state:{idCmd}});
    }

    if (!commande && !commande.fournisseur.raisonSocial) {
        return <div>Loading... Please wait.</div>; // Loading page or indicator
    }

    const fournisseurRaisonSocial = commande.fournisseur ? commande.fournisseur.raisonSocial : "Unavailable";

    const datashow = lignCommandeAfficher.map((item, key) => (
        <LignCmdFourDetails key={`${item.idProduit}-${key}`} idProduit={item.idProduit} refProduit={item.refProduit} nomProduit={item.nomProduit} prix={item.prix} quantite={item.quantite} totalHT={item.montantTotalHt} tva={item.tva} totalTTC={item.montantTotalTTC} />
    ));
    return (
        <div className='container mt-2 details-cmd '>
            <div className='card'>
                <div className='card-header bg-dark' style={{ textAlign: 'center' }}>
                    <h3>Details de la commande</h3>
                </div>
                <div className='card-body'>
                    <table className='table '>
                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Reference :</td>
                            <td>{commande.idCommande}</td>
                            <td style={{ fontWeight: 'bolder' }}>Date commande :</td>
                            <td>{formatDate(commande.dateCommande)}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Date prevue :</td>
                            <td>{formatDate(commande.datePrevue)}</td>
                            <td style={{ fontWeight: 'bolder' }}>Date devis :</td>
                            <td>{formatDate(commande.datePrevue)}</td>
                        </tr>

                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Date sortie :</td>
                            <td>{formatDate(commande.dateSortie)}</td>
                            <td style={{ fontWeight: 'bolder' }}>Etat :</td>
                            <td className='badge badge-success'><span >{commande.etat}</span></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Moyenne réglement :</td>
                            <td>{commande.moyenneReglement}</td>
                            <td style={{ fontWeight: 'bolder' }}>Condition réglement :</td>
                            <td>{commande.conditionReglement}</td>
                        </tr>

                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Montant total HT :</td>
                            <td>{commande.montantTotalHT} DH</td>
                            <td style={{ fontWeight: 'bolder' }}>Montant total TTC :</td>
                            <td>{commande.montantTotalTTC} DH</td>
                        </tr>
                        <tr style={{ height: '6px' }}>
                            <td style={{ fontWeight: 'bolder' }}>Fournisseur :</td>
                            <td >{fournisseurRaisonSocial}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>List produits commandé</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <table style={{ width: '100%' }} className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ textAlign: "center" }}>#Reference </th>
                                            <th scope="col" style={{ textAlign: "center" }}>Nom</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Prix</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Quantité</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Total HT</th>
                                            <th scope="col" style={{ textAlign: "center" }}>TVA</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Total TTC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datashow}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <div className="d-flex align-items-center">
                                    <button className="action-button bg-dark" style={{ width: '40%', height: '40px', marginRight: '10px' }} onClick={()=>{handleDocCommande(commande.idCommande)}} >Document</button>
                                    <button className="action-button bg-success" style={{ width: '60%', height: '40px', marginRight: '10px' }} onClick={() => { handleClickManageCommande() }}>Gérer l'état </button>
                                </div>
                            </td>
                            <td colSpan={3}>
                                {manageCommande(visible)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>Detaile de la bon livaraison</td>
                        </tr>
                        <tr>
                            {
                                tableLivraison(commande.bonLivraisonFour)
                            }
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>Detaile de la facture</td>
                        </tr>
                        <tr>
                            {
                                tableFacture(commande.factureCmdFour)
                            }
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    )

}

export default DetailsCommande