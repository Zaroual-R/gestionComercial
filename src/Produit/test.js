<div className="container ajouter-produit">
<div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-header bg-dark text-white">
       <h3>Nouveau Produit</h3> 
        {alert(alertMessage)}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="refProduit">Référence produit :</label>
            <input type="text" name="refProd" id="refProduit" className="form-control" placeholder="ref produit" ref={refProduit} onChange={handleChange}/>
            {displayErr("refProduit")}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="nomProduit">Nom produit :</label>
            <input type="text" name="nomProd" id="nomProduit" className="form-control" placeholder="nom produit" ref={nomProduit} onChange={handleChange}/>
            {displayErr("nomProduit")}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="prixProduit">Prix produit :</label>
            <input type="number" name="prixUnitaireHT" id="prixProduit" className="form-control" placeholder="prix unitaire" ref={prixProduit} onChange={handleChange}/>
            {displayErr("prixProduit")}
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="details">Détails produit :</label>
            <textarea id="details" name="details" className="form-control" placeholder="saisir les détails du produit" ref={details} onChange={handleChange} />
            {displayErr("details")}
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="tva">TVA :</label>
            <input typee="number" id="tva" name="tva" className="form-control" placeholder="saisir la TVA du produit" ref={tva} onChange={handleChange} />
            {displayErr("tva")}
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="categorieProduit">Catégorie :</label>
            <select className="form-control" name="category" id="categorieProduit" ref={categorieProduit} onChange={handleChange}>
              <option value="">Sélectionner catégorie</option>
              {categories.map(categorie => (
                <option key={categorie.idCategorie} value={categorie.idCategorie}>{categorie.nomCategorie}</option>
              ))}
            </select>
            {displayErr("categorieProduit")}
          </div>
          <div>
            <input type="submit" value="Ajouter" className="btn btn-primary" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="reset" value="Reset" className="btn btn-danger" onClick={handleReset} />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</div>