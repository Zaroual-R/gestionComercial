import React from 'react'
import { useNavigate } from 'react-router-dom';
import ServiceCommande from '../backEndService/ServiceDevis';
import ActionButton from '../components/test/ActionButton';
import DevisViewer from './DevisViewer';
import PDFViewer from '../components/test/PDFViewer';
import { useState } from 'react';
import ActionButtonDevis from './ActionButtonDevis';
import ServiceDevis from '../backEndService/ServiceDevis';

const LigneListDevis = (props) => {

  const STATUS_OPTIONS = {
    DEVIS_EN_ATTENTE: "en attente",
    DEVIS_CONFIRMÉ: "confirmé",
    DEVIS_ANNULÉ: "annulé",
  };

  const navigate=useNavigate();


  const [showPDF, setShowPDF] = useState(false);
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatCurrency = (value) => {
  return Number(value).toFixed(2);
};


  const hadleClickEdit = (idDevis,idClient,dateDevis,dateExpiration,status) =>{
    navigate("/ModefieDevis", {
      state: {
        idDevis: idDevis,
        idClient: idClient,
        dateDevis: dateDevis,
        dateExpiration: dateExpiration,
        status: status
      }
    });
  }
/*  const handleDelete = (id) =>{
    console.log("l'id de devis : ",id);
    ServiceCommande.deleteCommande(id)
      .then(responce =>{
        console.log("this commande has bees deleted successfuly",responce.data);
      })
      .catch(error =>{
        console.error("error to delte this commande");
      })
    props.onDelete();
  }*/
  const handleDelete = (id) => {
    console.log("l'id de devis : ", id);
    ServiceCommande.deleteCommande(id)
      .then(response => {
        console.log("this commande has been deleted successfully", response.data);
        // Mettez à jour l'état pour refléter la suppression
        //setListCommande(prevListCommande => prevListCommande.filter(item => item.idDevis !== id)); 
        // Cette ligne ci-dessous n'est plus nécessaire puisque nous mettons déjà à jour l'état
         props.onDelete(id); 
      })
      .catch(error => {
        console.error("error to delete this commande", error);
      });
  };
  const handleSend = (id) => {
    ServiceCommande.sendDevis(id).then(response => console.log(response.status))
  }
  const handleGenerate = (id) => {
    setShowPDF(true);
  }
  const handleCommand = (id) => {
    ServiceCommande.lanceCommand(id).then(response => console.log(response.status))
  }

  const handleStatusChange = (newStatus) => {
    // Trouver la clé de l'énumération basée sur la valeur sélectionnée
    const statusDevise = Object.keys(STATUS_OPTIONS).find(key => STATUS_OPTIONS[key] === newStatus);
    const status = {
      statusDevise: statusDevise
    }
    if (!status) {
      alert("La valeur sélectionnée n'est pas valide.");
      return; // Stopper la fonction si la valeur n'est pas valide
    }

    // Appeler changeStatus de ServiceDevis avec l'ID du devis et la nouvelle clé de statut
    ServiceDevis.changeStatus(props.idDevis, status)
      .then(response => {
        console.log('Status updated successfully:', response);
        props.onStatusChange(props.idDevis, statusDevise);
        // Ici, vous pouvez mettre à jour l'état du composant pour refléter le nouveau statut
        // ou déclencher un rechargement/rafraîchissement des données si nécessaire.
      })
      .catch(error => {
        console.error('Failed to update status:', error);
      });
  };

  return (
    <>
    <tr>
        <td style={{textAlign: "center" }}>{props.idDevis}</td>
        <td style={{textAlign: "center" }}>{props.nomClient}</td>
        <td style={{textAlign: "center" }}>{props.dateDevis}</td>
        <td style={{textAlign: "center" }}>{formatDate(props.dateExpiration)}</td>
        <td className="align-right">{formatCurrency(props.montantTotalHT)}</td>
        <td className="align-right">{formatCurrency(props.montantTotalTTC)}</td>
        <td className="align-right">{formatCurrency(props.montantTotalTTC - props.montantTotalHT)}</td>
        <td style={{ textAlign: "center" }}>
        <select 
          value={STATUS_OPTIONS[props.status]}
          style={{ backgroundColor: '#78e7a2', color: '#333', borderColor: '#f0f0f0', textAlign: 'center' }}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="form-control">
          {Object.values(STATUS_OPTIONS).map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </td>
        <td>
        <td style={{ border:'none', textAlign: "center" }}>
          <ActionButtonDevis
            onEdit={() => hadleClickEdit(props.idDevis, props.idClient, props.dateDevis, props.dateExpiration, props.status)}
            onDelete={() => handleDelete(props.idDevis)}
            onSend={()=> handleSend(props.idDevis)}
            onGenerate={()=> handleGenerate(props.idDevis)}
            onCommand={()=> handleCommand(props.idDevis)}
          />
        </td>

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
            <PDFViewer devisId={props.idDevis} setShowPDF={setShowPDF} />
            <button onClick={() => setShowPDF(false)} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000, // Encore plus haut pour être sûr qu'il est au-dessus du PDF
          }}>
            Fermer
          </button>
        </div>
      )}
    </>     
  )
}

export default LigneListDevis;