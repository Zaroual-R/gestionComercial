import React from "react";
import { useLocation } from "react-router-dom";

function MyComponent() {
    const location = useLocation();
    
    console.log(location); // Affiche le chemin actuel

    // Vous pouvez utiliser d'autres propriétés de l'objet location selon vos besoins
    // Par exemple, pour conditionnellement afficher du contenu en fonction de la route
    return (
        <div>
            {location.pathname === "/" && <div>Vous êtes sur la page d'accueil.</div>}
            {/* Autre contenu conditionnel basé sur la route */}
        </div>
    );
}

export default MyComponent;
