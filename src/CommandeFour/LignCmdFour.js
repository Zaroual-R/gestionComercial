import React from 'react'
import {useNavigate} from 'react-router-dom';
import CommandeFourService from '../backEndService/CommandeFourService';
const LignCmdFour = (props) => {
    const navigate=useNavigate();
    const commande = props.commande;

    const handleEdit = (commande) => {
        // Check if the commande's etat is either "EN_TRANSPORT" or "LIVREE"
        if (commande.etat === "EN_TRANSPORT" || commande.etat === "LIVREE") {
            // Show confirmation dialog
            const userConfirmed = window.confirm("Cette commande est en cours de transport ou déjà livrée. Voulez-vous vraiment modifier cette commande?");
            if (userConfirmed) {
                navigate("/ManageCommande", { state: { commande } });
            } else {
                console.log("Modification cancelled by the user.");
            }
        } else {
            navigate("/ManageCommande", { state: { commande } });
        }
    }   

    const handlePlus = (idCmd)=>{
       navigate("/DetailsCommande",{state:{idCmd}});
    }

    const handleDelete = (idCmd) => {   
        console.log("idCommane",idCmd)
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?");  
        
        if (isConfirmed ) {
            
            CommandeFourService.deleteCmdFour(idCmd)
                .then(response => {
                    console.log("La commande a été supprimée avec succès");
                    props.onDelete();
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression de cette commande", error);
                });
        }
    }
    
    const handleFacture = (Fact) =>{
        navigate("/FactureDocument",{state:{Fact}})
    }

    const handleDownload = (idCmd) => {
        navigate("/BonCmdDocument",{state:{idCmd}})
    }

    const handleDocBonLivraison=(bonLivraison) =>{
        navigate("/LivraisonDocument", { state: {bonLivraison} });
    }
  

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <tr>
            <td style={{ textAlign: "center" }}>{commande.idCommande}</td>
            <td style={{ textAlign: "center" }}>{formatDate(commande.dateCommande)}</td>
            <td style={{ textAlign: "center" }}>{commande.fournisseur.raisonSocial}</td>
            <td style={{ textAlign: "center" }}>
                <button className="btn " onClick={() => { handlePlus(commande.idCommande) }} style={{backgroundColor:'#59E817'}}>
                    <i className="fas fa-info"></i> plus
                </button>
            </td>
            <td style={{ textAlign: "center" }}>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" >
                        Actions
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={() => handleEdit(commande)}>
                            <i className="fas fa-edit"></i> Modifier
                        </button>
                        <button className="dropdown-item" onClick={() => { handleDelete(commande.idCommande) }}>
                            <i className="fas fa-trash"></i> Supprimer
                        </button>
                        <button className="dropdown-item" onClick={() => { handleFacture(commande.factureCmdFour) }} >
                            <i class="fas fa-file-invoice"></i> Facteur
                        </button>
                        <button className="dropdown-item" onClick={() => { handleDocBonLivraison(commande.bonLivraisonFour) }} >
                            <i class="fas fa-truck"></i> Bon livraison
                        </button>
                        <button className="dropdown-item" onClick={() => { handleDownload(commande.idCommande) }} >
                            <i class="fas fa-download"></i> Telecharger
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default LignCmdFour