import React from 'react';


const ProductCard = ({ name, id, img, unitPrice, salePrice }) => {

  const discountPercentage = ((unitPrice - salePrice) / unitPrice) * 100;


  return (
    <a className='productCard' href={`/product-details/${id}`}>
      <div className="img-icon-img">
        <img className='background-image' src={img} alt='img'/>
      </div>
      <div className="flexcol" style={{ gap: '5px', alignItems: 'start' }}>
        <div className='discp' style={{textTransform:'capitalize'}}>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</div>
        <div className='discp' style={{textDecoration: 'line-through'}}>Unit Price: ${unitPrice}</div>
        <div className='discp'>Sale Price: ${salePrice}</div>
        <div className='discp'>{discountPercentage.toFixed(2)}% OFF</div>
      </div>
      <button className='btn addtocart flex'><div className="heading2">View Product</div></button>
    </a>
  )
};

export default ProductCard