import React, { Fragment, useState } from 'react';
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../assets/json/animation.json";
import global from '../assets/global.png';
import finance from '../assets/finance.png';
import shipping from '../assets/shipping.png';
import invoice from '../assets/invoice.png';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import PageviewIcon from '@mui/icons-material/Pageview';
import three from '../assets/user.jpg';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Amazon_Global_Selling_Logo from '../assets/Amazon_Global_Selling_Logo.png';
import dpworld from '../assets/dpworld.png';
import amazon from '../assets/amazon.png';
import howitworks from '../assets/howitworks.png';
import ulinkposter from '../assets/comp.png';
import './Cart/cart.css';
import { Helmet } from 'react-helmet-async';



const BecomeASeller = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const navigate = useNavigate();
    const signup = () => {
        navigate('/signup');
    }

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //json lottie animation
    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
    };
    const { View } = useLottie(options);

    const howork = [
        {
            id: uuidv4(),
            title: 'Easily upload and manage your products',
            dis: 'Showcase your products in the best way. Our team will help you upload your catalogue and launch sales promotions.',
        },
        {
            id: uuidv4(),
            title: 'Use Ulink Logistics to get your products to market',
            dis: 'Look no further for seamless support with import, export, customs, shipping, warehousing, and last-mile delivery.',
        },
        {
            id: uuidv4(),
            title: 'Get world-class customer support',
            dis: 'Count on hands-on support and account management from the moment you register. Your buyers will receive fast and responsive customer service in the local languages of their choice.',
        },
        {
            id: uuidv4(),
            title: 'Boost your sales: we offer finance and credit solutions to your buyers',
            dis: 'Your buyers can apply for trade finance with us. You get paid immediately and the buyer has set repayment terms with us: it eases their cashflow and encourages them to buy faster and with greater confidence.',
        },
    ]

    const faqs = [
        {
            id: uuidv4(),
            num: 1,
            question: 'How do I register as a Seller on Ulink?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 2,
            question: 'How do I start selling on Ulink?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 3,
            question: 'What products can I sell on Ulink?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 4,
            question: 'What is the benefit of being verified as a Seller?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 4,
            question: 'What is the benefit of being verified as a Seller?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 5,
            question: 'How to get verified as a Seller?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 6,
            question: 'Can I sell in the UAE?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 7,
            question: 'How will I be paid for orders?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 8,
            question: 'How do I track my orders?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 9,
            question: 'How can I see and manage negotiations?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 10,
            question: 'Who will invoice the Buyers?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
        {
            id: uuidv4(),
            num: 11,
            question: 'How can I improve the sales of my product?',
            answer: (<div className="flexcol-start bas-panel wh">
                <div className="heading2">Registering as a Seller is easy!</div>
                <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                <div className="heading2">Complete a short form with your personal and business information.</div>
            </div>),
        },
    ]


    return (
        <Fragment>
            <Helmet>
                <title>Become A Seller</title>
                <meta name="Sell more! Unlock the global market." content="Easily sell to the all over the globe without opening a local office. Tens of thousands of verified wholesale buyers are only a few clicks away." />
            </Helmet>

            <div className="svg-bg">
                <div className="svg-content flexcol-start" style={{ gap: '20px' }}>
                    <div className="heading4">Sell more! Unlock the global market.</div>
                    <div className="heading" style={{ color: 'white', fontWeight: '400' }}>Easily sell to the all over the globe without opening a local office. Tens of thousands of verified wholesale buyers are only a few clicks away.</div>
                    <button onClick={signup} className='btn box flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Become A Seller</div></button>
                </div>
                <div className="svg-content flex">
                    <div style={{ width: '70%' }}>
                        {View}
                    </div>
                </div>
            </div>

            <div className="flexcol wh home-alt">
                <div className="heading5" style={{ textAlign: 'center', width: '80%', color: 'var(--CodeTwo)' }}>Trade with confidence: We are backed by the Indian Government and strategically located in India (Delhi).</div>
                <div className="perfect-grid">
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <img src={global} className='grid-icon' alt='global' />
                        <div className="heading3">Enter the wholesale/retail market anywhere in the world</div>
                        <div className="heading2">Our verified B2B and B2C buyers are looking for products like yours</div>
                    </div>
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <img src={finance} className='grid-icon' alt='global' />
                        <div className="heading3">Access trade finance & credit insurance</div>
                        <div className="heading2">Access trade finance & credit insurance</div>
                    </div>
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <img src={shipping} className='grid-icon' alt='global' />
                        <div className="heading3">Convenient cross-border logistic services</div>
                        <div className="heading2">Experience the integrated digital solutions for shipping, customs clearance, export licences, product registration and more</div>
                    </div>
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <img src={invoice} className='grid-icon' alt='global' />
                        <div className="heading3">Find active buyers in the RFQ Marketplace</div>
                        <div className="heading2">Submit bids on open RFQs to connect with buyers who are looking for products like yours</div>
                    </div>
                </div>
            </div>

            <div className="flexcol wh home-alt">
                <div className="perfect-grid2">
                    <div className='ulink-img'>
                        <img src={howitworks} alt="img" />
                    </div>
                    <div className='flexcol-start' style={{ gap: '30px' }}>
                        <div className="heading5">How it works</div>

                        {
                            howork.map((item, index) => (
                                <div className='flexcol-start' key={uuidv4()} style={{ gap: '10px' }}>
                                    <div className="heading3">{index + 1}. {item.title}</div>
                                    <div className="heading2">{item.dis}</div>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className="flexcol wh">
                    <div className="flex wh" style={{ gap: '20px' }}>
                        <button onClick={() => handlePageChange(1)} style={{ width: '200px' }} className={currentPage === 1 ? 'toggle-active btn-toggle box flex' : 'btn-toggle box flex'}><div className="heading2">Payment Terms</div></button>
                        <button onClick={() => handlePageChange(2)} style={{ width: '200px' }} className={currentPage === 2 ? 'toggle-active btn-toggle box flex' : 'btn-toggle box flex'}><div className="heading2">Commission Structure</div></button>
                    </div>

                    {currentPage === 1 && (
                        <div className='flexcol wh page'>
                            <div className="descrip2">We offer the widest range of payment terms. This ensures that you and your customers can conclude your transactions in a way that best suits your business needs. <br /> You will receive payment twice per month.</div>
                            <div className="flexcol wh" style={{ gap: '20px' }}>
                                <div className='heading'>Available payment terms include</div>
                                <div className="perfect-grid2">
                                    <div className='flex'>
                                        <CheckCircleIcon style={{ color: 'var(--CodeTwo)' }} /> &nbsp; Debit Card
                                    </div>
                                    <div className='flex'>
                                        <CheckCircleIcon style={{ color: 'var(--CodeTwo)' }} /> &nbsp; Credit Card
                                    </div>
                                    <div className='flex'>
                                        <CheckCircleIcon style={{ color: 'var(--CodeTwo)' }} /> &nbsp; Bank transfer
                                    </div>
                                    <div className='flex'>
                                        <CheckCircleIcon style={{ color: 'var(--CodeTwo)' }} /> &nbsp; Cash on delivery
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentPage === 2 && (
                        <div className='flexcol wh page'>
                            <div className="descrip2">Register and become a Ulink seller for free! Based on our simple commission structure you will only ever pay a commission on actual sales, at the lowest rate in the market. No hidden fees.</div>
                            <div className="flex" style={{ gap: '30px' }}>
                                <div className="flex">
                                    <DownloadIcon style={{ color: 'var(--CodeTwo)' }} /> &nbsp; <a href='../assets/json/GOT.epub' className='download-btn' download target='_blank'>DOWNLOAD AS PDF</a>
                                </div>
                                <div className="flex">
                                    <PageviewIcon style={{ color: 'var(--CodeTwo)' }} /> &nbsp; <Link className='download-btn' to='/commission-structure'>VIEW STRUCTURE</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flexcol wh home-alt" style={{ backgroundColor: 'var(--bgClr)' }}>
                <div className="perfect-grid2">
                    <div className='flexcol' style={{ gap: '30px', alignItems: 'start' }}>
                        <div className="heading5">International sellers, we help you!</div>
                        <div className='flex-start' style={{ gap: '10px' }}>
                            <CheckCircleIcon style={{ color: 'var(--CodeTwo)' }} />We help with Customs Clearance and Product Registration.
                        </div>
                        <div className='flex-start' style={{ gap: '10px' }}>
                            <CheckCircleIcon style={{ color: 'var(--CodeTwo)' }} />Easily sell anywhere in the world. No need for your own local office.
                        </div>
                        <div className='flex-start' style={{ gap: '10px' }}>
                            <CheckCircleIcon style={{ color: 'var(--CodeTwo)' }} />We offer Exporter of Record services, if you do not have an export licence.
                        </div>
                    </div>
                    <div className='ulink-img'>
                        <img src={ulinkposter} alt="img" />
                    </div>
                </div>

                <div className="flexcol wh" style={{ gap: '10px' }}>
                    <div className="heading5">Our International trade partners</div>
                    <div className="descrip3">Our trade partners gets exclusive benefits.</div>
                    <div className="perfect-grid2 trade">
                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 93" role="img" data-testid="tradeling-header-logo"><g fill="none"><path fill="#FB641E" d="M53.437 71.577c-10.064 0-18.222-8.158-18.222-18.222 0-10.064 8.158-18.222 18.222-18.222 10.064 0 18.222 8.158 18.222 18.222a18.222 18.222 0 0 1-18.222 18.222"></path><path fill="#FFF" d="M0 23.866 23.866 0l23.866 23.866-23.866 23.866zM98.229 4.746h12.386v12.386H98.229zM110.529 35.718v19.885c0 5.161 3.728 5.255 10.8 4.874v11.185c-17.3 1.912-23.134-3.156-23.134-16.059V35.718h-8.317V23.866h31.454v11.852h-10.803zm44.831-12.809v13.766c-6.4-.764-14.531 2.1-14.531 12.139v22.848h-12.332v-47.8h12.332v8.22c2.486-6.5 8.509-9.176 14.531-9.176m41.354 24.857c0-8.03-5.639-13.479-13.288-13.479-7.551 0-13.192 5.449-13.192 13.479s5.641 13.48 13.192 13.48c7.649 0 13.288-5.45 13.288-13.48m12.331-23.9v47.8h-12.331v-5.64c-3.441 4.3-8.6 6.979-15.582 6.979-12.713 0-23.23-11-23.23-25.238s10.52-25.235 23.23-25.235c6.978 0 12.141 2.677 15.582 6.978v-5.64l12.331-.004zm43.457 23.901c0-8.03-5.64-13.48-13.191-13.48-7.648 0-13.289 5.45-13.289 13.48 0 8.03 5.641 13.478 13.289 13.478 7.551 0 13.191-5.449 13.191-13.478m12.331-43.018v66.915h-12.331v-5.64c-3.441 4.4-8.508 6.979-15.485 6.979-12.81 0-23.326-10.994-23.326-25.236s10.516-25.235 23.331-25.235c6.977 0 12.044 2.582 15.485 6.979V4.746h12.326zm41.389 38.524c-1.531-6.883-6.692-9.655-11.854-9.655-6.6 0-11.091 3.538-12.522 9.655h24.376zM295.51 61.815c4.12.16 8.079-1.607 10.712-4.779l9.94 5.735C311.669 69.271 304.5 73 295.323 73c-16.059 0-26.191-10.994-26.191-25.237 0-14.243 10.223-25.234 25.232-25.234 14.147 0 24.183 11.185 24.183 25.236a28.423 28.423 0 0 1-.477 5.067h-36.038c1.722 6.308 6.979 8.985 13.478 8.985"></path><path fill="#FB641E" d="M322.894.078h12.331v71.583h-12.331zM405.578 42.315v29.347h-12.332V43.844c0-6.5-3.918-9.846-9.465-9.846-6.021 0-10.514 3.537-10.514 11.854v25.81h-12.331v-47.8h12.331v5.353c2.868-4.3 7.84-6.69 14.244-6.69 10.134 0 18.067 7.073 18.067 19.787m43.744 4.687c0-7.552-5.64-13-13.383-13-7.743 0-13.384 5.449-13.384 13 0 7.646 5.642 13.095 13.384 13.095s13.383-5.449 13.383-13.095m12.045-23.135v45.5c0 15.678-12.332 22.752-24.95 22.752-10.228 0-18.449-3.921-22.656-11.663l10.517-6.021c2.007 3.726 5.161 6.69 12.522 6.69 7.742 0 12.522-4.205 12.522-11.758v-5.161c-3.345 4.492-8.507 7.263-15.294 7.263-13.575 0-23.8-10.992-23.8-24.47-.006-13.38 10.222-24.467 23.794-24.467 6.787 0 11.949 2.772 15.294 7.265v-5.93h12.051zm-119.51-12.378a6.717 6.717 0 1 1 12.907 2.593 6.718 6.718 0 0 1-6.253 4.107 6.746 6.746 0 0 1-6.655-6.7M342.219 71.643l.15-47.797 12.331.038-.15 47.797z"></path></g></svg></div>
                        <div><img src={Amazon_Global_Selling_Logo} className='grid-icon' alt="logo" /></div>
                        <div><img src={dpworld} className='grid-icon' alt="logo" /></div>
                        <div><img src={amazon} className='grid-icon' alt="logo" /></div>
                    </div>
                </div>
            </div>

            <div className="flexcol wh home-alt">
                <div className="flexcol wh" style={{ gap: '20px' }}>
                    <div className="heading5">Success stories</div>
                </div>
                <div className="perfect-grid2" style={{ gap: '8%' }}>
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <div className="photo">
                            <img src={three} alt="photo" />
                        </div>
                        <div className="italic">

                            U-link IT US aims for the highest levels of quality, and they do this by paying close attention to every little thing. They do their best to meet the needs of the growing market.
                        </div>
                        <div className="descrip"> Tamron, General Manager, Dubai</div>
                    </div>
                    <div className='flexcol' style={{ gap: '20px' }}>
                        <div className="photo">
                            <img src={three} alt="photo" />
                        </div>
                        <div className="italic">

                            They have long held the opinion that an internet business needs to be expertly represented in order to exist, and U-link IT US provides just that.
                        </div>
                        <div className="descrip"> Asante General Trading, Dubai</div>
                    </div>
                </div>
            </div>

            <div className="flexcol wh home-alt" style={{ backgroundColor: 'var(--bgClr)' }}>
                <div className="flexcol wh" style={{ gap: '20px' }}>
                    <div className="heading5">Frequently asked questions</div>
                </div>
                <div className="flexcol wh">

                    <div className={`accordion-pd ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleAccordion(1)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <HelpCenterIcon />
                            <div className="heading2">How do I register as a Seller on Ulink?</div>
                        </div>
                    </div>
                    <div className="panel-pd wh" style={{ maxHeight: activeIndex === 1 ? '300px' : '0' }}>
                        <div className="flexcol-start bas-panel wh">
                            <div className="heading2">Registering as a Seller is easy!</div>
                            <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                            <div className="heading2">Complete a short form with your personal and business information.</div>
                        </div>
                    </div>

                    <div className={`accordion-pd ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleAccordion(2)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <HelpCenterIcon />
                            <div className="heading2">How do I start selling on Ulink?</div>
                        </div>
                    </div>
                    <div className="panel-pd wh" style={{ maxHeight: activeIndex === 2 ? '300px' : '0' }}>
                        <div className="flexcol-start bas-panel wh">
                            <div className="heading2">Registering as a Seller is easy!</div>
                            <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                            <div className="heading2">Complete a short form with your personal and business information.</div>
                        </div>
                    </div>

                    <div className={`accordion-pd ${activeIndex === 3 ? 'active' : ''}`} onClick={() => toggleAccordion(3)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <HelpCenterIcon />
                            <div className="heading2">What products can I sell on Ulink?</div>
                        </div>
                    </div>
                    <div className="panel-pd wh" style={{ maxHeight: activeIndex === 3 ? '300px' : '0' }}>
                        <div className="flexcol-start bas-panel wh">
                            <div className="heading2">Registering as a Seller is easy!</div>
                            <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                            <div className="heading2">Complete a short form with your personal and business information.</div>
                        </div>
                    </div>

                    <div className={`accordion-pd ${activeIndex === 4 ? 'active' : ''}`} onClick={() => toggleAccordion(4)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <HelpCenterIcon />
                            <div className="heading2">What is the benefit of being verified as a Seller?</div>
                        </div>
                    </div>
                    <div className="panel-pd wh" style={{ maxHeight: activeIndex === 4 ? '300px' : '0' }}>
                        <div className="flexcol-start bas-panel wh">
                            <div className="heading2">Registering as a Seller is easy!</div>
                            <div className="heading2"><a className='heading2' href="/signup">Click here</a> to start creating your Seller account.</div>
                            <div className="heading2">Complete a short form with your personal and business information.</div>
                        </div>
                    </div>



                    <Link to="/faq" className='btn box flex' style={{ width: '20%', marginTop: '20px', backgroundColor: 'var(--CodeOne)' }} type='submit'><div className="heading2">View all FAQs</div></Link>
                </div>
            </div>

            <div className="flexcol wh home" style={{ gap: '60px', backgroundColor: 'var(--CodeTwoHover)', color: 'white' }}>
                <div className="flexcol wh" style={{ gap: '20px' }}>
                    <div className="heading5" style={{ color: 'var(--bgClr)' }}>Join Ulink today!</div>
                    <div className="heading2" style={{ color: 'var(--bgClr)' }}>Boost your business and increase your sales anywhere in the world.</div>
                </div>
            </div>

        </Fragment>
    );
};

export default BecomeASeller;

