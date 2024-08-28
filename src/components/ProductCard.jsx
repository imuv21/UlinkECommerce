import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../Redux/currencySlice';
import currencySymbols from './Schemas/currencySymbols';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ProductCard = ({ name, id, img, unitPrice, salePrice, moq, currencyName, handleClickCart }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
  const exchangeRates = useSelector(state => state.currency.exchangeRates);
  const unitPriceNum = parseFloat(unitPrice);
  const salePriceNum = parseFloat(salePrice);
  const discountPercentage = ((unitPriceNum - salePriceNum) / unitPriceNum) * 100;

  // Fetch currency options and exchange rates
  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  const convertPrice = (price, fromCurrency) => {
    const rate = exchangeRates[selectedCurrency];
    if (!rate) return price;
    const priceInUSD = price / exchangeRates[fromCurrency];
    return (priceInUSD * rate).toFixed(2);
  };


  return (
    <a className={`show-img-detail-sub`} href={`/product-details/${id}`}>
      <img className='product-img-size' src={img} alt={`${name}_${id}`} />
     { isAuthenticated && user.role === 'Buyer' && <div className="add-to-cart-icon" onClick={(event) => handleClickCart(event, id)}><AddShoppingCartIcon /></div>}
      <div className='product-detail-info'>
        <p className='product-title'>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</p>
        <p className='product-price'>{currencySymbols[selectedCurrency]} {convertPrice(salePriceNum, currencyName)} {selectedCurrency}/ piece </p>
        <div className='flex' style={{ gap: '10px' }}>
          <p className='product-discount'> {currencySymbols[selectedCurrency]} {convertPrice(unitPriceNum, currencyName)} {selectedCurrency} </p>
          <span className='discount-percentage'>{discountPercentage.toFixed(2)}% OFF</span>
        </div>
        <p className='product-quantity' style={{display : 'none'}}>Min Order: {moq} peace</p>
      </div>
    </a>
  )
};

export default ProductCard
