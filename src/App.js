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
import AjouterCmd from './Commands/AjouterCmd';
import ListCommande from './Commands/ListCommande';
import ModefieCmd from './Commands/ModefieCmd';
import AddCmd from './Commands/AddCmd';
import ModefieCategorie from './Categorie/ModefieCategorie';
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
          <Route path="/AjouterProduit"      element={<AjouterProduit/>}/>
          <Route path="/ListProduit"         element={<ListProduit/>}/>
          <Route path="/AjouterCategorie"    element={<AjouterCategorie/>}/>
          <Route path="/ListCategorie"       element={<ListCategorie/>}/>
          <Route path="/AjouterClient"       element={<AjouterClient/>}/>
          <Route path="/ListClients"         element={<ListeClients/>}/>
          <Route path="/AddCmd"              element={<AddCmd/>}/>
          <Route path="/ListCommande"        element={<ListCommande/>}/>
          <Route path="/ModefieProduit"      element={<ModefieProduit />} />
          <Route path="/ModefieCategorie/:idCat" element={<ModefieCategorie/>}/>
          <Route path="/ModefieClient"       element={<ModefieClient/>}/>
          <Route path="/AjouterCmd"          element={<AjouterCmd/>}/>
          <Route path="/ModefieCmd"          element={<ModefieCmd/>}/>
          <Route path="/AjouterFournisseur"  element={<AjouterFournisseur/>}/>
          <Route path="/ListFournisseur"     element={<ListFournisseur/>}/>
          <Route path='/ModefierFournisseur' element={<ModefierFournisseur/>}/>
          <Route path='/MoreDetails'         element={<MoreDetails/>}/>
          <Route path="/CommandeFournisseur" element={<CommandeFournisseur/>}/>
          <Route path="/BonCmdDocument"      element={<BonCmdDocument/>}></Route>
          <Route path='/CreateEmail'         element={<CreateEmail/>}/>
          <Route path='/ListCmdFour'         element={<ListCmdFour/>}/>
          <Route path='/DetailsCommande'     element={<DetailsCommande/>}/>
          <Route path='/AjouterBonLivraison' element={<AjouterBonLivraison/>}/>
          <Route path='/ModefierBonLivraisonFour' element={<ModefierBonLivraisonFour/>}/>
          <Route path='/AjouterFactureFour'  element={<AjouterFactureFour/>}/>
          <Route path='/AjouterFactureFour'  element={<ModefieFactureFour/>}/>
          <Route path='/ModefierFactureFour' element={<ModefieFactureFour/>}/>
          <Route path='/ManageCommande'      element={<ManageCommande/>} /> 
          <Route path='/FactureDocument'     element={<FactureDocument/>}/>
          <Route path='/LivraisonDocument'   element={<LivraisonDocument/>}/>
        </Routes>
        <Footer />      
    </BrowserRouter>
  );
}

export default App;
