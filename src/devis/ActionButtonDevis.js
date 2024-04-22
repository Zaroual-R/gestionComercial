import React from "react"

const ActionButtonDevis = ({ onEdit, onDelete, onSend, onGenerate, onCommand }) =>{
    return (
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Actions
          </button>
          <div className="dropdown-menu" aria-labelledby="actionMenuButton">
            <button className="dropdown-item" onClick={onEdit}>Modifier</button>
            <button className="dropdown-item" onClick={onDelete}>Supprimer</button>
            <button className="dropdown-item" onClick={onSend}>Envoyer le devis au client</button>
            <button className="dropdown-item" onClick={onGenerate}>voir le devis</button>
            <button className="dropdown-item" onClick={onCommand}>lancer la commande</button>

          </div>
        </div>
      );
}

export default ActionButtonDevis;