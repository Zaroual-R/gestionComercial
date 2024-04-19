import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const FactureDocument = () => {
    const location = useLocation();
    const { state } = location || {};
    const Facture = state.Fact;
    const [documentFacture, setDocumentFacture] = useState(null);


    const base64ToBlob = (base64, contentType) => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Blob([bytes], {type: contentType});
    };

    useEffect(() => {
        if (Facture && Facture.fileData) {
            const blob = base64ToBlob(Facture.fileData, 'application/pdf');
            const blobUrl = URL.createObjectURL(blob);
            setDocumentFacture(blobUrl);
        }
    }, [Facture]); // Depend on Facture object

    return (
        <div className='factureDocument'>
            {documentFacture ? (
                <iframe src={documentFacture} style={{ width: '100%', height: '100vh' }} frameBorder="0"
                    onError={(e) => console.error('Error loading PDF:', e)}>
                </iframe>
            ) : (
                <p>Loading document...</p>
            )}
        </div>
    );
}

export default FactureDocument;
