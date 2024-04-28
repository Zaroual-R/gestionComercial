import React, { useState, useEffect } from 'react';
import LivraisonService from '../backEndService/LivraisonService';

const PDFLivraisonViewer = ({ livraisonId, setShowPDF }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch the delivery note as a blob
    LivraisonService.generateLivraison(livraisonId)
      .then(response => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        setFile(URL.createObjectURL(pdfBlob)); // Create a URL for the blob
      })
      .catch(error => {
        console.error("Erreur lors du chargement du bon de livraison :", error);
      });

    // Clean up the blob URL on unmount
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [livraisonId]);

  // Display the PDF in an iframe
  return (
    <iframe
      src={file}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
      frameBorder="0"
      title="Delivery Note PDF"
    />
  );
};

export default PDFLivraisonViewer;
