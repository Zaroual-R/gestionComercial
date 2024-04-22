import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import ServiceClient from '../backEndService/ServiceClient';
import { addTokenToHeader } from '../backEndService/AxiosConfig';

const AjouterClient = () => {
    const nomClientField = useRef();
    const prenomClientField = useRef();
    const societeField = useRef();
    const paysField = useRef();
    const villeField = useRef();
    const telField = useRef();
    const emailField = useRef();
    const codePostalField = useRef();
    const [errors, setErrors] = useState({});
    const [alertMessage,setAlertMessage]=useState("");
    let isValide=true;
    const [client,setClient]=useState(
        {"nomClient":'',
        "prenomClient":'',
        "codePostal":'', 
        "ville":'',
        "pays":''
        ,"tel":'',
        "email":'',
        "societe":'',
        })

    //function to reset fields of form 
    useEffect (() => {
        addTokenToHeader();
    },[])
    /*start form validation function*/
    const validatForm = () => {
        setErrors({});
        const nomValue = nomClientField.current.value;
        const prenomValue = prenomClientField.current.value;
        const societeValue = societeField.current.value;
        const paysValue = paysField.current.value;
        const villeValue = villeField.current.value;
        const telValue = telField.current.value;
        const emailValue = emailField.current.value;
        const codePostalValue = codePostalField.current.value;

        if (nomValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ nomClientField: "nom required" } } });
            isValide = false;
        }
        if (prenomValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ prenomClientField: "prenom required" } } });
            isValide = false;
        }
        if (paysValue.trim() == '') {
            const paysValue = paysField.current.value;
            setErrors(prevState => { return { ...prevState, ...{ paysField: "pays required" } } });
            isValide = false;
        }
        if (villeValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ villeField: "ville required" } } });
            isValide = false;
        }
        if (telValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ telField: "tel required" } } });
            isValide = false;
        }
        if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setErrors(prevState => { return { ...prevState, ...{ emailField: "email required" } } });
            isValide = false;
        }
        if (codePostalValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ codePostalField: "codePostal required" } } });
            isValide = false;
        }
        return isValide;
    }
    /*end form validation function*/
    const handleReset2 = () => {
        nomClientField.current.value=''
        prenomClientField.current.value=''
        societeField.current.value=''
        paysField.current.value=''
        villeField.current.value=''
        telField.current.value=''
        emailField.current.value=''
        codePostalField.current.value=''
    }
    // start handle Reset 
    const handleReset = (e) => {
        e.preventDefault();
        nomClientField.current.value=''
        prenomClientField.current.value=''
        societeField.current.value=''
        paysField.current.value=''
        villeField.current.value=''
        telField.current.value=''
        emailField.current.value=''
        codePostalField.current.value=''
    }

    //start get error function of given field
    const getError = (field) =>{
        return errors[field];
    }

    //start has error function of given field
    const hasError = (field) =>{
        return (getError(field)!==undefined);
    }

    /*start display errors function */
    const displayErr = (field) =>{
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
    /*end display error function*/

    //start handle change function 
    const handleChange = (event) =>{
        validatForm();
        const {name, value} =event.target;
        setClient(prevClient =>(
            {...prevClient,[name]:value}
        ));
        console.log(client);
        setAlertMessage("");
    }

    //start hundle submit functio 
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validatForm()){
            ServiceClient.ajouterClient(client)
                .then(response =>{
                    console.log("le client a été ajouté avec succes",response.data);
                    console.log("le token ",localStorage.getItem('token'));
                    setClient(
                        {"nomClient":'',
                        "prenomClient":'',
                        "codePostal":'', 
                        "ville":'',
                        "pays":'',
                        "tel":'',
                        "email":'',
                        "societe":'',
                        }
                    );
                    handleReset2();
                    setAlertMessage("success");
                })
                .catch(error =>{
                    console.error("error pour l'ajout de client ");
                    setAlertMessage("error");
                })
        }
    }
    const alertOfSucces = () =>{
        return (<div className='alert alert-success ' role="alert">
            le client a été ajouté avec succés
         </div>)
     }
     //function to return alert of error
     //function to return error
     const alertOfError = () =>{
         return(
             <div className='alert alert-danger' role="alert">
                 error dans l'ajout de client 
             </div>
         )
     }
 
     //function to return a correspondant alert
     const alert = (message) =>{
         switch(message){
             case "error":
                 return  alertOfError();
             case "success":
                 return  alertOfSucces();
             default :
                 return null;
             
         }
           
     }

    return (
        <div className="container ajouter-client">
            <div className='row '>
                <div className='col-8 ' >
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-dark'>Nouveau Client</h1>
                        {alert(alertMessage)}
                        <hr></hr>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="nomClient">Nom</label>
                            <input type="text" name="nomClient" id="nomClientField" className="form-control" placeholder='nom' ref={nomClientField} onChange={handleChange} />
                            {displayErr("nomClientField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="prenomClient">Prenom</label>
                            <input type="text" name="prenomClient" id="prenomClientField" className="form-control" placeholder='prenom' ref={prenomClientField} onChange={handleChange} />
                            {displayErr("prenomClientField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="societe">Société</label>
                            <input type="text" name="societe" id="societeField" className="form-control" placeholder='société' ref={societeField} onChange={handleChange} />
                            {displayErr("societeField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="pays">Pays</label>
                            <input type="text" name="pays" id="paysField" className="form-control" placeholder='pays' ref={paysField} onChange={handleChange} />
                            {displayErr("paysField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="ville">Ville</label>
                            <input type="text" name="ville" id="villeField" className="form-control" placeholder='ville' ref={villeField} onChange={handleChange} />
                            {displayErr("villeField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="tel">Tel</label>
                            <input type="tel" name="tel" id="telField" className="form-control" placeholder='tel' ref={telField} onChange={handleChange} />
                            {displayErr("telField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="emailField" className="form-control" placeholder='email' ref={emailField} onChange={handleChange} />
                            {displayErr("emailField")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="codePostal">Code postal</label>
                            <input type="text" name="codePostal" id="codePostalField" className="form-control" placeholder='code  postal'ref={codePostalField} onChange={handleChange} />
                             {displayErr("emailField")}
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

export default AjouterClient