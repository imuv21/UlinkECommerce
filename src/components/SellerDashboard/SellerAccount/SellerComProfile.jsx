import React from 'react';
import { Helmet } from 'react-helmet-async';

const SellerComProfile = () => {
    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Company Profile</title>
            </Helmet>
            <div className="productlist3">
                <div className="flexcol" style={{ gap: '20px' }}>
                    <div className="heading wh">My Addresses</div>
                    <div className="heading2 wh">Provide information on your billing address and where you would like your items to be picked up from. <br /> We need your stock pickup location details in order to calculate accurate shipping rates.</div>
                </div>
                <div className="flexcol" style={{ gap: '20px' }}>
                    <button  className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Address</div></button>
                </div>
            </div>
        </div>
    )
}

export default SellerComProfile