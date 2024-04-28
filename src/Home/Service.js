import React, { useState } from "react";
import productImage from './image/product.webp';
import clientImage from './image/client.webp';
import userImage from './image/user.webp';
import supplierImage from './image/fourni.webp';

import './Service.css';

const Service = () => {
  // État pour suivre la catégorie actuellement sélectionnée
  const [activeCategory, setActiveCategory] = useState('produits');

  // Informations sur les catégories
  const categories = {
    produits: {
      title: "Créez et organisez avec facilité les produits dans les catégories",
      content: "Dotez-vous d'un système dynamique pour ajouter et catégoriser vos produits. Ce module intuitif simplifie le lancement de nouvelles offres, l'ajustement des détails produit et la mise à jour des catalogues, garantissant une offre toujours d'actualité et compétitive. Rejoignez-nous pour une gestion de produits sans effort.",
      image: productImage,
      alt: "Gestion de produits"
    },
    clients: {
        title: "Créez et organisez avec facilité les produits dans les catégories",
        content: "Dotez-vous d'un système dynamique pour ajouter et catégoriser vos produits. Ce module intuitif simplifie le lancement de nouvelles offres, l'ajustement des détails produit et la mise à jour des catalogues, garantissant une offre toujours d'actualité et compétitive. Rejoignez-nous pour une gestion de produits sans effort.",
        image: clientImage,
        alt: "Gestion de produits"    
    },
    fournisseurs : {
        title: "Créez et organisez avec facilité les produits dans les catégories",
        content: "Dotez-vous d'un système dynamique pour ajouter et catégoriser vos produits. Ce module intuitif simplifie le lancement de nouvelles offres, l'ajustement des détails produit et la mise à jour des catalogues, garantissant une offre toujours d'actualité et compétitive. Rejoignez-nous pour une gestion de produits sans effort.",
        image: supplierImage,
        alt: "Gestion de produits"
    },
    users : {
        title: "Créez et organisez avec facilité les produits dans les catégories",
        content: "Dotez-vous d'un système dynamique pour ajouter et catégoriser vos produits. Ce module intuitif simplifie le lancement de nouvelles offres, l'ajustement des détails produit et la mise à jour des catalogues, garantissant une offre toujours d'actualité et compétitive. Rejoignez-nous pour une gestion de produits sans effort.",
        image: userImage,
        alt: "Gestion de produits"
      }
    // Ajoutez les autres catégories ici...
  };

  return (
    <div className="popular-categories">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Popular Categories</h2>
              <h6>Check Them Out</h6>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="naccs">
              <div className="grid">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="menu">
                      {Object.keys(categories).map((categoryKey) => (
                        <div 
                          key={categoryKey}
                          className={`thumb ${activeCategory === categoryKey ? 'active' : ''}`}
                          onClick={() => setActiveCategory(categoryKey)}
                        >
                          Gestion de {categoryKey}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-9 align-self-center">
                    <div className="content">
                      <div className="left-text">
                        <h4>{categories[activeCategory].title}</h4>
                        <p>{categories[activeCategory].content}</p>
                      </div>
                      <div className="right-image">
                        <img src={categories[activeCategory].image} alt={categories[activeCategory].alt} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
