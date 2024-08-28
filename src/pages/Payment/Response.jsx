import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Response = () => {
    const location = useLocation();
    const response = location.state?.response;

    if (!response) {
        return <p className="flex wh heading">There is no response</p>;
    }

    const renderPayerInfo = (payerInfo) => (
        <div className="pr-flexboxcol">
            <p className='heading3'>Payer Info</p>
            <p className='descrip2'>Email: {payerInfo.email}</p>
            <p className='descrip2'>First Name: {payerInfo.first_name}</p>
            <p className='descrip2'>Last Name: {payerInfo.last_name}</p>
            <p className='descrip2'>Payer ID: {payerInfo.payer_id}</p>
            <p className='descrip2'>Country Code: {payerInfo.country_code}</p>
            {payerInfo.shipping_address && (
                <div className="pr-flexboxcol">
                    <p className='heading3'>Shipping Address</p>
                    <p className='descrip2'>Recipient Name: {payerInfo.shipping_address.recipient_name}</p>
                    <p className='descrip2'>Address: {payerInfo.shipping_address.line1}</p>
                    <p className='descrip2'>City: {payerInfo.shipping_address.city}</p>
                    <p className='descrip2'>State: {payerInfo.shipping_address.state}</p>
                    <p className='descrip2'>Postal Code: {payerInfo.shipping_address.postal_code}</p>
                    <p className='descrip2'>Country Code: {payerInfo.shipping_address.country_code}</p>
                </div>
            )}
        </div>
    );

    const renderTransaction = (transaction, index) => (
        <div key={index} className="pr-flexboxcol">
            <p className='heading3'>Transaction {index + 1}</p>
            <p className='descrip2'>Transaction ID: {transaction.related_resources[0].sale.id}</p>
            <p className='descrip2'>Amount: {transaction.amount.total} {transaction.amount.currency}</p>
            <p className='descrip2'>Description: {transaction.description}</p>
            <p className='descrip2'>State: {transaction.related_resources[0].sale.state}</p>
            <p className='descrip2'>Payment Mode: {transaction.related_resources[0].sale.payment_mode}</p>
            <div className="pr-flexboxcol">
                <p className='heading3'>Transaction Fee</p>
                <p className='descrip2'>Currency: {transaction.related_resources[0].sale.transaction_fee.currency}</p>
                <p className='descrip2'>Value: {transaction.related_resources[0].sale.transaction_fee.value}</p>
            </div>
            {transaction.item_list && transaction.item_list.shipping_address && (
                <div className="pr-flexboxcol">
                    <p className='heading3'>Shipping Address</p>
                    <p className='descrip2'>Recipient Name: {transaction.item_list.shipping_address.recipient_name}</p>
                    <p className='descrip2'>Address: {transaction.item_list.shipping_address.line1}</p>
                    <p className='descrip2'>City: {transaction.item_list.shipping_address.city}</p>
                    <p className='descrip2'>State: {transaction.item_list.shipping_address.state}</p>
                    <p className='descrip2'>Postal Code: {transaction.item_list.shipping_address.postal_code}</p>
                    <p className='descrip2'>Country Code: {transaction.item_list.shipping_address.country_code}</p>
                </div>
            )}
        </div>
    );

    return (
        <Fragment>
            <Helmet>
                <title>Payment Details</title>
            </Helmet>
            <article className="payment-response">
                <h1 className="heading">Payment Details</h1>
                <section className="pr-flexbox">
                    <h2 className='heading3'>Payment ID</h2>
                    <p className='heading2'>{response.id}</p>
                </section>
                <section className="pr-flexbox">
                    <h2 className='heading3'>Intent</h2>
                    <p className='heading2'>{response.intent}</p>
                </section>
                <section className="pr-flexbox">
                    {response.payer && renderPayerInfo(response.payer.payer_info)}
                </section>
                <section className="pr-flexboxcol">
                    <h2 className='heading3'>Transactions</h2>
                    {response.transactions.map((transaction, index) => renderTransaction(transaction, index))}
                </section>
                <Link className='btn2 box flex' style={{width : '200px'}} to="/">Back to Home</Link>
            </article>
        </Fragment>

    );
};

export default Response;
