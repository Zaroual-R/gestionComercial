import React from 'react'



const LignProduct2 = (props) => {

  return (
             <div className="d-flex justify-content-center container mt-5 card-style ">
      <div className="card p-3 bg-white"><i className="fa fa-apple" />
        <div className="about-product text-center mt-2"><img src={props.imageProduit} width={300} />
          <div>
            <h4>Details</h4>
            <h6 className="mt-0 text-black-50">{props.details}</h6>
          </div>
        </div>
        <div className="stats mt-2 ">
          <div className="d-flex justify-content-between p-price"><span>nom</span><span>{props.nomProd}</span></div>
          <div className="d-flex justify-content-between p-price"><span>ref</span><span>{props.refProd}</span></div>
          <div className="d-flex justify-content-between p-price"><span>prix</span><span>{props.prix}</span></div>
        </div>
        <div className="d-flex justify-content-between total font-weight-bold mt-4"><span>Total</span><span>$7,197.00</span></div>
      </div>
    </div>
  
  )
}

export default LignProduct2