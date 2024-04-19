import React, { useState, useEffect, createContext, useContext } from 'react';

//create context
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
    setCart(savedCart);
  }, []);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
const useCart = () => useContext(CartContext);

export { CartProvider, useCart }