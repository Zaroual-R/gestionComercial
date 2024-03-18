import React from 'react'
import { useNavigate } from 'react-router-dom';
import ServiceCommande from '../backEndService/ServiceCommande';

const LignListCommande = (props) => {
  const navigate=useNavigate();

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

  const hadleClickEdit = (idC,idClient,dateCommandeC,dateReglementC,montantTotalC,statusC) =>{
    navigate("/ModefieCmd",{state:{idC,idClient,dateCommandeC,dateReglementC,montantTotalC,statusC}});
  }
  const handleDelete = (id) =>{
    ServiceCommande.deleteCommande(id)
      .then(responce =>{
        console.log("this commande has bees deleted successfuly",responce.data);
      })
      .catch(error =>{
        console.error("error to delte this commande");
      })
    props.onDelete();
  }

  return (
    <tr>
        <td style={{textAlign: "center" }}>{props.id}</td>
        <td style={{textAlign: "center" }}>{props.nomClient}</td>
        <td style={{textAlign: "center" }}>{formatDate(props.dateCmd)}</td>
        <td style={{textAlign: "center" }}>{formatDate(props.dateReglement)}</td>
        <td style={{textAlign: "center" }}>{props.montantTotal}</td>
        <td style={{textAlign: "center" }} className='text text-success'>{props.status}</td>
        <td style={{textAlign: "center" }}><button className='btn btn-primary' onClick={()=>{hadleClickEdit(props.id,props.idClient,props.dateCmd,props.dateReglement,props.montantTotal,props.status)}}><i className='fas fa-pencil-alt'></i></button></td>
        <td style={{textAlign: "center" }}><button className='btn btn-danger' onClick={() =>{handleDelete(props.id)}}><i className='fa fa-trash'></i></button></td>
    </tr>
  )
}

export default LignListCommande;