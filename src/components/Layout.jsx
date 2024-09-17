import React, { Fragment } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {

    const location = useLocation();
    
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/verify-reset-password' ||
        location.pathname === '/verify-email' || location.pathname === '/seller-form' || location.pathname === '/update-email' || location.pathname === '/update-number' ||
        location.pathname === '/update-password' || location.pathname === '/verify-update-email' || location.pathname === '/verify-update-number' || location.pathname === '/update-password' ||
        location.pathname === '/verify-update-password' || location.pathname === '/sellerform' || location.pathname === '/payment-success' || location.pathname === '/payment-failed' ||
        location.pathname === '/google-callback' || location.pathname === '/payment-response' || location.pathname === '/verify-update-profile' || location.pathname === '/admin/login' ||

        location.pathname === '/admin-dashboard/admin-order' || location.pathname === '/admin-login' || location.pathname === '/admin-dashboard/buyer-list' ||
        location.pathname === '/admin-dashboard/seller-list' || location.pathname === '/admin-dashboard/warehouse') {

        return <>{children}</>;
    }

    return (
        <Fragment>
            <Header />
               {children}
            <Footer />
        </Fragment>
    );
};

export default Layout;
