import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, deleteCartItem, updateCartItem } from '../../Redux/cartSlice';
import { fetchExchangeRates } from '../../Redux/currencySlice';
import currencySymbols from '../../components/Schemas/currencySymbols';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cart, totalSellPrice, totalSellGstPrice, currency, currencySymbol, error } = useSelector((state) => state.cart);
  const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
  const exchangeRates = useSelector(state => state.currency.exchangeRates);
  const subTotal = totalSellPrice + totalSellGstPrice;

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  const convertPrice = (price, fromCurrency) => {
    const rate = exchangeRates[selectedCurrency];
    if (!rate) return price;
    const priceInUSD = price / exchangeRates[fromCurrency];
    return (priceInUSD * rate).toFixed(2);
  };

  const [moq, setMoq] = useState(1);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (cart && cart.length > 0) {
      const initialQuantities = cart.reduce((acc, item) => {
        acc[item.productId] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } else {
      setQuantities({});
    }
  }, [cart]);

  const incrementValue = (e, productId) => {
    e.stopPropagation();
    const newQuantities = {
      ...quantities,
      [productId]: (quantities[productId] || 0) + 1,
    };
    console.log('Incrementing quantity:', newQuantities[productId]);
    setQuantities(newQuantities);
    dispatch(updateCartItem({ productId, quantity: newQuantities[productId] }));
  };

  const decrementValue = (e, productId, moq) => {
    e.stopPropagation();
    const newQuantities = {
      ...quantities,
      [productId]: Math.max((quantities[productId] || 0) - 1, moq),
    };
    console.log('Decrementing quantity:', newQuantities[productId]);
    setQuantities(newQuantities);
    dispatch(updateCartItem({ productId, quantity: newQuantities[productId] }));
  };

  const handleInputChange = (e, productId, moq) => {
    e.stopPropagation();
    const newValue = parseInt(e.target.value, 10);
    const newQuantities = {
      ...quantities,
      [productId]: newValue >= moq ? newValue : moq,
    };
    console.log('Changing quantity via input:', newQuantities[productId]);
    setQuantities(newQuantities);
    dispatch(updateCartItem({ productId, quantity: newQuantities[productId] }));
  };

  const remove = (e, productId) => {
    e.stopPropagation();
    dispatch(deleteCartItem(productId));
  };

  const checkout = () => {
    navigate('/checkout');
  }

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  }, []);

  const cartItems = cart || [];
  const totalItems = cartItems.length;

  const truncateText = (text, maxLength) => {
    if (!text) {
      return '';
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  // GST calculator
  // let priceuv = 78.58;
  // let gstuv = 28; //percent
  // let quantityuv = 2;

  // let totalPriceWithGST = [(priceuv * quantityuv) + ((gstuv * priceuv * quantityuv) / 100)];
  // let totalGST = [totalPriceWithGST - (priceuv * quantityuv)];
  // let totalPrice = totalPriceWithGST - totalGST;


  return (
    <div className="flexcol wh cart_page">
      <Helmet>
        <title>Your Cart | Ulinkit - Review and Manage Your Items</title>
        <meta name="description" content="View and manage the items in your cart on Ulinkit. Review product details, adjust quantities, and proceed to checkout for a seamless shopping experience." />
        <link rel="canonical" href="https://www.ulinkit.com/cart" />
      </Helmet>
      <article className="flex wh">
        {/* <div className="heading2">Total (AUD) : {totalPriceWithGST}</div>
        <div className="heading2">Total GST (AUD) : {totalGST}</div>
        <div className="heading2">Total Price with gst (AUD) : {totalPrice}</div> */}
        <h1 className="heading wh">My Cart ({totalItems})</h1>
      </article>
      <div className="cart_cont">
        <div className="cartcol_one" tabIndex={0} ref={scrollRef}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <Fragment>
              {cartItems.map((item) => (
                <div className='cart webdiv' key={uuidv4()}>
                  <a className="cartImg" href={`/product-details/${item.productId}`}>
                    {item.image && item.image.imageUrl ? (
                      <img src={item.image.imageUrl} alt={item.image.imageName} />
                    ) : (
                      <p>No Image Available</p>
                    )}
                  </a>

                  <div className="cartDetail">
                    <a className="heading2" href={`/product-details/${item.productId}`}>
                      {truncateText(item.itemName, 50)}
                    </a>
                    <div className="flex" style={{ gap: '15px' }}>
                      <span className='descrip2' style={{ textDecoration: 'line-through' }}>{currencySymbol} {Number(item.unitPrice).toFixed(2)} {currency}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>{`${parseFloat(((item.unitPrice - item.sellPrice) / item.unitPrice) * 100).toFixed(2)}% OFF`}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{currencySymbol} {Number(item.sellPrice).toFixed(2)} {currency}</span>
                    </div>
                    <div className="moq-gst">
                      <div className="descrip" style={{ display: 'none' }}>Min Order Quantity: {item.minOrderQuant}</div>
                      <div className="descrip">GST: {item.gst}</div>
                    </div>
                  </div>

                  <div className="cartPrice">
                    <div className="totalPrice">
                      <div className="heading2">Total :</div>
                      <div className="heading2"><span>{currencySymbol} {Number(item.totalAmount).toFixed(2)} {currency}</span></div>
                      {/* <div className='heading2'> {currencySymbols[selectedCurrency]} {convertPrice(item.totalAmount, currency)} {selectedCurrency}</div> */}
                    </div>
                    <div className="plus-minus webdiv">
                      <div><RemoveCircleOutlineIcon onClick={(e) => decrementValue(e, item.productId, moq)} /></div>
                      <input className='pminput' type="number" value={quantities[item.productId]} onChange={(e) => handleInputChange(e, item.productId, moq)} />
                      <div><AddCircleOutlineIcon onClick={(e) => incrementValue(e, item.productId)} /></div>
                    </div>
                    <button className='remove flex' onClick={(e) => remove(e, item.productId)}><RemoveShoppingCartIcon style={{ width: '15px' }} /><div className="heading2">Remove</div></button>
                  </div>
                </div>
              ))}
            </Fragment>
          )}
        </div>

        <article className="cartcol_two">
          <div className="sel-box" style={{ gap: '10px' }}>
            <h1 className="heading3">Cart Summary</h1>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Total Price</span></div>
              <div className="heading2"><span>{currencySymbol} {Number(totalSellPrice).toFixed(2)} {currency}</span></div>
              {/* <div className="heading2"><span> {currencySymbols[selectedCurrency]} {convertPrice(totalSellPrice, currency)} {selectedCurrency}</span></div> */}
            </div>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Total Tax</span></div>
              <div className="heading2"><span>{currencySymbol} {Number(totalSellGstPrice).toFixed(2)} {currency}</span></div>
              {/* <div className="heading2"><span> {currencySymbols[selectedCurrency]} {convertPrice(totalSellGstPrice, currency)} {selectedCurrency}</span></div> */}
            </div>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Subtotal</span></div>
              <div className="heading2"><span>{currencySymbol} {Number(subTotal).toFixed(2)} {currency}</span></div>
              {/* <div className="heading2"><span> {currencySymbols[selectedCurrency]} {convertPrice(subTotal, currency)} {selectedCurrency}</span></div> */}
            </div>
            <div className="flexcol wh topbottom" style={{ gap: '10px' }}>
              <button className='btn addtocart flex' onClick={checkout}><ShoppingCartCheckoutIcon style={{ width: '15px' }} /><div className="heading2">Checkout</div></button>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Cart;
