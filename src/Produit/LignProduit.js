import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../backEndService/ProductService';

//function to handle edit click
const LignProduit = (props) => {
  const navigate = useNavigate();
  const [nbrLignCommande,setNbrLignCommande]=useState(0);
  const hadleClickEdit = (idP, refP, nomP, prixP, categorieP, detailsP, tva) => {
    navigate(`/ModefieProduit`, { state: { idP, refP, nomP, prixP, categorieP, detailsP, tva } });
  }


  const getNbrLign = async (id) => {
    try {
        const response = await ProductService.getNbrLignes(id);
        if (response) {
            setNbrLignCommande(response.data);
            console.log("get nbr ligne success", response.data);
            // Move the decision logic inside the async function after state update
            if (response.data > 0) {
                props.alert('error');
            } else {
                // Confirm deletion here
                const confirm = window.confirm("Voulez-vous vraiment supprimer ce produit?");
                if (confirm) {
                    deleteProduct(id);
                }
            }
        }
    } catch (error) {
        console.error("Error to get nbr ligne", error);
    }
};

// Separate function for deletion to keep it clean
const deleteProduct = (id) => {
    ProductService.deleteProduct(id)
        .then(response => {
            console.log("Le produit a été supprimé avec succès");
            // Optionally, update the UI to reflect the deletion, like removing the item from a list
        })
        .catch(error => {
            console.error("Error to delete produit", error);
        });
};

// Adjusted handleDelete function
const handleDelete = (id) => {
    getNbrLign(id);
};


  return (
    <tr>
      <td style={{ width: "90px", textAlign: "center" }}>{props.id}</td>
      <td style={{ width: "90px", textAlign: "center" }}>{props.refProduit}</td>
      <td style={{ width: "90px", textAlign: "center" }}>{props.nom}</td>
      <td style={{ width: "90px", textAlign: "center" }}>{props.prix}</td>
      <td style={{ width: "90px", textAlign: "center" }}>{props.categorie}</td>
      <td style={{ width: "300px", textAlign: "center" }}>{props.details}</td>
      <td style={{ width: "300px", textAlign: "center" }}>{props.tva}</td>
      <td style={{ width: "200px", textAlign: "center" }}>
        <button className='btn btn-primary' onClick={() => { hadleClickEdit(props.id, props.refProduit, props.nom, props.prix, props.category, props.details, props.tva) }}><i className='fas fa-pencil-alt'></i></button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className='btn btn-danger' onClick={() => { handleDelete(props.id) }} ><i className='fa fa-trash'></i></button>
      </td>
    </tr>
  );
};

export default LignProduit;
