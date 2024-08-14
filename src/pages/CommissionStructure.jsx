import React, { Fragment } from 'react';
import { urls } from '../components/Schemas/images';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const CommissionStructure = () => {

    //images
    const logo = urls[0];

    const cate = [
        {
            id: uuidv4(),
            title: 'Food & beverage',
            percent: 5
        },
        {
            id: uuidv4(),
            title: 'Consumer electronics',
            percent: 5
        },
        {
            id: uuidv4(),
            title: 'Home, garden & furniture',
            percent: 7
        },
        {
            id: uuidv4(),
            title: 'Office & stationery',
            percent: 7
        },
        {
            id: uuidv4(),
            title: 'Baby center',
            percent: 7
        },
        {
            id: uuidv4(),
            title: 'Sports & fitness',
            percent: 7
        },
        {
            id: uuidv4(),
            title: 'Pet & animal care',
            percent: 7
        },
        {
            id: uuidv4(),
            title: 'Construction & hardware',
            percent: 7
        },
        {
            id: uuidv4(),
            title: 'Beauty & fragrances',
            percent: 8
        },
        {
            id: uuidv4(),
            title: 'Fashion & accessories',
            percent: 8
        },
        {
            id: uuidv4(),
            title: 'Machinery & Equipment',
            percent: 8
        },
        {
            id: uuidv4(),
            title: 'Automotive',
            percent: 8
        },
        {
            id: uuidv4(),
            title: 'Health & Personal Care',
            percent: 9
        },
        {
            id: uuidv4(),
            title: 'Toys',
            percent: 7
        },

    ]

    const navigate = useNavigate();
    const signup = () => {
        navigate('/signup');
    }


    return (
        <Fragment>
            <Helmet>
                <title>Ulink's Commission Structure</title>
            </Helmet>
            <div className="flexcol wh home commission">
                <div className="cs-box4">
                    <div className="cs-box3">
                        <div className="heading4 wh">Ulink's commission structure</div>
                        <div className="descrip2 wh" style={{ color: 'white' }}>At Ulink you can register for free, and you will only ever pay a small commission on actual sales. No hidden fees. It's simple: your success is our success!</div>
                        <button onClick={signup} className='btn box flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Register now</div></button>
                    </div>
                    <div className="cs-box2">
                        <img className='commission-logo' src={logo} alt="logo" />
                    </div>
                </div>
                <div className="flexcol wh commission-box">
                    <div className="fee heading2">FREE</div>
                    <div className="heading3 wh">Registration</div>
                    <div className="heading3 wh">Become a registered seller on the leading business buying platform in the world:</div>
                    <div className="cs-box">
                        <div className="heading2 list">Register your company</div>
                        <div className="heading2 list">List an unlimited number of products</div>
                        <div className="heading2 list">Get our expert support with uploading your products</div>
                        <div className="heading2 list">Expand your company's online presence and showcase your products</div>
                    </div>

                    <div className="fee heading2" style={{ marginTop: '30px' }}>STANDARD FEE %</div>
                    <div className="heading3 wh">Sell on Ulink</div>
                    <div className="heading3 wh">Use all the features that will save you time and money, whilst increasing your sales:</div>
                    <div className="cs-box">
                        <div className="heading2 list">Get access to the market with 500+ million business people</div>
                        <div className="heading2 list">Make sales at set prices, or allow buyers to negotiate directly with you</div>
                        <div className="heading2 list">Pay commission only when you make a sale</div>
                        <div className="heading2 list">For sellers outside the UAE it means they don’t need a local office and import license.</div>
                    </div>
                </div>

                <div className="flexcol wh" style={{ gap: '10px' }}>
                    <div className="heading5 wh">Commission % by Categories</div>
                    {
                        cate.map((item) => (
                            <div className="flex cate wh" key={uuidv4()} style={{ justifyContent: 'space-between' }}>
                                <div className="heading3">{item.title}</div><div className="heading3">{item.percent}%</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default CommissionStructure