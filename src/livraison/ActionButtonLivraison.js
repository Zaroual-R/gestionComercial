import React from "react"


const ActionButtonLivraison = ({onEdit, onDelete}) => {
    return (
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Actions
          </button>
          <div className="dropdown-menu" aria-labelledby="actionMenuButton">
            <button className="dropdown-item" onClick={onEdit}>Modifier</button>
            <button className="dropdown-item" onClick={onDelete}>Supprimer</button>
          </div>
        </div>
      );
}

export default ActionButtonLivraison;