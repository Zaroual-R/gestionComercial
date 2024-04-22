import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import ModefieProduit from './Produit/ModefieProduit';
import AjouterCategorie from './Categorie/AjouterCategorie';
import AjouterClient from './Clients/AjouterClient';
import ListProduit from './Produit/listProduit';
import ListCategorie from './Categorie/ListCategorie';
import ListeClients from './Clients/ListeClients'; 
import ModefieClient from './Clients/ModefieClient';
import AjouterProduit from './Produit/AjouterProduit';
import AjouterCmd from './devis/AjouterCmd';
import ListDevis from './devis/ListDevis';
import ModefieDevis from './devis/ModefieDevis';
import AddDevis from './devis/AddDevis';
import ModefieCategorie from './Categorie/ModefieCategorie';
import MaListe from './components/test/MaListe';
import EntrepriseForm from './reglage/EntrepriseForm';
import PDFViewer from './components/test/PDFViewer';
import AjouterCommand from './Commands/AjouterCommand'
import TermesEtConditionsForm from './reglage/TermesEtConditionsForm';
import AddCommand from './Commands/AddCommand';
import ListCommands from './Commands/ListCommands';
import MyComponent from './components/test/MyComponent';
import ModefieCommand from './Commands/ModefieCommand';
import CreateLivraison from './livraison/CreateLivraison';
import ModefieFacture from './facture/ModefieFacture';
import ListFactures from './facture/ListFactures';
import CreateFacture from './facture/CreateFacture';
import ListLivraison from './livraison/ListLivraison';
import ModefieLivraison from './livraison/ModefieLivraison';
import ForgetPassword from './Auth/ForgetPassword';
import RegisterForm from './Auth/RegisterForm';
import LoginForm from './Auth/LoginForm';
import ChangePassword from './Auth/changePass/ChangePassword';
/*<Header/>
<div className="wrapper">

        <Menu/>
        <Dashboard/>
        <Footer/>  
</div>
*/
function App() {
  return (



   <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/LoginHelp" element={<ForgetPassword/>} />
          <Route path="/resetPassword" element={<ChangePassword/>} />
        </Routes>
        <Routes>
          <Route path="/" element={<><Header /><Menu /><Dashboard /></>} />
          <Route path="/AjouterProduit" element={<><Header /><Menu /><AjouterProduit/></>}/>
          <Route path="/ListProduit" element={<><Header /><Menu /><ListProduit/></>}/>
          <Route path="/AjouterCategorie" element={<><Header /><Menu /><AjouterCategorie/></>}/>
          <Route path="/ListCategorie" element={<><Header /><Menu /><ListCategorie/></>}/>
          <Route path="/AjouterClient" element={<><Header /><Menu /><AjouterClient/></>}/>
          <Route path="/ListClients" element={<><Header /><Menu /><ListeClients/></>}/>
          <Route path="/AddDevis" element={<><Header /><Menu /><AddDevis/></>}/>
          <Route path="/ListDevis" element={<><Header /><Menu /><ListDevis/></>}/>
          <Route path="/ModefieProduit" element={<><Header /><Menu /><ModefieProduit /></>} />
          <Route path="/ModefieCategorie/:idCat" element={<><Header /><Menu /><ModefieCategorie/></>}/>
          <Route path="/ModefieClient" element={<><Header /><Menu /><ModefieClient/></>}/>
          <Route path="/AjouterCmd" element={<><Header /><Menu /><AjouterCmd/></>}/>
          <Route path="/ModefieDevis"  element={<><Header /><Menu /><ModefieDevis/></>}/>    
          <Route path="/entreprise" element={<><Header /><Menu /><EntrepriseForm/></>} />   
          <Route path="/remarqueAndCondition" element={<><Header /><Menu /><TermesEtConditionsForm/></>} />  
          <Route path="/AddCommand" element={<><Header /><Menu /><AddCommand/></>} />
          <Route path="/AjouterCommand" element={<><Header /><Menu /><AjouterCommand /></>}/>
          <Route path="/ListCommand" element={<><Header /><Menu /><ListCommands/></>} />
          <Route path="/ModefieCommand" element={<><Header /><Menu /><ModefieCommand/></>} />
          <Route path="/createLivraison" element={<><Header /><Menu /><CreateLivraison /></>} />
          <Route path="/ModefieFacture" element={<><Header /><Menu /><ModefieFacture /></>} />
          <Route path="/ListFacture" element={<><Header /><Menu /><ListFactures /></>} />
          <Route path="/createFacture" element={<><Header /><Menu /><CreateFacture /></>} />
          <Route path="/ModefieLivraison" element={<><Header /><Menu /><ModefieLivraison /></>} />
          <Route path="/ListLivraison" element={<><Header /><Menu /><ListLivraison /></>} />
        </Routes>
        <Footer />      

    </BrowserRouter>

  );
}

/*const App = () => {
  // L'ID de devis pour lequel afficher le PDF
  const devisId = '28'; // Exemple, remplacez par l'ID dynamique si nécessaire

  return (
    <div>
      <h2>Visualiseur de PDF</h2>
      <PDFViewer devisId={devisId} />
    </div>
  );
};*/


export default App;
