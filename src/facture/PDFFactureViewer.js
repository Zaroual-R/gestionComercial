import React, { useState, useEffect } from 'react';
import axiosInstance from '../backEndService/axisConfig';
import FactureService from '../backEndService/FactureService';

const PDFFactureViewer = ({ factureId, setShowPDF }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch the invoice as a blob
    FactureService.generateFacture(factureId)
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
  }, [factureId]);

  // Display the PDF in an iframe
  return file ? (
    <iframe
      src={file}
      width="100%"
      height="100%"
      frameBorder="0"
      title="Invoice PDF"
    ></iframe>
  ) : (
    <div>Chargement de la facture...</div>
  );
};

export default PDFFactureViewer;
