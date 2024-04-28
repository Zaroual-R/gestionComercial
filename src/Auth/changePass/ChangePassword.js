import React, { useState } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();

    // Fonction pour extraire le token du query string
    const getQueryParams = () => new URLSearchParams(location.search);
    const token = getQueryParams().get('token');

    const getIsFormValid = () => password && confirmPassword && password === confirmPassword;

    const handleResetPassword = async () => {
        if (!getIsFormValid()) {
          alert('Le mot de passe et la confirmation doivent être identiques.');
          return;
        }
      
        const resetPasswordData = {
          token: token,
          newPassword: password,
        };
      
        try {
          const response = await axios.post('http://localhost:8088/api/appUser/reset-password', resetPasswordData);
          console.log(response.data);
          alert('Mot de passe mis à jour avec succès.');
          // Vous pouvez rediriger l'utilisateur vers la page de connexion ou toute autre page ici
        } catch (error) {
          console.error('Échec de la réinitialisation du mot de passe:', error.response?.data || error.message);
          alert('Échec de la réinitialisation du mot de passe.');
        }
      };
      
      // Assurez-vous d'appeler cette fonction dans votre handleSubmit
      const handleSubmit = (e) => {
        e.preventDefault();
        handleResetPassword();
      };

    return (
        <div className="toutet">
            <div className="ApppForget">
                <form onSubmit={handleSubmit}>
                    <h2>Changer le mot de passe</h2>
                    <div className="Fieldo">
                        <input
                            className='inputo'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez le nouveau mot de passe"
                        />
                    </div>
                    <div className="Field">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmez le nouveau mot de passe"
                        />
                    </div>
                    <button className="buttono" type="submit" disabled={!getIsFormValid()}>
                        Changer le mot de passe
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
