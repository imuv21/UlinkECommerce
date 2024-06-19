import React, { Fragment } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const PaymentSuccess = () => {

    const searchQuery = useSearchParams()[0]
    const referenceNum = searchQuery.get("reference");

    return (
        <Fragment>
            <Helmet>
                <title>Payment Success</title>
            </Helmet>
            <div className='flexcol paymentsuccess'>
                <div className="heading">Order placed successfully!</div>
                <div className="text">Reference No. {referenceNum}</div>
                <Link className='btn2 box flex' style={{width : '200px'}} to="/">Back to Home</Link>
            </div>
        </Fragment>
    )
}

export default PaymentSuccess
