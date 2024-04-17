

import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import BonLivFourService from '../backEndService/BonLivFourService';

const AjouterBonLivraison = () => {
  const dateBonLivraison=useRef();
  const qualiteLivraison1 =useRef();
  const cache1=useRef();
  const location = useLocation();
  const { state } = location;
  const idCmd = state.idCmd;
  const [dateLivraison, setDateLivraison] = useState('');
  const [qualiteLivraison, setQualiteLivraison] = useState('');
  const [cache, setCache] = useState(false);
  const [bonLivFourDto,setBonLivFourDto]=useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const navigate=useNavigate();

  const closeAlert = () => {
    setShowAlert(false);
  };

  //function to reset form
  const resetForm = () =>{
    dateBonLivraison.current.value='';
    qualiteLivraison1.current.value='';
    cache1.current.value='';
  }

  const handleInputChange = (event) => {
    setAlertMessage('');
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setCache(checked);
    } else {
      if (name === 'dateBonLivraison') {
        setDateLivraison(value);
      } else if (name === 'qualiteLivraison') {
        setQualiteLivraison(value);
      }
    }
    const bonlivraisonDto = {
      "idCommandeFour": idCmd,
      "dateLivraison": dateLivraison,
      "cache": cache,
      "qualiteLivraison": qualiteLivraison
    };
    setBonLivFourDto(bonlivraisonDto);
    console.log(bonLivFourDto);
  };

  //function de gestion des alerts

  const alertOfError = () => {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >error dans l'ajoute de bon livraison </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
  const alertSuccess = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >bon livraison à été ajouté avec succés </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
  const alert = (alertMessage) => {
    switch (alertMessage) {
      case "error":
        return alertOfError();
      case "success":
        return alertSuccess();
      case "":
        return null;
    }
  }
  
  const navigateToDetails =(idCmd)=>{
    navigate("/DetailsCommande",{state:{idCmd}})
}

  const handleSubmit = (event) => {
    event.preventDefault();
    BonLivFourService.createBonLivFour(bonLivFourDto)
      .then(response =>{
        setAlertMessage("success");
        resetForm();
        navigateToDetails(idCmd);
      })
      .catch(error =>{
        console.error("error to create bon livraison ",error);
        setAlertMessage('error');
      })

  };

  return (
    <div className='container mt-2 ajouter-bonLivraison Myfont'>
      <div className='row'>
        <div className='col-12'>
          <div className='card' style={{ maxHeight: 'calc(100vh - 100px)', width: "800" }}>
            <div className='card-header bg-dark '>
              <h3>Ajouter Bon livraison</h3>
              {alert(alertMessage)}
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dateBonLivraison">Date de livraison</label>
                    <input type="date" className="form-control" name="dateBonLivraison" id="dateBonLivraison" ref={dateBonLivraison} value={dateLivraison} onChange={handleInputChange} placeholder="date bon livraison" required />
                  </div>
                  <div className="form-group col-md-6">
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="qualiteLivraison">Qualite de livraison</label>
                    <select className="form-control" name="qualiteLivraison" id="qualiteLivraison1" ref={qualiteLivraison1} value={qualiteLivraison} onChange={handleInputChange} required>
                      <option value=''>Select qualite de livraison </option>
                      <option value='BON'>bon</option>
                      <option value='MOYENNE'>moyenne</option>
                      <option value='MOUVAIS'>mauvais</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group com-md-6'>
                    &nbsp; &nbsp;<span style={{ fontWeight: 'bolder' }}>Caché :</span> &nbsp; &nbsp; &nbsp;<input className="form-check-input" type="checkbox" id="cache1" ref={cache1} checked={cache} onChange={handleInputChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary"><i className='fas fa-plus'></i> Ajouter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterBonLivraison;
