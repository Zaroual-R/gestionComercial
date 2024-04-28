import React, { useRef, useState } from 'react'
import ModalPassword from './ModalPassword';

function EditProfil() {
    const firstname = useRef();
    const lastname = useRef();
    const birthday = useRef();
    const email = useRef();
    const phoneNumber = useRef();
    const address = useRef();
    const profilPicture =useRef();
    const [userUpdate,setUserUpdate]=useState({firstname:"",lastname:"",birthday:"",email:"",phoneNumber:"",address:"",profilPicture:null})


    const [showModalPassword, setShowModalPassword] = useState(false);

    const handleChangePassword = () => {
        setShowModalPassword(true);
    }
    const handleProfilePictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            // Ici, vous pouvez gérer le fichier sélectionné,
            // par exemple en le prévisualisant ou en le téléchargeant sur un serveur
            const fileReader = new FileReader();
            fileReader.onload = function(e) {
                // Mettez à jour l'image affichée avec e.target.result
            };
            fileReader.readAsDataURL(event.target.files[0]);
        }
    }
    const handleProfilePictureClick = () => {
        profilPicture.current.click();
    }

    const handleChange =(event) =>{
        const {name,value,type} =event.target;
        if(type ==='file'){
            setUserUpdate(PrevState =>(
                {
                    ...PrevState,
                    [name]:event.target.files[0]
                }
            ))
        }
        else{
            setUserUpdate(prevState =>(
                {
                    ...prevState,
                    [name]:value
                }
            ))
        }
        console.log(userUpdate);
    }
    return (
        <div className="container Myprofil Myfont">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header  text-white cardHeader" style={{ textAlign: "center" }}>
                            <h3>Profile</h3>
                        </div>
                        <div className="card-body cardBody" style={{ backgroundColor: "#f0f0f0", padding: "0px", border: "solid 1px #BA68C8" }} >
                            <div className="row" style={{width:"100%"}}>
                                <div className="col-md-4 border-right left-side">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img
                                            className="rounded-circle mt-5"
                                            width="150px"
                                            src="../dist/img/avatar5.png"
                                            onClick={handleProfilePictureClick}
                                            alt="Profile"
                                            style={{ cursor: 'pointer' }} // Style pour montrer que l'image est cliquable
                                        />
                                        <input
                                            type="file"
                                            id="profilPicture"
                                            ref={profilPicture}
                                            onChange={handleProfilePictureChange}
                                            style={{ display: 'none' }} // Cache l'input file
                                        />
                                        <span className="font-weight-bold">Rachid Zaroual</span>
                                        <span className="">rachidginf@gmail.com</span>
                                        <span> Crée en :10/01/2023</span>
                                    </div>
                                </div>
                                <div className="col-md-8 bg-white right-side">
                                    <div className="p-3 ">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Editer profile</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Nom :</label>
                                                <input type="text" name="firstname" id="firstname" rer={firstname} className="form-control" placeholder="saisir votre nome"  />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Prénom : </label>
                                                <input type="text" name="lastname" id="lastname" ref={lastname} className="form-control"  placeholder="saisir votre prénom" />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <label className="labels">Date Naissance : </label>
                                                <input type="text" name="birthday" id="birthday" ref={birthday} className="form-control" placeholder="saisir votre date de naissance"  />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Address :</label>
                                                <input type="text" name="address" id="address" ref={address} className="form-control" placeholder="saisir votre address"  />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Numéro téléphone :</label>
                                                <input type="text" name="phoneNumber" id="phoneNumber" ref={phoneNumber} className="form-control" placeholder="saisir votre numéro téléphone"  />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Email : </label>
                                                <input type="text" name="email" id="email" ref={email} className="form-control" placeholder="saisir votre email"  />
                                            </div>
                                        </div>
                                        <div className="mt-4 ">
                                            <button className="btn btn-primary profile-button" type="button">Enregistrer</button>&nbsp;&nbsp;
                                            <button className="btn btn-primary profile-button" type="button" onClick={handleChangePassword}>changer le mot de passe</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <ModalPassword show={showModalPassword} onHide={() => setShowModalPassword(false)} />
            </div >
        </div >

    )
}

export default EditProfil
