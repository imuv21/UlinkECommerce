import React, { useState, useEffect, useRef, Fragment } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Cart = () => {

  const [cart, setCart] = useState({});
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
    setCart(savedCart);
  }, []);

  const remove = (index) => {
    const updatedCart = [...Object.values(cart)];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  //plus-minus
  const [value, setValue] = useState(1);
  const incrementValue = (index) => {
    const updatedCart = { ...cart };
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const decrementValue = (index) => {
    const updatedCart = { ...cart };
    const minOrderQuant = updatedCart[index].product.minOrderQuant;
    updatedCart[index].quantity = Math.max(updatedCart[index].quantity - 1, minOrderQuant);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleInputChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const updatedCart = { ...cart };
    const minOrderQuant = updatedCart[index].product.minOrderQuant;
    updatedCart[index].quantity = newValue >= minOrderQuant ? newValue : minOrderQuant;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = Object.keys(cart).reduce((acc, index) => {
    const productTotal = cart[index].quantity * cart[index].product.salePrice;
    return acc + productTotal;
  }, 0);

  const checkout = () => {
    window.location.href = '/checkout';
  }

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  }, []);


  return (
    <div className="flexcol wh cart_page">
      <div className="flex wh">
        <div className="heading wh">My Cart ({Object.values(cart).length})</div>
      </div>
      <div className="cart_cont wh">
        <div className="cartcol_one" tabIndex={0} ref={scrollRef}>
          {Object.keys(cart).length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <Fragment>
              {Object.values(cart).map((item, index) => (
                <div className='cart webdiv' key={index}>
                  <div className="cartImg">
                    {cart[index].images && cart[index].images.length > 0 && (
                      <img src={cart[index].images[0].url} alt={cart[index].product.productName} />
                    )}
                  </div>
                  <div className="cartDetail">
                    <div className="heading2">
                      {item.product.productName}
                    </div>
                    <div className="flex" style={{ gap: '15px' }}>
                      <span className='descrip2' style={{ textDecoration: 'line-through' }}>AED {item.product.unitPrice}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>{`${(((item.product.unitPrice - item.product.salePrice) / item.product.unitPrice) * 100).toFixed(0)}% OFF`}</span>
                      <span>AED</span><span style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.product.salePrice}</span>
                    </div>
                    <div className="flexcol-start" style={{ gap: '3px' }}>
                      <div className="descrip">Units per carton: {item.product.unitsPerCarton}</div>
                      <div className="descrip">Min order quantity: {item.product.minOrderQuant}</div>
                    </div>
                  </div>

                  
                  <div className="cartPrice">
                    <div className="heading2">Total : AED {cart[index].quantity * cart[index].product.salePrice}</div>
                    <div className="plus-minus webdiv" style={{ width: '150px' }}>
                      <div style={{ cursor: 'pointer' }}><RemoveCircleOutlineIcon onClick={() => decrementValue(index)} /></div>
                      <input className='pminput' type="number" value={cart[index].quantity} onChange={(e) => handleInputChange(e, index)} />
                      <div style={{ cursor: 'pointer' }}><AddCircleOutlineIcon onClick={() => incrementValue(index)} /></div>
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
              <div className="heading2"><span>AED {subtotal.toFixed(2)}</span></div>
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