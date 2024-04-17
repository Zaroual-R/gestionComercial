import React, { useState, useRef ,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FactureFourService from '../backEndService/FactureFourService';


const ModefierFactureFour = () => {
  const dateFacture = useRef();
  const statusPaiement = useRef();
  const moyenneReglement = useRef();
  const valide = useRef();
  const file = useRef();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location || {};
  const idCmd = state.idCmd;
  const facture = state.facture;

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [factureDto, setFactureDto] = useState({
    "idCommande": idCmd,
    "dateFacture": formatDate(facture.dateFacture),
    "statusPaiement": facture.statusPaiement,
    "moyenneReglement": facture.moyenneReglement,
    "valide": facture.valide
  })
  const [selectedFile,setSelectedFile] =useState(facture.fileData)

  useEffect( () =>{
    if(facture){
      initForm();
    }
  },[])


  const closeAlert = () => {
    setShowAlert(false);
  };

  //funciton to reset form 
  const resetForm = () => {
    dateFacture.current.value = '';
    statusPaiement.current.value = '';
    moyenneReglement.current.value = '';
    valide.current.value = false;
    file.current.value='';
  }

  const initForm = () => {
    dateFacture.current.value =formatDate(facture.dateFacture);
    moyenneReglement.current.value=facture.moyenneReglement;
    statusPaiement.current.value=facture.statusPaiement;
    valide.current.checked=facture.valide;
    file.current.value=facture.fileData;
  }


  const handleInputChange = (event) => {
    setAlertMessage('');
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFactureDto(prevState => ({
        ...prevState,
        [name]: checked
      }))
    }
    else {
      setFactureDto(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    console.log(factureDto);

  };

  //function de gestion des alerts

  const alertOfError = () => {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >error dans l'ajoute de facture </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
  const alertSuccess = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >la facture à été ajouté avec succés </span>
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

  const navigatToDetails = (idCmd) =>{
    navigate("/DetailsCommande",{state:{idCmd}});
  }

  //functio to navigate to detail commande
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(factureDto);
    FactureFourService.updateFacture(factureDto,facture.idFacture)
      .then(response => {
        console.log("update facture was succed")
        resetForm();
        setAlertMessage("success");
        setFactureDto({});
        navigatToDetails(idCmd);
      })
      .catch(error => {
        setAlertMessage("error");
        console.error("error to create facture", error);
      })

  };

  return (
    <div className='container mt-2 ajouter-facture Myfont'>
      <div className='row'>
        <div className='col-12'>
          <div className='card' style={{ maxHeight: 'calc(100vh - 100px)', width: "800" }}>
            <div className='card-header bg-dark '>
              <h3>Ajouter Facture</h3>
              {alert(alertMessage)}
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dateFacture">Date du facture</label>
                    <input type="date" className="form-control" name="dateFacture" id="dateFacture" ref={dateFacture} onChange={handleInputChange} placeholder="date facture" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="moyenneReglement">Mode de réglement</label>
                    <select className="form-control" name="moyenneReglement" id="moyenneReglement" ref={moyenneReglement} onChange={handleInputChange} required>
                      <option value=''>Select mode de reglement </option>
                      <option value='CACH_ON_DELIVRY'>cach on delivery</option>
                      <option value='CHEQUE'>chéque</option>
                      <option value='VAIREMENTBANCAIRE'>vairement bancaire</option>
                      <option value='TRAITEBANCAIRE'>traite bancaire</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="statusPaiement">Status Paiement</label>
                    <select className="form-control" name="statusPaiement" id="statusPaiement" ref={statusPaiement} onChange={handleInputChange} required>
                      <option value=''>Select status de paiement </option>
                      <option value='CONTISTEE'>constistee</option>
                      <option value='PAYEE'>payée</option>
                      <option value='PARIELLEMENT_PAYEE'>partiellement payée</option>
                      <option value='EN_RETARD'>en retard</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-6">
                   <label htmlFor="file">Date du facture</label>
                   <input type="file" className="form-control" name="file" id="file" ref={file} onChange={handleInputChange} placeholder=" facture document " required />
                </div>
                <div className='form-row'>
                  <div className='form-group com-md-6'>
                    &nbsp; &nbsp;<span style={{ fontWeight: 'bolder' }}>Valide :</span> &nbsp; &nbsp; &nbsp;<input className="form-check-input" type="checkbox" name='valide' id="valide" ref={valide} onChange={handleInputChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Modefie</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModefierFactureFour;

