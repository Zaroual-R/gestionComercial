import React from 'react'
import LignProduct2 from './LignProduct2'

const data=[
    {
        idProduit:1,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50


    },
    {
        idProduit:2,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
    {
        idProduit:3,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
    {
        idProduit:4,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
    {
        idProduit:5,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
    {
        idProduit:6,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
    {
        idProduit:7,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
    {
        idProduit:8,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
    {
        idProduit:9,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },

    {
        idProduit:10,
        imageProduit:"dist/img/avatar.png",
        nomProd:"tequiden",
        refProd:"AF-250",
        details:"dim 2*2  range 4 in pac",
        prix:50

    },
]

const ListProduct2 = () => {
    const datashow=data.map((item,key) =><LignProduct2 key={item.idProduit} imageProduit={item.imageProduit} nomProd={item.nomProd} refProd={item.refProd} prix={item.prix} details={item.details}/>)
  return (
    <div className='card-produits'>
        {datashow}
    </div>
  )
}

export default ListProduct2