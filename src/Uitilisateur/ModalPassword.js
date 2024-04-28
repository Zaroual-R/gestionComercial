import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalPassword({ show, onHide }) {
    const ancienPassword=useRef();
    const nouveauPassword=useRef();
    const confirmPassword=useRef();
    const [PasswordChange ,setPasswordChange]=useState({ancienPassword:"",nouveauPassword:"",confirmPassword:""});

    const handleChange = (event) =>{
        const {name,value} =event.target;
        setPasswordChange(prevState =>(
            {
                ...prevState,
                [name]:value
            }
        ))
        console.log(PasswordChange);
    }

    const handleSubmite = (event ) =>{
        event.preventDefault();

    }
    return (
        <>
            <Modal show={show} onHide={onHide} centered  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <Modal.Header closeButton style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                    <Modal.Title>Changer le mot de passe</Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                    <Form onSubmit={handleSubmite}>
                        <Form.Group className="mb-3" controlId="ancienPassword">
                            <Form.Label>Ancien mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Entrez l'ancien mot de passe"
                                name="ancienPassword"
                                ref={ancienPassword}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nouveauPassword">
                            <Form.Label>Nouveau mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Entrez le nouveau mot de passe"
                                name="nouveauPassword"
                                ref={nouveauPassword}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nouveauPassword">
                            <Form.Label>cofirmation de mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="confirmer le mot de passe"
                                name="confirmPassword"
                                ref={confirmPassword}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                    <Button variant="secondary" onClick={onHide}>
                        Annuler
                    </Button>
                    <Button variant="primary">
                        Enregistrer les modifications
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default ModalPassword;