import React from 'react'
import { useState,useRef} from 'react'
import CategorieService from '../backEndService/CategorieService';
const AjouterCategorie = () => {
    const nomCategorieField=useRef();
    const [errors,setErrors]=useState({});
    let isfvalid=true;
    const [categorie,setCategorie]=useState('');
    //start form validation function
    const validatForm = () =>{
        setErrors({});
        const nomValue=nomCategorieField.current.value;
        if(nomValue.trim()==''){
            setErrors(prevState =>{return {...prevState,...{nomCategorieField:"nom required"}}});
            isfvalid=false;
        }
        return isfvalid;
    }

    //start handleReset 
    const handleReset =(e)=>{
        e.preventDefault();
        nomCategorieField.current.value='';
    }

    //stat getError function 
    const getError =(field) =>{
        return errors[field];
    }

    //start hasErr function 
    const hasErr = (field) =>{
      return (getError(field)!==undefined);
    }

    //start displayErr function
    const displayErr = (field)=>{
        const element=document.querySelector(`#${field}`);
        if(hasErr(field)){
            element.style.border="1px solid red";
            return(
                <div>
                    <div className='text text-danger'>{getError(field)}</div>
                </div>
            );
        }
        if(element!==null){
            element.removeAttribute('style');
        }
        return null;
    }
    const handleChange = (e) =>{
        validatForm();
        const nomCategorieValue=e.target.value;
        setCategorie(nomCategorieValue);
    }
    //start handlesubmit function 
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validatForm()){
            CategorieService.createCategorie({nomCategorie:categorie})
                .then(responce => {
                    console.log("categorie ajouté avec succes ",responce.data);
                    setCategorie('');
                    nomCategorieField.current.value=''; 
                })
                .catch(error => {
                    console.error("error pour l'ajout de categorie",error);
                })
               
        }
    }
    return (
        <div className='container ajouter-categorie'>
            <div className='row'>
                <div className='col-8'>
                    <form onSubmit={handleSubmit}>
                        <h1>Nouveau Categorie </h1>
                        <hr />
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="nomCategorieField">Nom categorie :</label>
                            <input type="text" name="nomCategorie" id="nomCategorieField" className="form-control" placeholder='nom categorie' ref={nomCategorieField} onChange={handleChange} />
                            {displayErr("nomCategorieField")}
                        </div>
                        <div>
                            <input type="submit" value="Ajouter" className='btn btn-primary'></input>
                             &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="reset" value="Reset" className='btn btn-danger' onClick={handleReset}></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AjouterCategorie