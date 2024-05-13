import React, { useState, useEffect, createContext, useContext } from 'react';


//Cart context
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



// User type context
const UserTypeContext = createContext();
const UserTypeProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const userTypeFromStorage = localStorage.getItem('userType');
    if (userTypeFromStorage) {
      setUserType(JSON.parse(userTypeFromStorage));
    }
  }, []);
  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};
const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};



//Auth context 
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => useContext(AuthContext);






export { CartProvider, useCart, UserTypeProvider, useUserType, AuthProvider, useAuth };