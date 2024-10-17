import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import three from '../assets/user.jpg';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SellIcon from '@mui/icons-material/Sell';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';


const Source = () => {

    return (
        <Fragment>
            <Helmet>
                <title>Ulinkit - Your Global Marketplace for Products and Services</title>
                <meta name="description" content="Discover a world of products and services on Ulinkit. Shop from various categories, explore deals, and enjoy a seamless shopping experience." />
                <link rel="canonical" href="https://www.ulinkit.com/source-on-ulinkit" />
            </Helmet>
            <section className="sourceBanner" style={{ background: '#003953' }}>
                <article className="sourceText">
                    <h1 className="heading4">Faster, cheaper buying for your business</h1>
                    <h2 className="heading" style={{ color: 'white' }}>Do all your wholesale sourcing on one platform. Get the products you need, at the prices you want.</h2>
                    <button className='btn box' style={{ background: 'var(--CodeOne)', width: 'fit-content', padding: '10px 30px' }}>Register</button>
                </article>
                <div className="sourceImg">
                    <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1729144832/Ulinkit/Only_Box_76a6515490_uxsbgy.webp" alt="products" />
                </div>
            </section>

            <article className="flexcol wh home-alt" style={{ background: '#f0f0f0' }}>
                <div className="flexcol wh" style={{ gap: '20px' }}>
                    <h1 className="heading5" style={{ color: '#003953' }}>What our customers say</h1>
                </div>
                <div className="perfect-grid2" style={{ gap: '8%' }}>
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <div className="photo">
                            <img src={three} alt="three" />
                        </div>
                        <h2 className="italic">
                            Ulinkit makes negotiation very easy. I can select the products I want and send my target prices to the sellers directly. The whole process is very structured and effective.
                        </h2>
                        <h3 className="descrip"> Tamron, General Manager, Dubai</h3>
                    </div>
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <div className="photo">
                            <img src={three} alt="three" />
                        </div>
                        <h4 className="italic">
                            I can find any product I want on Ulinkit. I can easily see multiple options, compare prices, and get in touch with the seller.
                        </h4>
                        <h5 className="descrip"> Asante General Trading, Dubai</h5>
                    </div>
                </div>
            </article>

            <section className="sourceBanner" style={{ background: 'white' }}>
                <article className="sourceTextTwo">
                    <h1 className="heading5" style={{ color: '#003953' }}>Why source on Ulinkit?</h1>
                    <div className="sourceTextBox">
                        <p className='heading3'>Increase your margins</p>
                        <p className="heading2">“...I don’t mind admitting it’s the secret behind our higher profits...”</p>
                    </div>
                    <div className="sourceTextBox">
                        <p className='heading3'>Easily import from anywhere</p>
                        <p className="heading2">“...great selection from China, India or more than 50 other countries.”</p>
                    </div>
                    <div className="sourceTextBox">
                        <p className='heading3'>Convenient payment & invoicing</p>
                        <p className="heading2">“...a relief to pay for everything with a quick bank transfer.”</p>
                    </div>
                    <div className="sourceTextBox">
                        <p className='heading3'>One place to communicate</p>
                        <p className="heading2">“Frankly, never going back to chasing suppliers across email, phone and chat apps.”</p>
                    </div>
                </article>
                <div className="sourceImg">
                    <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1729144832/Ulinkit/Only_Box_76a6515490_uxsbgy.webp" alt="products" />
                </div>
            </section>

            <section className='sourcehow'>
                <h1 className="heading5" style={{ color: '#003953' }}>How it works</h1>
                <section className='sourcegrid'>
                    <article className='sourcegriditem'>
                        <div className="sourceNum">1</div>
                        <h1 className="heading2">Register for free in 3 easy steps</h1>
                    </article>
                    <article className='sourcegriditem'>
                        <div className="sourceNum">2</div>
                        <h1 className="heading2">Browse 4 million+ products</h1>
                    </article>
                    <article className='sourcegriditem'>
                        <div className="sourceNum">3</div>
                        <h1 className="heading2">Order & Pay</h1>
                    </article>
                    <article className='sourcegriditem'>
                        <div className="sourceNum">4</div>
                        <h1 className="heading2">Get it fast with our shipping solutions</h1>
                    </article>
                </section>
            </section>

            <section className="valueAdded">
                <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1729150879/Ulinkit/hands-typing-laptop-computer-coffee-shop_gb2yty.jpg" alt="value" />

                <div className='valuediv'>
                    <h1 className="heading5" style={{ color: '#003953' }}>Value-added services for your business</h1>

                    <section className="valuegrid">
                        <article className="valuegriditem">
                            <div className="valueicon"><InsertDriveFileIcon /></div>
                            <div className="vlauetext">
                                <h1 className="heading3">Customs and product clearance registration</h1>
                                <h2 className="heading2">Enjoy peace of mind that your products are compliant with local standards. One point of contact, hassle-free process. All your certification needs addressed.</h2>
                            </div>
                        </article>
                        <article className="valuegriditem">
                            <div className="valueicon"><SellIcon /></div>
                            <div className="vlauetext">
                                <h1 className="heading3">Customs and product clearance registration</h1>
                                <h2 className="heading2">Enjoy peace of mind that your products are compliant with local standards. One point of contact, hassle-free process. All your certification needs addressed.</h2>
                            </div>
                        </article>
                        <article className="valuegriditem">
                            <div className="valueicon"><CategoryIcon /></div>
                            <div className="vlauetext">
                                <h1 className="heading3">Customs and product clearance registration</h1>
                                <h2 className="heading2">Enjoy peace of mind that your products are compliant with local standards. One point of contact, hassle-free process. All your certification needs addressed.</h2>
                            </div>
                        </article>
                        <article className="valuegriditem">
                            <div className="valueicon"><PaymentIcon /></div>
                            <div className="vlauetext">
                                <h1 className="heading3">Customs and product clearance registration</h1>
                                <h2 className="heading2">Enjoy peace of mind that your products are compliant with local standards. One point of contact, hassle-free process. All your certification needs addressed.</h2>
                            </div>
                        </article>
                    </section>
                </div>
            </section>

            <section className='sourcelook'>
                <h1 className="heading5" style={{ color: '#003953' }}>Look no further. We have it all. And we keep growing.</h1>
                <div className="lookgrid">
                    <div className="lookitem">
                        <div className="looknum">4 mill+</div>
                        <p className="heading3" style={{ color: '#003953' }}>SKU’s</p>
                    </div>
                    <div className="lookitem">
                        <div className="looknum">350k+</div>
                        <p className="heading3" style={{ color: '#003953' }}>unique visitors/month</p>
                    </div>
                    <div className="lookitem">
                        <div className="looknum">14</div>
                        <p className="heading3" style={{ color: '#003953' }}>categories</p>
                    </div>
                    <div className="lookitem">
                        <div className="looknum">5.5x</div>
                        <p className="heading3" style={{ color: '#003953' }}>trade volume growth in the last 6 months</p>
                    </div>
                </div>
            </section>

            <section className="flexcol wh home" style={{ gap: '60px', backgroundColor: 'var(--CodeTwoHover)', color: 'white' }}>
                <article className="flexcol wh" style={{ gap: '20px' }}>
                    <h1 className="heading5" style={{ color: 'var(--bgClr)' }}>Join Ulink today!</h1>
                    <h2 className="heading2" style={{ color: 'var(--bgClr)' }}>Boost your business and increase your sales anywhere in the world.</h2>
                </article>
            </section>
        </Fragment>
    )
}

export default Source