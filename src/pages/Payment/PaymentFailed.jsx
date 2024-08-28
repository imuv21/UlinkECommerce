import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const PaymentFailed = () => {

    return (
        <Fragment>
            <Helmet>
                <title>Payment Failed</title>
            </Helmet>
            <article className='flexcol paymentsuccess'>
                <h1 className="heading">Payment Failed!</h1>
                <Link className='btn2 box flex' style={{width : '200px'}} to="/">Back to Home</Link>
            </article>
        </Fragment>
    )
}

export default PaymentFailed
