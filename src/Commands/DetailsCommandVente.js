import React from "react"; 
import ServiceCommand from "../backEndService/ServiceCommand";
import PDFFactureViewer from "../facture/PDFFactureViewer";
import ActionButtonFacture from "../facture/ActionButtonFacture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FactureService from "../backEndService/FactureService";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";






const DetailsCommandVente = ()=>{
  const location = useLocation();
  const { state } = location.state; 
  const { idCommande } = location.state || {};
  

  const [commande, setCommande] = useState(null);
  const [showPDF, setShowPDF] = useState(false);

  const navigate=useNavigate();

  useEffect(() => {
    if (idCommande) {
      console.log('Fetching command details for ID:', idCommande);
      ServiceCommand.getCommande(idCommande)
        .then(response => {
          console.log('Command details:', response.data);
          setCommande(response.data);
        })
        .catch(error => {
          console.error('Error fetching command details:', error);
        });
    } else {
      return <div>Loading...</div>;
      console.log('No idCommande provided');
    }
  }, [idCommande]);
      const hadleClickEdit = (idC) =>{
        navigate("/AjouterCommand",{state:{idC}})
    }

    const handleGenerate = (idC) => {
      setShowPDF(true)
    }
    const handleDelete = (factureId) => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
        FactureService.deleteFacture(factureId)
          .then(response => {

            setCommande(prevState => ({
              ...prevState,
              factureDeVente: prevState.factureDeVente.filter(facture => facture.idFacture !== factureId)
            }));
    
    
            alert("Facture supprimée avec succès");
    

          })
          .catch(error => {
            // Handle the error properly
            console.error("Erreur lors de la suppression de la facture:", error);
            alert("Une erreur est survenue lors de la suppression de la facture.");
          });
      }
    };
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
    
    return (

<div className='container mt-2 details-cmd'>
<div className='card'>
    <div className='card-header bg-dark text-white text-center'>
      <h3>Details de la Commande</h3>
    </div>
    <div className='card-body'>
    <table className='table table-striped' >
    <tbody>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Prénom:</td>
            <td>{commande.vente.client.prenomClient}</td>
            <td style={{ fontWeight: 'bold' }}>Nom:</td>
            <td>{commande.vente.client.nomClient}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Adresse:</td>
            <td>{commande.vente.client.address}</td>
            <td style={{ fontWeight: 'bold' }}>Société:</td>
            <td>{commande.vente.client.societe}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Immatriculation CNSS:</td>
            <td>{commande.vente.client.cnss}</td>
            <td style={{ fontWeight: 'bold' }}>Code Comptable:</td>
            <td>{commande.vente.client.codeComptable}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Ville:</td>
            <td>{commande.vente.client.ville}</td>
            <td style={{ fontWeight: 'bold' }}>Code Postal:</td>
            <td>{commande.vente.client.codePostal}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Pays:</td>
            <td>{commande.vente.client.pays}</td>
            <td style={{ fontWeight: 'bold' }}>Téléphone:</td>
            <td>{commande.vente.client.tel}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Email:</td>
            <td>{commande.vente.client.email}</td>
            <td style={{ fontWeight: 'bold' }}>Registre du Commerce (RC):</td>
            <td>{commande.vente.client.rc}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Email:</td>
            <td>{commande.vente.client.email}</td>
            <td style={{ fontWeight: 'bold' }}>Registre du Commerce (RC):</td>
            <td>{commande.vente.client.rc}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div className='card-footer'>
      <h4 className="text-center">Détail de la Facture</h4>
      {commande.factureDeVente ? (
        <table className='table table-bordered table-striped'>
            <thead className="thead-dark">
                <tr>
                  <th scope="col" style={{ textAlign: "center" }}>#ID</th>  
                  <th scope="col" style={{ textAlign: "center" }}>Date de facture</th>
                  <th scope="col" style={{ textAlign: "center" }}>Date prévue de paiement</th>
                  <th scope="col" style={{ textAlign: "center" }}>Date réel de paiement</th>
                  <th scope="col" style={{ textAlign: "center" }}>Mode de paiement</th>
                  <th scope="col" style={{ textAlign: "center" }}>Statut de la facture</th>
                  <th scope="col" style={{ textAlign: "center" }} colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td style={{textAlign: "center" }}>{commande.factureDeVente.idFacture}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.factureDeVente.dateFacture)}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.factureDeVente.datePrevuePayement)}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.factureDeVente.dateReelPayement)}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.factureDeVente.dateReelPayement)}</td>
            <td style={{textAlign: "center" }}>{commande.factureDeVente.modPayement}</td>
            <td style={{textAlign: "center" }}>{commande.factureDeVente.statusFacture}</td>
            <td style={{ textAlign: "center" }}>
              <ActionButtonFacture
                onEdit={() => hadleClickEdit(commande.factureDeVente.idFacture, commande.factureDeVente.idClient, commande.factureDeVente.modPayement, commande.factureDeVente.dateFacture, commande.factureDeVente.datePrevuePayement,commande.factureDeVente.dateReelPayement, commande.factureDeVente.statusFacture)}
                onDelete={() => handleDelete(commande.factureDeVente.idFacture)}
                onGenerate={() => handleGenerate(commande.factureDeVente.idFacture)}

        
               />
            </td>
    
        </tr>
        {showPDF && (
          <div style={{
            position: 'fixed', // Position fixe par rapport à la fenêtre d'affichage
            top: 0, // Commence au haut de la page
            left: 0, // Commence à gauche de la page
            width: '100vw', // Utilise toute la largeur de la fenêtre d'affichage
            height: '100vh', // Utilise toute la hauteur de la fenêtre d'affichage
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent pour le fond
            zIndex: 9999, // S'assurer qu'il est par-dessus tout le contenu
          }}>
        <PDFFactureViewer factureId={commande.factureDeVente.idFacture} setShowPDF={setShowPDF} />
        <button onClick={() => setShowPDF(false)} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000, // Encore plus haut pour être sûr qu'il est au-dessus du PDF
          }}></button>
          </div>
      )}
              </tbody>
        </table>
      ) : (
        <div className="text-center">
          <button className="btn btn-primary" >Créer la Facture</button>
        </div>
      )}
    </div>

    <div className='card-footer'>
      <h4 className="text-center">Détail de la Livraison</h4>
      
    </div>
    
    
    
  </div>
</div>

    )
}

export default DetailsCommandVente;