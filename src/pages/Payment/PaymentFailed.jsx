import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const PaymentFailed = () => {

    return (
        <Fragment>
            <Helmet>
                <title>Payment Failed | Ulinkit - Troubleshoot Your Transaction</title>
                <meta name="description" content="Oops! Your payment could not be processed. Please check your payment details and try again. For assistance, contact Ulinkit support to resolve any issues with your transaction." />
                <link rel="canonical" href="https://www.ulinkit.com/payment-failed" />
            </Helmet>
            <article className='flexcol paymentsuccess'>
                <h1 className="heading">Payment Failed!</h1>
                <Link className='btn2 box flex' style={{ width: '200px' }} to="/">Back to Home</Link>
            </article>
        </Fragment>
    )
}

export default PaymentFailed
