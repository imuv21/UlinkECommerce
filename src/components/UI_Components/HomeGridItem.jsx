import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../../Redux/currencySlice';
import currencySymbols from '../Schemas/currencySymbols';


const HomeGridItem = ({ name, id, img, salePrice, currencyName }) => {

    const dispatch = useDispatch();

    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const exchangeRates = useSelector(state => state.currency.exchangeRates);
    const salePriceNum = parseFloat(salePrice);


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
        <a className="home-grid-item" href={`/product-details/${id}`}>
            <img src={img} alt="" />
            <div className="home-detail">
                <div className="product-title">{name.length > 20 ? `${name.substring(0, 15)}...` : name}</div>
                <div className="product-price">{currencySymbols[selectedCurrency]} {convertPrice(salePriceNum, currencyName)} {selectedCurrency}/ piece </div>
            </div>
        </a>
    )
}

export default HomeGridItem