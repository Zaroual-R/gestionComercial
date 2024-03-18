import React from 'react'
import { useRef,useState,useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import CategorieService from '../backEndService/CategorieService';
import ProductService from '../backEndService/ProductService';

const ModefieProduit = () => {
    const refProduit1=useRef();
    const nomProduit1=useRef();
    const prixProduit1=useRef();
    const details1=useRef();
    const categorieProduit1=useRef();
    const [errors,setErrors]=useState({});
    let isValide=true;
    const [categories,setCategories]=useState([]);
    const location=useLocation();
    const {state}=location;
    const {idP,refP,nomP,prixP,categorieP,detailsP}=state || {};
    const [produit ,setProduit]=useState({ refProd:refP,nomProd:nomP,prixUnitaireHT:prixP,details:detailsP,category:categorieP})
    
    useEffect(()=>{
        CategorieService.getAllCategorie()
            .then(responce =>{
                setCategories(responce.data);
                console.log("les categorie  a été chargé avec succes");           
            })
            .catch(error=>{
                console.error("error dans le chargement des categorie");
            })
        initFieldValue();
    },[])

    //initialise les champ de formulaire
    const initFieldValue = () =>{
        refProduit1.current.value=refP;
        nomProduit1.current.value=nomP;
        prixProduit1.current.value=prixP;
        details1.current.value=detailsP;
        categorieProduit1.current.value=categorieP;
    }

    /*start handle reset produit*/
     const handleReset = (e) =>{
        e.preventDefault();
        refProduit1.current.value='';
        nomProduit1.current.value='';
        prixProduit1.current.value='';
        details1.current.value='';
        categorieProduit1.current.value='';
     }
     const handleReset2 = ()=>{
        nomProduit1.current.value='';
        prixProduit1.current.value='';
        details1.current.value='';
        categorieProduit1.current.value='';
      }
    /*end handle reset produit*/

    /*start handle form validation */
     const validateForm = () =>{
        setErrors({});

        const refValue=refProduit1.current.value;
        const nomValue=nomProduit1.current.value;
        const prixValue=prixProduit1.current.value;
        const detailsValue=details1.current.value;
        const categorieValue=categorieProduit1.current.value;

        if(refValue.trim()==''){
            setErrors(prevState =>  {
                return {...prevState,... {refProduit1:"ref required"}};
            });
            isValide=false;
        }
        if(nomValue.trim()==''){
            setErrors(prevState =>  {
                return {...prevState,... {nomProduit1:"nom required"}};
            });
            isValide=false;
        }
        if(prixValue.trim()==''){
            setErrors(prevState =>  {
                return {...prevState,... {prixProduit1:"prix required"}};
            });
            isValide=false;
        }
        if(detailsValue.trim()==''){
            setErrors(prevState =>  {
                return {...prevState,... {details1:"details required"}};
            });
            isValide=false;
        }
        if(categorieValue.trim()==''){
            setErrors(prevState =>  {
                return {...prevState,... {categorieProduit1:"categorie required"}};
            });
            isValide=false;
        }
      return isValide;
     }
    /*end handle form validation*/

    //function to get error of given field
    const getError = (field) => {
        return errors[field];
    }

    //function to verify if a field has en error
    const hasError = (field) =>{
        return (getError(field)!==undefined);
    }

    /*start display error function of a given element*/
    const displayErr = (field) =>{
        const element =document.querySelector(`#${field}`);
        if(hasError(field)){
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
    /*end display error function of a given element */
    
    // handlechange function 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduit(prevProduit => ({
            ...prevProduit,
            [name]: value
        }));
        console.log(produit);
        validateForm();
    }

    /*start handleSubmit function*/
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()) {
            ProductService.updateProduct(produit)
                .then(responce =>{
                    console.log("produit modefié avec succes",responce.data);
                    setProduit({
                        refProd:refP,
                        nomProd: '',
                        prixUnitaireHT: 0,
                        details: '',
                        category:0
                    });
                    handleReset2();
                })
                .catch(error =>{
                    console.error("error de modefier le produit ",error);
                })

        }   
    }
    /*end handleSubmit function*/
  
  return (
    <div className="container modefier-produit">
    <div className='row '>
      <div className='col-8'>
      <form onSubmit={handleSubmit}>
          <h1>Modefier produit</h1>
          <hr></hr>
          <div className="form-outline mb-4">
              <label className="form-label" htmlFor="refProduit">Référece produit :</label>
              <input type="text" name="refProd" id="refProduit1" className="form-control" placeholder='ref produit' ref={refProduit1} onChange={handleChange}  />
              {displayErr("refProduit1")}
          </div>
          <div className="form-outline mb-4">
              <label className="form-label" htmlFor="nomProduit">Nom produit :</label>
              <input type="text" name="nomProd" id="nomProduit1" className="form-control" placeholder='nom produit' ref={nomProduit1} onChange={handleChange}  />
              {displayErr("nomProduit1")}
          </div>
          <div className="form-outline mb-4">
              <label className="form-label" htmlFor="prixProduit">Prix produit :</label>
              <input type="text" name="prixUnitaireHT" id="prixProduit1" className="form-control" placeholder='prix unitaire' ref={prixProduit1} onChange={handleChange}/>
              {displayErr("prixProduit1")}
          </div>
          <div className="form-outline mb-4">
              <label htmlFor="details">Details produit :</label>
              <textarea id="details1" name="details" className="form-control" placeholder='saisir les details de produit' ref={details1} onChange={handleChange} />
              {displayErr("details1")}
          </div>
          <div className="form-outline mb-4">
              <label htmlFor="categorieProduit1">Categorie :</label>
              <select className="form-control" name="category" id="categorieProduit1" ref={categorieProduit1}  onChange={handleChange}>
                  <option value=''>Select categorie</option>
                  {categories.map(categorie =>( <option key={categorie.idCategorie} value={categorie.idCategorie} >{categorie.nomCategorie}</option>))}
              </select>
              {displayErr("categorieProduit1")}
          </div>
          <div>
              <input type="submit" value="Modefier" className='btn btn-primary'></input>
               &nbsp;&nbsp;&nbsp;&nbsp;
              <input type="reset" value="Reset" className='btn btn-danger' onClick={handleReset}></input>
          </div>
      </form>
      </div>
  </div>
</div>
  )
}

export default ModefieProduit