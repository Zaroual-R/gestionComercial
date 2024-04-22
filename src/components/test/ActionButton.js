import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ onEdit, onDelete, onCreateFacture, onCreateLivraison}) => {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Actions
      </button>
      <div className="dropdown-menu" aria-labelledby="actionMenuButton">
        <button className="dropdown-item" onClick={onEdit}>Modifier</button>
        <button className="dropdown-item" onClick={onDelete}>Supprimer</button>
        <button className="dropdown-item" onClick={onCreateFacture}>Créer Facture</button>
        <button className="dropdown-item" onClick={onCreateLivraison}>Créer Livraison</button>
      </div>
    </div>
  );
};

export default ActionButton;
