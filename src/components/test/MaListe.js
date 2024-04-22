import React from 'react';
import ActionButton from './ActionButton'; // Assurez-vous que le chemin d'importation est correct

const MaListe = () => {
  const handleEdit = () => {
    console.log("Modification en cours...");
    // Logique de modification
  };

  const handleDelete = () => {
    console.log("Suppression en cours...");
    // Logique de suppression
  };

  return (
    <div>
      {/* Autres éléments de votre composant */}
      <ActionButton onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default MaListe;
