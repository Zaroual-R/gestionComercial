import React, { useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf'; // Utilisez cette ligne d'importation
const DevisViewer = ({ devisId }) => {
  const [numPages, setNumPages] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const fetchPDF = async () => {
    try {
      const response = await axios.get(`/api/devis/generate/${devisId}`, { responseType: 'blob' });
      setPdfFile(URL.createObjectURL(response.data));
    } catch (error) {
      console.error('Erreur lors de la récupération du devis', error);
    }
  };

  // Appeler cette fonction au moment approprié, par exemple lors du clic sur un bouton
  fetchPDF();

  return pdfFile ? (
    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  ) : (
    <div>Chargement du devis...</div>
  );
};

export default DevisViewer;
