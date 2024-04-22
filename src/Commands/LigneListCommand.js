import React from 'react'
import { useNavigate } from 'react-router-dom';
import ServiceCommand from '../backEndService/ServiceCommand';
import ActionButton from '../components/test/ActionButton';
import { useState } from 'react';
import CreateFacture from '../facture/CreateFacture';

const LigneListCommand = (props) => {
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
      idCommand: '',
      modPayement: '',
      dateFacture: '',
      dateReelPayement: '',
      datePrevuePayement: null,
      statusFacture: null,
    });



    /*const handleCreateFacture = (idCommand) => {
      setFormData({ ...formData, idCommand }); // Ajouter l'id de la commande dans l'état du formulaire
      setShowInvoiceForm(true);
  };*/


  
    const hadleClickEdit = (idCommande,idClient,dateCommand,status) =>{
      navigate("/ModefieCommand", {
        state: {
          idCommande: idCommande,
          idClient: idClient,
          dateCommand: dateCommand,
          status: status
        }
      });
    }

    const handleDelete = (id) => {
      //console.log("l'id de devis : ", id);
      ServiceCommand.deleteCommande(id)
        .then(response => {
          console.log("this commande has been deleted successfully", response.data);

           props.onDelete(id); 
        })
        .catch(error => {
          console.error("error to delete this commande", error);
        });
    };


  const handleCreateLivraison = (idCommand) => {
    navigate("/createLivraison", {
        state: {
            idCommand: idCommand,  // Assurez-vous que cette valeur est correctement définie
        }
    });
};
const handleCreateFacture = (idCommand) => {
  navigate("/createFacture", {
    state: {
      idCommand: idCommand,
    }
  });
};




    return (
      <>
      <tr>
          <td style={{textAlign: "center" }}>{props.idCommande}</td>
          <td style={{textAlign: "center" }}>{props.nomClient}</td>
          <td style={{textAlign: "center" }}>{props.dateCommand}</td>
          <td style={{textAlign: "center" }}>{props.montantTotalHT}</td>
          <td style={{textAlign: "center" }}>{props.montantTotalTTC}</td>
          <td>{props.montantTotalTTC-props.montantTotalHT}</td>
          <td style={{textAlign: "center" }} className='text text-success'>{props.status}</td>
          <td style={{ textAlign: "center" }}>
            <ActionButton
              onEdit={() => hadleClickEdit(props.idCommande, props.idClient, props.dateCommand, props.status)}
              onDelete={() => handleDelete(props.idCommande)}
              onCreateFacture={()=> handleCreateFacture(props.idCommande)}
              onCreateLivraison={()=>handleCreateLivraison(props.idCommande)}
             />
          </td>
  
          </tr>
          
      </>     
    )
}

export default LigneListCommand;