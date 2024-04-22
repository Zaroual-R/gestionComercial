import React from 'react';
import { NavLink, Link } from 'react-router-dom';
const Menu = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 my-aside">
      {/* Brand Logo */}
      <NavLink to='/' className='brand-link'>
        <img src="../dist/img/meta.png" alt="logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">MetaCommerce</span>
      </NavLink>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="UserImage" />
          </div>
          <div className="info">
            <a href="#" className="d-block text-md">Rachid Zaroual</a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
         <li className="nav-item has-treeview menu-open">
            <NavLink to='/' className='nav-link active'>
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className=""></i>
              </p>
            </NavLink>
          </li>
            <li className="nav-item">
              <NavLink to='/' className='nav-link'>
                <i className="nav-icon fas fa-th" />
                <p>
                  Widgets
                  <span className="right badge badge-danger">New</span>
                </p>
              </NavLink>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-copy" />
                <p>
                  Produits
                  <i className="fas fa-angle-left right" />
                  <span className="badge badge-info right">6</span>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/AjouterProduit" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter produit</p>
                  </NavLink>
                </li>
                <li className="nav-item" >
                  <NavLink to="/ListProduit" className="nav-link"  >
                    <i className="far fa-circle nav-icon" />
                    <p>Listes produits</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/AjouterCategorie" className="nav-link" >
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter categorie</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListCategorie" className="nav-link" >
                    <i className="far fa-circle nav-icon" />
                    <p>Listes Categorie</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-user" />
                <p>
                  Clients
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to='/AjouterClient' className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter client</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/ListClients' className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listes clients</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Devis
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/AddDevis" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter devis</p>
                  </NavLink>

                </li>
                <li className="nav-item">
                  <NavLink to="/ListDevis" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listes devis</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Commande
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/AddCommand" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>ajouter une commande</p>
                  </NavLink>

                </li>
                <li className="nav-item">
                  <NavLink to="/ListCommand" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listes commandes</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Facture
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/ListFacture" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listes factures</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Livraison
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/ListLivraison" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listes de livraisons</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Reglage
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/entreprise" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>modifier les informations de l'entreprises</p>
                  </NavLink>

                </li>
                <li className="nav-item">
                  <NavLink to="/remarqueAndCondition" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>remarques et conditions pour les papiers</p>
                  </NavLink>
                </li>
              </ul>
              
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-warehouse" />
                <p>
                  Stock
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/forms/general.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>General Elements</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/forms/advanced.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Advanced Elements</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/forms/editors.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Editors</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-file-invoice" />
                <p>
                  Factures
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/tables/simple.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Simple Tables</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/tables/data.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>DataTables</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/tables/jsgrid.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>jsGrid</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>
                  Utilisateur
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/tables/simple.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Simple Tables</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/tables/data.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>DataTables</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/tables/jsgrid.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>jsGrid</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-header">EXAMPLES</li>
            <li className="nav-item">
              <a href="pages/calendar.html" className="nav-link">
                <i className="nav-icon far fa-calendar-alt" />
                <p>
                  Calendar
                  <span className="badge badge-info right">2</span>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/gallery.html" className="nav-link">
                <i className="nav-icon far fa-image" />
                <p>
                  Gallery
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-envelope" />
                <p>
                  Mailbox
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/mailbox/mailbox.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Inbox</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/mailbox/compose.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Compose</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/mailbox/read-mail.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Read</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-book" />
                <p>
                  Pages
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/examples/invoice.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Invoice</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/profile.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Profile</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/e_commerce.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>E-commerce</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/projects.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Projects</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/project_add.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Project Add</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/project_edit.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Project Edit</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/project_detail.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Project Detail</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/contacts.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Contacts</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-plus-square" />
                <p>
                  Extras
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/examples/login.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Login</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/register.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Register</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/forgot-password.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Forgot Password</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/recover-password.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Recover Password</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/lockscreen.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Lockscreen</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/legacy-user-menu.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Legacy User Menu</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/language-menu.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Language Menu</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/404.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Error 404</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/500.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Error 500</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/pace.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Pace</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/blank.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Blank Page</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="starter.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Starter Page</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-header">MISCELLANEOUS</li>
            <li className="nav-item">
              <a href="https://adminlte.io/docs/3.0" className="nav-link">
                <i className="nav-icon fas fa-file" />
                <p>Documentation</p>
              </a>
            </li>
            <li className="nav-header">MULTI LEVEL EXAMPLE</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-circle nav-icon" />
                <p>Level 1</p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-circle" />
                <p>
                  Level 1
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Level 2</p>
                  </a>
                </li>
                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>
                      Level 2
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p>Level 3</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p>Level 3</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p>Level 3</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Level 2</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-circle nav-icon" />
                <p>Level 1</p>
              </a>
            </li>
            <li className="nav-header">LABELS</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-danger" />
                <p className="text">Important</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-warning" />
                <p>Warning</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-info" />
                <p>Informational</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}

export default Menu