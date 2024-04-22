import axios from 'axios';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ devisId, setShowPDF }) => {
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:8088/api/devis/generate/${devisId}`;
    
    // Assurez-vous que votre serveur autorise les requêtes CORS si nécessaire
    axios.get(apiUrl, { responseType: 'blob' }) 
      .then(response => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        setFile(URL.createObjectURL(pdfBlob));
      })
      .catch(error => {
        console.error("Erreur lors du chargement du PDF :", error);
      });
      
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [devisId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("le nombre de page : ",numPages); // Vérifiez cette sortie
    setNumPages(numPages);
  };

  return (
    <div style={{
      position: 'fixed', // Position fixe par rapport à la fenêtre d'affichage
      top: 0, // Commence au haut de la page
      left: 0, // Commence à gauche de la page
      width: '100vw', // Utilise toute la largeur de la fenêtre d'affichage
      height: '100vh', // Utilise toute la hauteur de la fenêtre d'affichage
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent pour le fond
      zIndex: 9999, // S'assurer qu'il est par-dessus tout le contenu
      display: 'flex', // Utilise flex pour centrer le contenu
      justifyContent: 'center', // Centre horizontalement
      alignItems: 'center', // Centre verticalement
    }}>
      <div style={{
        backgroundColor: 'white', // Fond blanc pour le contenu PDF
       // padding: '20px', // Un peu d'espace autour du contenu PDF
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Ajoute une ombre pour du relief
        maxHeight: '100vh', // Max hauteur pour la visibilité sur petits écrans
        overflow: 'scroll', // Ajoute une barre de défilement si nécessaire
      }}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
      <button onClick={() => setShowPDF(false)} style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 10000, // Encore plus haut pour être sûr qu'il est au-dessus du PDF
      }}>
        Fermer
      </button>
    </div>
  );
};

export default PDFViewer;
