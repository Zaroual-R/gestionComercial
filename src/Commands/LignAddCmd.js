import React from 'react'
import { useNavigate } from 'react-router-dom';

const LignAddCmd = (props) => {
    const navigate=useNavigate();
    const handleClickAddcmd = (idC) =>{
        navigate("/AjouterCmd",{state:{idC}})
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
            <td style={{ width: "300px", textAlign: "center" }}>
                <button className='btn btn-success' onClick={() =>{handleClickAddcmd(props.id)}}><i className='fa fa-plus'></i>commande</button>
            </td>
        </tr>
    )
}

export default LignAddCmd;