import React from 'react';
import { useLocation } from 'react-router-dom';

const MoreDetails = () => {
  const location = useLocation();
  const { state } = location;
  const fournisseur = state || {};

  // Styles
  const cardStyle = {
    width: '80%',
    margin: '0 auto', // Centre la carte
    fontFamily: 'Roboto, sans-serif', // Utilise la police Roboto
  };

  const headerStyle = {
    textAlign: 'center',
    fontWeight: '700', // Rend le texte du titre de l'en-tête plus gras
  };

  const listItemStyle = {
    fontWeight: 'bold', // Rend le texte des noms des champs en gras
  };

  const valueStyle = {
    fontWeight: 'normal', // Style normal pour les valeurs
  };

  return (
    <div className="container mt-3 details">
      <div className="card" style={cardStyle}>
        <div className="card-header bg-info" style={headerStyle}>
          Détails du Fournisseur
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><span style={listItemStyle}>Referece de fournisseur:</span> <span style={valueStyle}>{fournisseur.idFournisseur}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Code Comptable:</span> <span style={valueStyle}>{fournisseur.codeComptable}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Raison Sociale:</span> <span style={valueStyle}>{fournisseur.raisonSocial}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Adresse:</span> <span style={valueStyle}>{fournisseur.address}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Téléphone:</span> <span style={valueStyle}>{fournisseur.tel}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Nom complete de Responsable:</span> <span style={valueStyle}>{fournisseur.resposable}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Email de  Responsable:</span> <span style={valueStyle}>{fournisseur.emailResponsable}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Registre du Commerce (RC):</span> <span style={valueStyle}>{fournisseur.rc}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Immatriculation CNSS:</span> <span style={valueStyle}>{fournisseur.cnss}</span></li>
          <li className="list-group-item"><span style={listItemStyle}>Nombre de Commandes traité:</span> <span style={valueStyle}>{fournisseur.nbrCommande}</span></li>
        </ul>
      </div>
    </div>
  )
}

export default MoreDetails;
