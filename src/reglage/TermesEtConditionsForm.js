import React, { useEffect, useState } from 'react';
import ConditionsEtRemarquesService from '../backEndService/ConditionsEtRemarquesService';

const TermesEtConditionsForm = () => {
    const [formData, setFormData] = useState({
        conditionsGenerales: '',
        remarques: '',
        type: '' 
    });
    const [termes, setTermes] = useState({});
    /*useEffect(()=>{
        console.log(termes)
        setFormData({
            conditionsGenerales: termes.conditionsGenerales,
            remarques: termes.remarques,
            type: termes.type
        });

    },[termes])*/
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleChangeForSelect = (e) => {
        //setFormData({...formData, [e.target.name]: e.target.value});
        ConditionsEtRemarquesService.getConditionsEtCategories(e.target.value).then(response =>{
            setFormData({
                conditionsGenerales: response.data.conditionsGenerales,
                remarques: response.data.remarques,
                type: response.data.type
            });
        })
        
        /*setFormData({
            conditionsGenerales: termes.conditionsGenerales,
            remarques: termes.remarques,
            type: termes.type
        })*/
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        ConditionsEtRemarquesService.createConditionsEtCategories(formData)
        .then(response => {
            console.log("les remarques et les conditions sont ajoutés avec succés ", response.data)
            setFormData({
                conditionsGenerales: '',
                remarques: '',
                type: ''
            })
        }).catch(error => console.log(error))
        console.log(formData);
    }

    return (
<div className="container Myfont">
    <div className="row">
        <div className="col">
            <div className="card shadow-sm" style={{ marginTop: '20px' }}>
                <div className="card-body">
                    <h2 className="text-center" style={{ color: '#0275d8' }}>Termes et Conditions</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="conditionsGenerales" className="form-label" style={{ fontWeight: 'bold' }}>Conditions Générales</label>
                            <textarea className="form-control" id="conditionsGenerales" name="conditionsGenerales" rows="3" value={formData.conditionsGenerales} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="remarques" className="form-label" style={{ fontWeight: 'bold' }}>Remarques</label>
                            <textarea className="form-control" id="remarques" name="remarques" rows="2" value={formData.remarques} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label" style={{ fontWeight: 'bold' }}>Type</label>
                            <select className="form-select" id="type" name="type" value={formData.type} onChange={handleChangeForSelect}>
                                <option value="">Sélectionnez un type</option>
                                <option value="FACTURE">Facture</option>
                                <option value="DEVIS">Devis</option>
                                <option value="COMMAND">Commande</option>
                                <option value="LIVRAISON">Livraison</option>
                            </select>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Soumettre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


    );
}

export default TermesEtConditionsForm;
