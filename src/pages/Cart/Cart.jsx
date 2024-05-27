import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../Redux/cartSlice';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Helmet } from 'react-helmet-async';

const Cart = () => {

  const dispatch = useDispatch();
  const { items: cart, totalSellPrice, currencySymbol, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  //plus-minus
  const [value, setValue] = useState(1);
  const incrementValue = () => {
    // setValue(prevValue => (parseInt(prevValue) + 1).toString());
  };

  const decrementValue = () => {
    // setValue(prevValue => Math.max(parseInt(prevValue) - 1, moq).toString());
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    // setValue(newValue >= moq ? newValue.toString() : moq.toString());
  };

  const remove = (index) => {
    // Implement remove logic
  };

  const checkout = () => {
    window.location.href = '/checkout';
  }

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  }, []);


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {typeof error === 'object' ? JSON.stringify(error) : error}</div>;
  }

  const cartItems = cart || [];


  return (
    <div className="flexcol wh cart_page">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="flex wh">
        <div className="heading wh">My Cart </div>
      </div>
      <div className="cart_cont wh">
        <div className="cartcol_one" tabIndex={0} ref={scrollRef}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <Fragment>
              {cartItems.map((item, index) => (
                <div className='cart webdiv' key={index}>
                  <div className="cartImg">
                    <img src={item.image.imageUrl} alt={item.image.imageName} />
                  </div>
                  <div className="cartDetail">
                    <div className="heading2">
                      {item.itemName}
                    </div>
                    <div className="flex" style={{ gap: '15px' }}>
                      <span className='descrip2' style={{ textDecoration: 'line-through' }}>AED {item.unitPrice}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>{`${(((item.unitPrice - item.sellPrice) / item.unitPrice) * 100).toFixed(2)}% OFF`}</span>
                      <span>AED</span><span style={{ fontWeight: 'bold', fontSize: '15px' }}>{currencySymbol}{item.sellPrice.toFixed(2)}</span>
                    </div>
                    <div className="flexcol-start" style={{ gap: '3px' }}>
                      {/* <div className="descrip">Units per carton: {item.product.unitsPerCarton}</div>
                      <div className="descrip">Min order quantity: {item.product.minOrderQuant}</div> */}
                      <div className="descrip">GST: {item.gst.toFixed(2)}</div>
                    </div>
                  </div>


                  <div className="cartPrice">
                    <div className="heading2">Total : {currencySymbol} {(item.quantity * (item.sellPrice + item.gst)).toFixed(2)}</div>
                    <div className="plus-minus webdiv" style={{ width: '150px' }}>
                      <div style={{ cursor: 'pointer' }}><RemoveCircleOutlineIcon onClick={decrementValue} /></div>
                      <input className='pminput' type="number" value={item.quantity} onChange={handleInputChange} />
                      <div style={{ cursor: 'pointer' }}><AddCircleOutlineIcon onClick={incrementValue} /></div>
                    </div>
                    <button className='remove flex' onClick={() => remove(index)}><RemoveShoppingCartIcon style={{ width: '15px' }} /><div className="heading2">Remove</div></button>
                  </div>
                </div>
              ))}
            </Fragment>
          )}
        </div>
        <div className="cartcol_two">
          <div className="sel-box" style={{ gap: '10px' }}>
            <div className="heading3">Cart Summary</div>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Subtotal</span></div>
              <div className="heading2"><span>{currencySymbol} {totalSellPrice.toFixed(2)}</span></div>
            </div>
            <div className="flexcol wh topbottom" style={{ gap: '10px' }}>
              <button className='btn addtocart flex' onClick={checkout}><ShoppingCartCheckoutIcon style={{ width: '15px' }} /><div className="heading2">Checkout</div></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart