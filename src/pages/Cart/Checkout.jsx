import React, { useState, useEffect, useRef } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Img2 from '../../assets/jpg-slider/2.jpg';
import PaymentIcon from '@mui/icons-material/Payment';

const Checkout = () => {

  const scrollRef = useRef(null);
  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.focus();
      }
  }, []);

  return (
    <div className="flexcol wh cart_page">
      <div className="flex wh">
        <div className="heading wh">Checkout</div>
      </div>
      <div className="cart_cont wh">
        <div className="cartcol_one" tabIndex={0} ref={scrollRef}>
          <div className="cart">
            <div className="cartImg">
              <img src={Img2} alt="Img2" />
            </div>
            <div className="cartDetail">
              <div className="heading2">
                Apple Airpods Pro 2nd Gen USB-C
              </div>
              <div className="flex" style={{ gap: '15px' }}>
                <span className='descrip2' style={{ textDecoration: 'line-through' }}>AED 737.33</span>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>12% OFF</span>
                <span>AED</span><span style={{ fontWeight: 'bold', fontSize: '15px' }}>729.75</span>
              </div>
              <div className="flexcol" style={{ gap: '3px' }}>
                <div className="descrip">Units per carton: 1</div>
                <div className="descrip">Min order: 1 piece</div>
              </div>
            </div>
            <div className="cartPrice">
              <div className="heading2">Total : AED 729.75</div>
              <button className='remove flex'><RemoveShoppingCartIcon style={{ width: '15px' }} /><div className="heading2">Remove</div></button>
            </div>
          </div>
        </div>
        <div className="cartcol_two">
          <div className="sel-box" style={{ gap: '10px' }}>
            <div className="heading3">Order Summary</div>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Order total</span></div>
              <div className="heading2"><span>AED 6,361.08</span></div>
            </div>
            <div className="flexcol wh topbottom" style={{ gap: '10px' }}>
              <button className='btn addtocart flex'><PaymentIcon style={{ width: '15px' }} /><div className="heading2">Make payment</div></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout