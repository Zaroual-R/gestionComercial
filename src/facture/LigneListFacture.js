import React from "react";
import FactureService from "../backEndService/FactureService";
import { useNavigate } from "react-router-dom";
import ActionButtonFacture from "./ActionButtonFacture";
import CreateFacture from "./CreateFacture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LigneListFacture = (props) => {

    const navigate = useNavigate();

    const statusIcon = {
      NON_PAYEE: <FontAwesomeIcon icon="fa-thin fa-circle-xmark" />,
      PAYEE: <FontAwesomeIcon icon="fa-thin fa-circle-check" />,
      EN_RETARD: <FontAwesomeIcon icon="fa-thin fa-circle-check" className="text-danger" />
  
    }
    const status = props.statusFacture;


    const hadleClickEdit = (idFacture, idClient, modPayement, dateFacture, datePrevuePayement, dateReelPayement, statusFacture) =>{
        navigate("/ModefieFacture", {
          state: {
            idFacture: idFacture,
            idClient: idClient,
            dateFacture: dateFacture,
            modPayement: modPayement,
            datePrevuePayement:datePrevuePayement,
            dateReelPayement: dateReelPayement,
            statusFacture: statusFacture
          }
        });
      }

    const handleDelete = (id) => {
        FactureService.deleteFacture(id)
          .then(response => {
            console.log("this facture has been deleted successfully", response.data);
            props.onDelete(id); 
          })
          .catch(error => {
            console.error("error to delete this facture", error);
          });
    };

    return (
        <>
        <tr>
            <td style={{textAlign: "center" }}>{props.idFacture}</td>
            <td style={{textAlign: "center" }}>{props.nomClient}</td>
            <td style={{textAlign: "center" }}>{props.dateFacture}</td>
            <td style={{textAlign: "center" }}>{props.datePrevuePayement}</td>
            <td style={{textAlign: "center" }}>{props.dateReelPayement}</td>
            <td style={{textAlign: "center" }}>{props.modPayement}</td>
            <td style={{textAlign: "center" }}><span><i><FontAwesomeIcon icon="fa-thin fa-circle-xmark" /></i></span></td>
            <td style={{ textAlign: "center" }}>
              <ActionButtonFacture
                onEdit={() => hadleClickEdit(props.idFacture, props.idClient, props.modPayement, props.dateFacture, props.datePrevuePayement,props.dateReelPayement, props.statusFacture)}
                onDelete={() => handleDelete(props.idFacture)}
               />
            </td>
    
        </tr>
            
        </>     
      )
}
export default LigneListFacture; 