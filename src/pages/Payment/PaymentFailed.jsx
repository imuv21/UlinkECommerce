import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const PaymentFailed = () => {

    return (
        <Fragment>
            <Helmet>
                <title>Payment Failed</title>
            </Helmet>
            <div className='flexcol paymentsuccess'>
                <div className="heading">Payment Failed!</div>
                <Link className='btn2 box flex' style={{width : '200px'}} to="/">Back to Home</Link>
            </div>
        </Fragment>
    )
}

export default PaymentFailed
