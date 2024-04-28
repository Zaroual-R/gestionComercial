import React from "react"

const ResetPass = ()=>{

    return (
        <div className="toute">
            <div className="App">
                <form onSubmit={handleSubmit}>
                    <h2>Changer le mot de passe</h2>
                    <div className="Field">
                        <label>Nouveau mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez le nouveau mot de passe"
                        />
                    </div>
                    <div className="Field">
                        <label>Réécrire le mot de passe</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmez le nouveau mot de passe"
                        />
                    </div>
                    <button className="button" type="submit" disabled={!getIsFormValid()}>
                        Changer le mot de passe
                    </button>
                </form>
            </div>
        </div>
    );
}