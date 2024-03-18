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
        <div className='container mt-2 list-categorie'>
            <div className='card ' style={{ maxHeight: 'calc(100vh - 100px)' }}>
                <div class="card-header bg-dark"> <h2>Listes des Categories</h2></div>
                <div className='card-body ' style={{ overflowY: 'auto' }}>
                    <form method="get" >
                        <div className="form-">
                            <label class="sr-only" for="inlineFormInputGroup">Username</label>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text bg-success">keyword</div>
                                </div>
                                <input type="text" id="searchKey" ref={searchKey} className="form-control" style={{ width: "250px" }} placeholder="Chercher par Nom catégorie" onChange={handleChange} />
                            </div>
                        </div>
                    </form>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>#ID</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Nom</th>
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

    )
}

export default ListCategorie;