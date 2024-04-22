import React from "react"
import { useNavigate } from "react-router-dom";
import ActionButtonLivraison from "./ActionButtonLivraison";
import LivraisonService from "../backEndService/LivraisonService";

const LigneListLivraison = (props) => {
    const navigate = useNavigate();
    const hadleClickEdit = (idLivraison, idClient, dateLivraison, datePrevue, dateReception, statusLivraison, adresseLivraison) =>{
        navigate("/ModefieLivraison", {
          state: {
            idLivraison: idLivraison,
            idClient: idClient,
            dateLivraison: dateLivraison,
            datePrevue: datePrevue,
            dateReception: dateReception,
            adresseLivraison: adresseLivraison,
            statusLivraison: statusLivraison
          }
        });
    }
    const handleDelete = (id) => {
        LivraisonService.deleteLivraison(id)
          .then(response => {
            console.log("this livraison has been deleted successfully", response.data);
            props.onDelete(id); 
          })
          .catch(error => {
            console.error("error to delete this livraison",id," ", error);
          });
    };
    return (
        <>
        <tr>
            <td style={{textAlign: "center" }}>{props.idLivraison}</td>
            <td style={{textAlign: "center" }}>{props.nomClient}</td>
            <td style={{textAlign: "center" }}>{props.dateLivraison}</td>
            <td style={{textAlign: "center" }}>{props.datePrevue}</td>
            <td style={{textAlign: "center" }}>{props.dateReception}</td>
            <td style={{textAlign: "center" }}>{props.adresseLivraison}</td>
            <td style={{textAlign: "center" }}>{props.statusLivraison}</td>
            <td style={{ textAlign: "center" }}>
              <ActionButtonLivraison
                onEdit={() => hadleClickEdit(props.idLivraison, props.idClient, props.dateLivraison, props.datePrevue, props.dateReception, props.statusLivraison, props.adresseLivraison)}
                onDelete={() => handleDelete(props.idLivraison)}
               />
            </td>
    
        </tr>
            
        </>    
    )
}

export default LigneListLivraison;