import React from 'react';
import ReactStars from 'react-rating-stars-component';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ProductCard = ({ name, id, img, price }) => {

  let numOfReviews = 3;
  const options = {
    edit: false,
    color: 'grey',
    activeColor: 'var(--CodeOne)',
    size: window.innerWidth < 600 ? 16 : 17,
    isHalf: true,
    value: numOfReviews
  };

  const oldPrice = price;
  const discountedPrice = oldPrice - 10;
  const discountPercentage = ((oldPrice - discountedPrice) / oldPrice) * 100;

  return (
    <a className='productCard' to={`/product/${id}`}>
      <div className="img-icon-img">
        <img className='background-image' src={img} alt={name} />
      </div>

      <div className="flexcol" style={{ gap: '5px', alignItems: 'start' }}>
        <div className='discp title-limit'>{name}</div>
        <div className='stars'><ReactStars {...options} /> &nbsp; ({numOfReviews}) </div>
        <div className='discp' style={{textDecoration: 'line-through'}}>Old Price: ${oldPrice}</div>
        <div className='discp'>Discount Price: ${discountedPrice}</div>
        <div className='discp'>{discountPercentage}% OFF</div>
      </div>
      <button className='btn addtocart flex'><AddShoppingCartIcon /><div className="heading2">Add to cart</div></button>
    </a>
  )
};

export default ProductCard