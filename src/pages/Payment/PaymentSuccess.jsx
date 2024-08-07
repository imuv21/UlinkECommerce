
import React, { useState, useEffect, Fragment } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const PaymentSuccess = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const paymentId = urlParams.get('paymentId');
        const payerId = urlParams.get('PayerID');

        if (paymentId && payerId) {
            axios.get(`https://api.ulinkit.com/api/paypal/payment/success?paymentId=${paymentId}&PayerID=${payerId}`)
                .then(response => {
                    console.log('Payment completed:', response.data);
                    const parsedData = JSON.parse(response.data.data);
                    setResponse(parsedData);
                    navigate('/payment-response', { state: { response: parsedData } });
                })
                .catch(error => console.error('Error completing payment:', error));
        }
    }, [location, navigate]);

    return (
        <Fragment>
            <Helmet>
                <title>Payment Success</title>
            </Helmet>
            <div className='flexcol paymentsuccess'>
                <div className="heading">Order placed successfully!</div>
            </div>
        </Fragment>
    )
}

export default PaymentSuccess
