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
                <title>Commission Structure | Ulinkit - Understand Your Earnings</title>
                <meta name="description" content="Learn about Ulinkit's commission structure for sellers. Get detailed information on how commissions are calculated and maximize your earnings on our platform." />
                <link rel="canonical" href="https://www.ulinkit.com/commission-structure" />
            </Helmet>
            <div className="flexcol wh home commission">
                <article className="cs-box4">
                    <div className="cs-box3">
                        <h1 className="heading4 wh">Ulink's commission structure</h1>
                        <h2 className="descrip2 wh" style={{ color: 'white' }}>At Ulink you can register for free, and you will only ever pay a small commission on actual sales. No hidden fees. It's simple: your success is our success!</h2>
                        <button onClick={signup} className='btn box flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Register now</div></button>
                    </div>
                    <div className="cs-box2">
                        <img className='commission-logo' src={logo} alt="commission-logo" />
                    </div>
                </article>

                <article className="flexcol wh commission-box">
                    <p className="fee heading2">FREE</p>
                    <h1 className="heading3 wh">Registration</h1>
                    <h2 className="heading3 wh">Become a registered seller on the leading business buying platform in the world:</h2>
                    <div className="cs-box">
                        <p className="heading2 list">Register your company</p>
                        <p className="heading2 list">List an unlimited number of products</p>
                        <p className="heading2 list">Get our expert support with uploading your products</p>
                        <p className="heading2 list">Expand your company's online presence and showcase your products</p>
                    </div>

                    <p className="fee heading2" style={{ marginTop: '30px' }}>STANDARD FEE %</p>
                    <h3 className="heading3 wh">Sell on Ulink</h3>
                    <h4 className="heading3 wh">Use all the features that will save you time and money, whilst increasing your sales:</h4>
                    <div className="cs-box">
                        <p className="heading2 list">Get access to the market with 500+ million business people</p>
                        <p className="heading2 list">Make sales at set prices, or allow buyers to negotiate directly with you</p>
                        <p className="heading2 list">Pay commission only when you make a sale</p>
                        <p className="heading2 list">For sellers outside the UAE it means they don’t need a local office and import license.</p>
                    </div>
                </article>

                <div className="flexcol wh" style={{ gap: '10px' }}>
                    <h1 className="heading5 wh">Commission % by Categories</h1>
                    {
                        cate.map((item) => (
                            <div className="flex cate wh" key={uuidv4()} style={{ justifyContent: 'space-between' }}>
                                <p className="heading3">{item.title}</p><div className="heading3">{item.percent}%</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default CommissionStructure