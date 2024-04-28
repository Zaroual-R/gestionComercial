import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DevisViewer = ({ devisId }) => {
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    // This function fetches the PDF only once when the component mounts or the devisId changes.
    const fetchPDF = async () => {
      try {
        const response = await axios.get(`/api/devis/generate/${devisId}`, { responseType: 'blob' });
        setPdfFile(URL.createObjectURL(response.data));
      } catch (error) {
        console.error('Erreur lors de la récupération du devis', error);
      }
    };

    fetchPDF();
  }, [devisId]); // Add devisId as a dependency to refetch if it changes

  return pdfFile ? (
    <iframe
      src={pdfFile}
      width="100%"
      height="100%"
      frameBorder="0"
      title="Devis PDF"
      allowFullScreen
    />
  ) : (
    <div>Chargement du devis...</div>
  );
};

export default DevisViewer;
