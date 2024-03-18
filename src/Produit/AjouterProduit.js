import React, { useEffect } from 'react'
import { useState,useRef } from 'react';
import ProductService from '../backEndService/ProductService';
import CategorieService from '../backEndService/CategorieService';
const AjouterProduit = () => {
    const refProduit=useRef();
    const nomProduit=useRef();
    const prixProduit=useRef();
    const details=useRef();
    const categorieProduit=useRef();
    const [errors,setErrors]=useState({});
    const [produit ,setProduit]=useState({refProd:'',nomProd:'',prixUnitaireHT:0,details:'',category:0,})
    let isValide=true;
    const [categories,setCategories]=useState([]);

    //get all getegories in did mount component 
    useEffect(()=>{
        CategorieService.getAllCategorie()
            .then(responce =>{
                setCategories(responce.data);
                console.log("les categorie a été chargé avec succes");           
            })
            .catch(error=>{
                console.error("error dans le chargement des categorie");
            })
    },[])
    
    /* start handle reset button action*/
      const handleReset = (e) =>{
        e.preventDefault();
        refProduit.current.value='';
        nomProduit.current.value='';
        prixProduit.current.value='';
        details.current.value='';
        categorieProduit.current.value='';
      }
      const handleReset2 = ()=>{
        refProduit.current.value='';
        nomProduit.current.value='';
        prixProduit.current.value='';
        details.current.value='';
        categorieProduit.current.value='';
      }
    /*end handle reset button action*/

    /*start handle form validation*/
      const formValidate = () =>{
        setErrors({});
        const refValue=refProduit.current.value;
        const nameValue=nomProduit.current.value;
        const prixValue=prixProduit.current.value;
        const detailValue=details.current.value;
        const categorieValue=categorieProduit.current.value;

        if(refValue.trim()==''){
            setErrors(prevState => {return {...prevState,...{refProduit:"ref required"}}});
            isValide=false;
        }
        if(nameValue.trim()==''){
            setErrors(prevState => {return {...prevState,...{nomProduit:"name required"}}});
            isValide=false;
        }
        if(prixValue.trim()==''){
            setErrors(prevState => {return {...prevState,...{prixProduit:"detail required"}}});
            isValide=false;
        }
        if(detailValue.trim()==''){
            setErrors(prevState => {return {...prevState,...{details:"detail required"}}});
            isValide=false;
        }
        if(categorieValue.trim()==''){
            setErrors(prevState => {return {... prevState,...{categorieProduit:"categorie required"}}});
            isValide=false;
        }
        return isValide;
      }
    /*end form validation*/

    // function get error of given field 
    const getError = (field) => {
        return errors[field];
    }

    //function to verify if a field has error or not

    const hasError = (field) => {
        return (getError(field)!==undefined);
    }

    //functio to display error after every invalid input

    const diplayErr =(field) => {
       const element=document.querySelector(`#${field}`);
       if(hasError(field)){
          element.style.border="1px solid red";
          return (
            <div>
                <div className='text text-danger'>{getError(field)}</div>
            </div>
           )
       }
       if(element!==null){
          element.removeAttribute('style');
       }
       return null;
    }

    /*end form handle change */
    const handleChange = (event) => {
        formValidate();
        const { name, value } = event.target;
        setProduit(prevProduit => ({
            ...prevProduit,
            [name]: value
        }));
        console.log(produit);
    }
    

    /*end form handle change*/

    /*function handle submit*/
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formValidate()) {
            ProductService.createProduct(produit)
                .then(responce =>{
                    console.log("produit ajouté avec succes",responce.data);
                    setProduit({
                        refProd: '',
                        nomProd: '',
                        prixUnitaireHT: 0,
                        details: '',
                        category:0.0
                    });
                    handleReset2();
                })
                .catch(error =>{
                    console.error("error de l'ajout de produit ",error);
                })

        }   
    }
     /*end function handle submit*/
     
    return (
        <div className="container ajouter-produit" >
          <div className='row '>
            <div className='col-8'>
            <form onSubmit={handleSubmit} >
                <h2>Nouveau produit</h2>
                <hr></hr>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="refProduit">Référece produit :</label>
                    <input type="text" name="refProd" id="refProduit" className="form-control" placeholder='ref produit' ref={refProduit} onChange={handleChange}/>
                    {diplayErr("refProduit")}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="nomProduit">Nom produit :</label>
                    <input type="text" name='nomProd' id="nomProduit" className="form-control" placeholder='nom produit' ref={nomProduit} onChange={handleChange}/>
                    {diplayErr("nomProduit")}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="prixProduit">Prix produit :</label>
                    <input  type="number" name='prixUnitaireHT' id="prixProduit" className="form-control" placeholder='prix unitaire' ref={prixProduit} onChange={handleChange}/>
                    {diplayErr("prixProduit")}
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="details">Details produit :</label>
                    <textarea id="details" name='details' className="form-control" placeholder='saisir les details de produit' ref={details} onChange={handleChange} />
                    {diplayErr("details")}
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="categorieProduit">Categorie :</label>
                    <select className="form-control" name='category' id="categorieProduit" ref={categorieProduit} onChange={handleChange}>
                        <option value=''>select categorie</option>
                         {categories.map(categorie =>( <option key={categorie.idCategorie} value={categorie.idCategorie} >{categorie.nomCategorie}</option>))}
                    </select>
                    {diplayErr("categorieProduit")}
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

    );
}

export default AjouterProduit;