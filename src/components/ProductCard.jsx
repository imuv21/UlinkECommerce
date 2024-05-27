import React from 'react';


const ProductCard = ({ name, id, img, unitPrice, salePrice, moq, currency }) => {

  
  const unitPriceNum = parseFloat(unitPrice);
  const salePriceNum = parseFloat(salePrice);
  const discountPercentage = ((unitPriceNum - salePriceNum) / unitPriceNum) * 100;


  return (
    <a className="show-img-detail-sub" href={`/product-details/${id}`}>
      <img className='product-img-size' src={img} alt='img' />
      <div className='product-detail-info'>
        <p className='product-title'>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</p>
        <p className='product-price'>{currency}{salePriceNum.toFixed(2)}/ piece </p>
        <div className='flex' style={{ gap: '10px' }}>
          <p className='product-discount'>{currency}{unitPriceNum.toFixed(2)}</p>
          <span className='discount-percentage'>{discountPercentage.toFixed(2)}% OFF</span>
        </div>
        <p className='product-quantity'>Min Order: {moq} peace</p>
      </div>
    </a>
  )
};

export default ProductCard
