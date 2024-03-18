import React from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceClient from '../backEndService/ServiceClient';

const LignClient = (props) => {
    const navigate=useNavigate();

    //function handleclickEdit to navigate to medefication componant when we click edit buttom
    const handleClickEdit = (idC,nomC,prenomC,societeC,paysC,villeC,telC,emailC,codePostalC) =>{
        navigate("/ModefieClient",{state:{idC,nomC,prenomC,societeC,paysC,villeC,telC,emailC,codePostalC}});
    }

    //function 3awdrask hayid mn la list
    const handleDelete = (id) =>{
        ServiceClient.deleteClient(id)
            .then(responce =>{
                console.log("le client a été supprimé avec succes");
                props.onDelete();
            })
            .catch(error =>{
                console.error("error to delete the client")
            })
    }

    return (
        <tr>
            <td style={{ width: "50px", textAlign: "center" }}>{props.id}</td>
            <td style={{ width: "90px", textAlign: "center" }}>{props.nom}</td>
            <td style={{ width: "90px", textAlign: "center" }}>{props.prenom}</td>
            <td style={{ width: "100px", textAlign: "center" }}>{props.societe}</td>
            <td style={{ width: "100px", textAlign: "center" }}>{props.pays}</td>
            <td style={{ width: "100px", textAlign: "center" }}>{props.ville}</td>
            <td style={{ width: "100px", textAlign: "center" }}>{props.tel}</td>
            <td style={{ width: "100px", textAlign: "center" }}>{props.email}</td>
            <td style={{ width: "90px", textAlign: "center" }}>{props.codePostal}</td>
            <td style={{ width: "400px", textAlign: "center" }}>
                <button className='btn btn-primary' onClick={() =>{handleClickEdit(props.id,props.nom,props.prenom,props.societe,props.pays,props.ville,props.tel,props.email,props.codePostal)}} ><i className='fas fa-pencil-alt'></i></button>
                 &nbsp;&nbsp;
                <button className='btn btn-danger' onClick={() =>{handleDelete(props.id)}} ><i className='fa fa-trash'></i></button>
                <br/><br/>
            </td>
        </tr>
    )
}

export default LignClient