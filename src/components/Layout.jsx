import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { CartProvider, UserTypeProvider } from './context/CartContext';

const Layout = ({ children }) => {
    return (
        <div>
            <CartProvider>
                <UserTypeProvider>
                    <Header />
                    {children}
                    <Footer />
                </UserTypeProvider>
            </CartProvider>
        </div>
    );
};

export default Layout;
