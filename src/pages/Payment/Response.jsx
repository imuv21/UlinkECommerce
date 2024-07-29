import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Response = () => {
    const location = useLocation();
    const response = location.state?.response;

    if (!response) {
        return <div className="flex wh heading"><h2>There is no response</h2></div>;
    }

    const renderPayerInfo = (payerInfo) => (
        <div className="pr-flexboxcol">
            <div className='heading3'>Payer Info</div>
            <div className='descrip2'>Email: {payerInfo.email}</div>
            <div className='descrip2'>First Name: {payerInfo.first_name}</div>
            <div className='descrip2'>Last Name: {payerInfo.last_name}</div>
            <div className='descrip2'>Payer ID: {payerInfo.payer_id}</div>
            <div className='descrip2'>Country Code: {payerInfo.country_code}</div>
            {payerInfo.shipping_address && (
                <div className="pr-flexboxcol">
                    <div className='heading3'>Shipping Address</div>
                    <div className='descrip2'>Recipient Name: {payerInfo.shipping_address.recipient_name}</div>
                    <div className='descrip2'>Address: {payerInfo.shipping_address.line1}</div>
                    <div className='descrip2'>City: {payerInfo.shipping_address.city}</div>
                    <div className='descrip2'>State: {payerInfo.shipping_address.state}</div>
                    <div className='descrip2'>Postal Code: {payerInfo.shipping_address.postal_code}</div>
                    <div className='descrip2'>Country Code: {payerInfo.shipping_address.country_code}</div>
                </div>
            )}
        </div>
    );

    const renderTransaction = (transaction, index) => (
        <div key={index} className="pr-flexboxcol">
            <div className='heading3'>Transaction {index + 1}</div>
            <div className='descrip2'>Transaction ID: {transaction.related_resources[0].sale.id}</div>
            <div className='descrip2'>Amount: {transaction.amount.total} {transaction.amount.currency}</div>
            <div className='descrip2'>Description: {transaction.description}</div>
            <div className='descrip2'>State: {transaction.related_resources[0].sale.state}</div>
            <div className='descrip2'>Payment Mode: {transaction.related_resources[0].sale.payment_mode}</div>
            <div className="pr-flexboxcol">
                <div className='heading3'>Transaction Fee</div>
                <div className='descrip2'>Currency: {transaction.related_resources[0].sale.transaction_fee.currency}</div>
                <div className='descrip2'>Value: {transaction.related_resources[0].sale.transaction_fee.value}</div>
            </div>
            {transaction.item_list && transaction.item_list.shipping_address && (
                <div className="pr-flexboxcol">
                    <div className='heading3'>Shipping Address</div>
                    <div className='descrip2'>Recipient Name: {transaction.item_list.shipping_address.recipient_name}</div>
                    <div className='descrip2'>Address: {transaction.item_list.shipping_address.line1}</div>
                    <div className='descrip2'>City: {transaction.item_list.shipping_address.city}</div>
                    <div className='descrip2'>State: {transaction.item_list.shipping_address.state}</div>
                    <div className='descrip2'>Postal Code: {transaction.item_list.shipping_address.postal_code}</div>
                    <div className='descrip2'>Country Code: {transaction.item_list.shipping_address.country_code}</div>
                </div>
            )}
        </div>
    );

    return (
        <Fragment>
            <Helmet>
                <title>Payment Details</title>
            </Helmet>
            <div className="payment-response">
                <div className="heading">Payment Details</div>
                <div className="pr-flexbox">
                    <div className='heading3'>Payment ID</div>
                    <div className='heading2'>{response.id}</div>
                </div>
                <div className="pr-flexbox">
                    <div className='heading3'>Intent</div>
                    <div className='heading2'>{response.intent}</div>
                </div>
                <div className="pr-flexbox">
                    {response.payer && renderPayerInfo(response.payer.payer_info)}
                </div>
                <div className="pr-flexboxcol">
                    <div className='heading3'>Transactions</div>
                    {response.transactions.map((transaction, index) => renderTransaction(transaction, index))}
                </div>
                <Link className='btn2 box flex' style={{width : '200px'}} to="/">Back to Home</Link>
            </div>
        </Fragment>

    );
};

export default Response;
