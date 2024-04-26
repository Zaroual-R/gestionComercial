import React, { useEffect, useRef, useState } from 'react'
import LignCategorie from './LignCategorie'
import CategorieService from '../backEndService/CategorieService';

const ListCategorie = () => {
    const [categories, setCategories] = useState([]);
    const searchKey = useRef('');

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = () => {
        CategorieService.getAllCategorie()
            .then(responce => {
                setCategories(responce.data);
                console.log("voici les categories :", responce.data);
            })
            .catch(error => {
                console.error("error lors de la recupertion des categories");
            })
    }

    const searchCategories = (searchValue) => {
        console.log("value: "+searchValue)
        CategorieService.searchCategories(searchValue)
            .then(response => {
                setCategories(response.data);
                console.log("voici les categories :", response.data);
            })
            .catch(error => {
                console.error("error lors de la recupertion des categories lors de recherche");
            })
    }

    const handleChange = (e) => {
        const searchValue = searchKey.current.value;
        if ( searchValue  == '') {
            getAllCategories();
        }
        else {
            searchCategories(searchValue);
        }
    }

    const datashow = categories.map((item, key) => <LignCategorie key={item.idCategorie} idCategorie={item.idCategorie} nomCategorie={item.nomCategorie} onDelete={getAllCategories}/>)



    return (
        <div className='container mt-2 Myfont'>
          <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
            <div className="card-header bg-dark">
               <h2 className="text-light">Listes des Catégories</h2>
            </div>
            <div className='card-body'>
              <form method="get">
                <div className="form-">
                  <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-success">Keyword</div>
                    </div>
                    <input type="text" id="searchKey" /* ref={searchKey} */ className="form-control" style={{ width: "250px" }} placeholder="Chercher par Nom catégorie" onChange={handleChange} />
                  </div>
                </div>
              </form>
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ textAlign: "center" }}>#ID</th>
                    <th scope="col" style={{ textAlign: "center" }}>Nom</th>
                    <th scope="col" style={{ textAlign: "center", width: "200px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {datashow}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
}

export default ListCategorie;