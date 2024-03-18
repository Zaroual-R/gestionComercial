import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../backEndService/ProductService';

//function to handle edit click
const LignProduit = (props) => {
  const navigate=useNavigate();
  const hadleClickEdit = (idP,refP, nomP, prixP, categorieP, detailsP) => {
    navigate(`/ModefieProduit`,{state:{idP,refP,nomP,prixP,categorieP,detailsP}});
  }

 //function to handle delete click
  const handleDelete =(id)=>{
      ProductService.deleteProduct(id)
        .then(response =>{
          console.log("le produit a été supprimer avec succées",response.data);
          props.onDelete();
        })
        .catch(error =>{
          console.error("error de suppresion de produit");
        })
  }
  return (
    <tr>
        <td  style={{width:"90px" ,textAlign:"center"}}>{props.id}</td>
        <td style={{width:"90px" ,textAlign:"center"}}>{props.refProduit}</td>
        <td  style={{width:"90px" ,textAlign:"center"}}>{props.nom}</td>
        <td  style={{width:"90px" ,textAlign:"center"}}>{props.prix}</td>
        <td  style={{width:"90px" ,textAlign:"center"}}>{props.categorie}</td>
        <td  style={{width:"300px" ,textAlign:"center"}}>{props.details}</td>
        <td  style={{width:"200px" ,textAlign:"center"}}>
            <button className='btn btn-primary' onClick={()=>{hadleClickEdit(props.id,props.refProduit,props.nom,props.prix,props.category,props.details)}}><i className='fas fa-pencil-alt'></i>edit</button>
             &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={()=>{handleDelete(props.id)}} ><i className='fa fa-trash'></i>delete</button>
        </td>
    </tr> 
  );
};

export default LignProduit;
