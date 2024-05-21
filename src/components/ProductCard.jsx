import React from 'react';


const ProductCard = ({ name, id, img, unitPrice, salePrice, moq, currency }) => {

  const discountPercentage = ((unitPrice - salePrice) / unitPrice) * 100;

  return (
    <a className="show-img-detail-sub" href={`/product-details/${id}`}>
      <img className='product-img-size' src={img} alt='img' />
      <div className='product-detail-info'>
        <p className='product-title'>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</p>
        <p className='product-price'>{currency}{salePrice}/ piece incl value</p>
        <div className='flex' style={{ gap: '10px' }}>
          <p className='product-discount'>{currency}{unitPrice}</p>
          <span className='discount-percentage'>{discountPercentage.toFixed(2)}% OFF</span>
        </div>
        <p className='product-quantity'>Min Order: {moq} peace</p>
      </div>
    </a>
  )
};

export default ProductCard
