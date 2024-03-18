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
          <Route path="/AjouterProduit" element={<AjouterProduit/>}/>
          <Route path="/ListProduit" element={<ListProduit/>}/>
          <Route path="/AjouterCategorie" element={<AjouterCategorie/>}/>
          <Route path="/ListCategorie" element={<ListCategorie/>}/>
          <Route path="/AjouterClient" element={<AjouterClient/>}/>
          <Route path="/ListClients" element={<ListeClients/>}/>
          <Route path="/AddCmd" element={<AddCmd/>}/>
          <Route path="/ListCommande" element={<ListCommande/>}/>
          <Route path="/ModefieProduit" element={<ModefieProduit />} />
          <Route path="/ModefieCategorie/:idCat" element={<ModefieCategorie/>}/>
          <Route path="/ModefieClient" element={<ModefieClient/>}/>
          <Route path="/AjouterCmd" element={<AjouterCmd/>}/>
          <Route path="/ModefieCmd"  element={<ModefieCmd/>}/>
        </Routes>
        <Footer />      
    </BrowserRouter>
  );
}

export default App;
