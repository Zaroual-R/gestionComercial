import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceClient from '../backEndService/ServiceClient';
const ModefieClient = () => {
    const nomClientField1 = useRef();
    const prenomClientField1 = useRef();
    const societeField1 = useRef();
    const paysField1 = useRef();
    const villeField1 = useRef();
    const telField1 = useRef();
    const emailField1 = useRef();
    const codePostalField1 = useRef();
    const [errors, setErrors] = useState({});
    const [alertMessage,setAlertMessage]=useState("");
    let isValide = true;

    const location = useLocation()
    const { state } = location;
    const { idC, nomC, prenomC, societeC, paysC, villeC, telC, emailC, codePostalC } = state || {};
    const [client, setClient] = useState(
        {
            "nomClient": nomC,
            "prenomClient": prenomC,
            "codePostal": codePostalC,
            "ville": villeC,
            "pays": paysC,
            "tel": telC,
            "email": emailC,
            "societe": societeC,
        })

    useEffect(() => {
        inializeFrom();
    }, []);

    // function to initialize form fieds
    const inializeFrom = () => {
        nomClientField1.current.value = nomC;
        prenomClientField1.current.value = prenomC;
        societeField1.current.value = societeC;
        paysField1.current.value = paysC;
        villeField1.current.value = villeC;
        telField1.current.value = telC;
        emailField1.current.value = emailC;
        codePostalField1.current.value = codePostalC;
    }

    /*fucnction to reset form after click modefier buttom*/
    const handleReset2 = () => {
        nomClientField1.current.value = ''
        prenomClientField1.current.value = ''
        societeField1.current.value = ''
        paysField1.current.value = ''
        villeField1.current.value = ''
        telField1.current.value = ''
        emailField1.current.value = ''
        codePostalField1.current.value = ''
    }
    /*start form validation function*/
    const validatForm = () => {
        setErrors({});
        const nomValue = nomClientField1.current.value;
        const prenomValue = prenomClientField1.current.value;
        const societeValue = societeField1.current.value;
        const paysValue = paysField1.current.value;
        const villeValue = villeField1.current.value;
        const telValue = telField1.current.value;
        const emailValue = emailField1.current.value;
        const codePostalValue = codePostalField1.current.value;

        if (nomValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ nomClientField1: "nom required" } } });
            isValide = false;
        }
        if (prenomValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ prenomClientField1: "prenom required" } } });
            isValide = false;
        }
        if (paysValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ paysField1: "pays required" } } });
            isValide = false;
        }
        if (villeValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ villeField1: "ville required" } } });
            isValide = false;
        }
        if (telValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ telField1: "tel required" } } });
            isValide = false;
        }
        if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setErrors(prevState => { return { ...prevState, ...{ emailField1: "email required" } } });
            isValide = false;
        }
        if (codePostalValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ codePostalField1: "codePostal required" } } });
            isValide = false;
        }
        return isValide;
    }
    /*end form validation function*/

    // start handle Reset 
    const handleReset = (e) => {
        e.preventDefault();
        nomClientField1.current.value = ''
        prenomClientField1.current.value = ''
        societeField1.current.value = ''
        paysField1.current.value = ''
        villeField1.current.value = ''
        telField1.current.value = ''
        emailField1.current.value = ''
        codePostalField1.current.value = ''
    }

    //start get error function of given field
    const getError = (field) => {
        return errors[field];
    }

    //start has error function of given field
    const hasError = (field) => {
        return (getError(field) !== undefined);
    }

    /*start display errors function */
    const displayErr = (field) => {
        const element = document.querySelector(`#${field}`);
        if (hasError(field)) {
            element.style.border = "1px solid red";
            return (
                <div>
                    <div className='text text-danger'>{getError(field)}</div>
                </div>
            )
        }
        if (element !== null) {
            element.removeAttribute('style');
        }
        return null;
    }
    /*end display error function*/

    //start handle change function 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setClient(prevClient => ({
            ...prevClient,
            [name]: value
        }));
        console.log(client);
        validatForm(); // Valider le formulaire après chaque changement
        setAlertMessage("")
    }

    //start hundle submit functio 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatForm()) {
            ServiceClient.updateClient(client, idC)
                .then(responce => {
                    console.log("le client a été modifié avec succes", responce.data);
                    setClient(
                        {
                            "nomClient": '',
                            "prenomClient": '',
                            "codePostal": '',
                            "ville": '',
                            "pays": '',
                            "tel": '',
                            "email": '',
                            "societe": '',
                        }
                    );
                    handleReset2();
                    setAlertMessage("success")
                })
                .catch(error => {
                    console.error("error de modefication de client");
                    setAlertMessage("error")
                })
        }
    }
    const alertOfSucces = () =>{
        return (<div className='alert alert-success ' role="alert">
            le client a été modefié avec succés
         </div>)
     }
     //function to return alert of error
     //function to return error
     const alertOfError = () =>{
         return(
             <div className='alert alert-danger' role="alert">
                 error dans la modefication de client 
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
                        <h2 className='text-dark'>Modefier Client</h2>
                        {alert(alertMessage)}
                        <hr></hr>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="nomClient">Nom</label>
                            <input type="text" name="nomClient" id="nomClientField1" className="form-control" placeholder='nom' ref={nomClientField1} onChange={handleChange} />
                            {displayErr("nomClientField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="prenomClient">Prenom</label>
                            <input type="text" name="prenomClient" id="prenomClientField1" className="form-control" placeholder='prenom' ref={prenomClientField1} onChange={handleChange} />
                            {displayErr("prenomClientField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="societe">Société</label>
                            <input type="text" name="societe" id="societeField1" className="form-control" placeholder='société' ref={societeField1} onChange={handleChange} />
                            {displayErr("societeField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="pays">Pays</label>
                            <input type="text" name="pays" id="paysField1" className="form-control" placeholder='pays' ref={paysField1} onChange={handleChange} />
                            {displayErr("paysField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="ville">Ville</label>
                            <input type="text" name="ville" id="villeField1" className="form-control" placeholder='ville' ref={villeField1} onChange={handleChange} />
                            {displayErr("villeField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="tel">Tel</label>
                            <input type="tel" name="tel" id="telField1" className="form-control" placeholder='tel' ref={telField1} onChange={handleChange} />
                            {displayErr("telField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="emailField1" className="form-control" placeholder='email' ref={emailField1} onChange={handleChange} />
                            {displayErr("emailField1")}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="codePostal">Code postal</label>
                            <input type="text" name="codePostal" id="codePostalField1" className="form-control" placeholder='code  postal' ref={codePostalField1} onChange={handleChange} />
                            {displayErr("emailField1")}
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

export default ModefieClient