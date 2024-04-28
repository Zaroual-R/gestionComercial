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
import EntrepriseForm from './reglage/EntrepriseForm';
import AjouterCommand from './Commands/AjouterCommand'
import TermesEtConditionsForm from './reglage/TermesEtConditionsForm';
import AddCommand from './Commands/AddCommand';
import ListCommands from './Commands/ListCommands';
import ModefieCommand from './Commands/ModefieCommand';
import CreateLivraison from './livraison/CreateLivraison';
import ModefieFacture from './facture/ModefieFacture';
import ListFactures from './facture/ListFactures';
import CreateFacture from './facture/CreateFacture';
import ListLivraison from './livraison/ListLivraison';
import ModefieLivraison from './livraison/ModefieLivraison';
import AddRole from './UserAndRoleManagement/AddRole';
import ModefieRole from './UserAndRoleManagement/ModefieRole';
import RoleTable from './UserAndRoleManagement/RoleTable';
import AddUser from './UserAndRoleManagement/User/AddUser';
import UserTable from './UserAndRoleManagement/UserTable';
import AjouterFournisseur from './fournisseur/AjouterFournisseur';
import ListFournisseur from './fournisseur/ListFournisseur';
import ModefierFournisseur from './fournisseur/ModefierFournisseur';
import MoreDetails from './fournisseur/MoreDetails';
import CommandeFournisseur from './fournisseur/CommandeFournisseur';
import BonCmdDocument from './fournisseur/BonCmdDocument';
import CreateEmail from './fournisseur/CreateEmail';
import ListCmdFour from './CommandeFour/ListCmdFour';
import DetailsCommande from './CommandeFour/DetailsCommande';
import AjouterBonLivraison from './CommandeFour/AjouterBonLivraison'
import AjouterFactureFour from './CommandeFour/AjouterFactureFour';
import ManageCommande from './CommandeFour/ManageCommande';
import ModefierBonLivraisonFour from './CommandeFour/ModefieBonLivraisonFour';
import ModefieFactureFour from './CommandeFour/ModefierFactureFour';
import FactureDocument from './CommandeFour/FactureDocument';
import LivraisonDocument from './CommandeFour/LivraisonDocument';
import ContacterFournisseur from './fournisseur/ContacterFournisseur';
import ClientDetails from './Clients/ClientDetails';
import DetailsCommandVente from './Commands/DetailsCommandVente';
import EditProfilt from './Uitilisateur/EditProfil'
/*import ForgetPassword from './Auth/ForgetPassword';
import RegisterForm from './Auth/RegisterForm';
import LoginForm from './Auth/LoginForm';
import ChangePassword from './Auth/changePass/ChangePassword';
 */
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
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AjouterFournisseur" element={<AjouterFournisseur />} />
        <Route path="/ListFournisseur" element={<ListFournisseur />} />
        <Route path='/ModefierFournisseur' element={<ModefierFournisseur />} />
        <Route path='/MoreDetails' element={<MoreDetails />} />
        <Route path="/CommandeFournisseur" element={<CommandeFournisseur />} />
        <Route path="/BonCmdDocument" element={<BonCmdDocument />} />
        <Route path='/CreateEmail' element={<CreateEmail />} />
        <Route path='/ListCmdFour' element={<ListCmdFour />} />
        <Route path='/DetailsCommande' element={<DetailsCommande />} />
        <Route path='/AjouterBonLivraison' element={<AjouterBonLivraison />} />
        <Route path='/ModefierBonLivraisonFour' element={<ModefierBonLivraisonFour />} />
        <Route path='/AjouterFactureFour' element={<AjouterFactureFour />} />
        <Route path='/AjouterFactureFour' element={<ModefieFactureFour />} />
        <Route path='/ModefierFactureFour' element={<ModefieFactureFour />} />
        <Route path='/ManageCommande' element={<ManageCommande />} />
        <Route path='/FactureDocument' element={<FactureDocument />} />
        <Route path='/LivraisonDocument' element={<LivraisonDocument />} />
        <Route path='/ContacterFournisseur' element={<ContacterFournisseur />} />
        {/* Les autres routes existantes... */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/AjouterProduit" element={<AjouterProduit />} />
        <Route path="/ListProduit" element={<ListProduit />} />
        <Route path="/AjouterCategorie" element={<AjouterCategorie />} />
        <Route path="/ListCategorie" element={<ListCategorie />} />
        <Route path="/AjouterClient" element={<AjouterClient />} />
        <Route path="/ListClients" element={<ListeClients />} />
        <Route path="/AddDevis" element={<AddDevis />} />
        <Route path="/ListDevis" element={<ListDevis />} />
        <Route path="/ModefieProduit" element={<ModefieProduit />} />
        <Route path="/ModefieCategorie/:idCat" element={<ModefieCategorie />} />
        <Route path="/ModefieClient" element={<ModefieClient />} />
        <Route path="/AjouterCmd" element={<AjouterCmd />} />
        <Route path="/ModefieDevis" element={<ModefieDevis />} />
        <Route path="/entreprise" element={<EntrepriseForm />} />
        <Route path="/remarqueAndCondition" element={<TermesEtConditionsForm />} />
        <Route path="/AddCommand" element={<AddCommand />} />
        <Route path="/AjouterCommand" element={<AjouterCommand />} />
        <Route path="/ListCommand" element={<ListCommands />} />
        <Route path="/ModefieCommand" element={<ModefieCommand />} />
        <Route path="/createLivraison" element={<CreateLivraison />} />
        <Route path="/ModefieFacture" element={<ModefieFacture />} />
        <Route path="/ListFacture" element={<ListFactures />} />
        <Route path="/createFacture" element={<CreateFacture />} />
        <Route path="/ModefieLivraison" element={<ModefieLivraison />} />
        <Route path="/ListLivraison" element={<ListLivraison />} />
        <Route path="/AddRole" element={<AddRole />} />
        <Route path="/ModifierRole" element={<ModefieRole />} />
        <Route path="ListRoles" element={<RoleTable />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/UserTable" element={<UserTable />} />
        <Route path="/CleintDetails" element={<ClientDetails />} />
        <Route path="/CommandeVenteDetails" element={<DetailsCommandVente />} />
        <Route path='/EditProfil'      element={<EditProfilt/>}/>
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
