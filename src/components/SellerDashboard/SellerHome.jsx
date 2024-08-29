import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { setVerifiedSeller } from '../../Redux/AuthReducer';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import logo from '../../assets/logo.png';
import img1 from '../../assets/img1.webp';
import img2 from '../../assets/img2.webp';
import img3 from '../../assets/img3.webp';
import img4 from '../../assets/img4.webp';
import img5 from '../../assets/img5.webp';

const SellerHome = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const uploadedImageUrl = useSelector((state) => state.sellerBusinessProfile.imageUrl);
    const defaultImageUrl = "https://res.cloudinary.com/dey1tujp8/image/upload/v1719407087/imgdefault_ssubhu.jpg";
    const [profileImgSeller, setProfileImgSeller] = useState(defaultImageUrl);

    useEffect(() => {
        if (uploadedImageUrl) {
            setProfileImgSeller(uploadedImageUrl);
        } else {
            setProfileImgSeller(defaultImageUrl);
        }
    }, [uploadedImageUrl]);

    const quickLinks = [
        {
            id: 1,
            title: 'Add Product',
            link: '/seller-dashboard/add-single-product'
        },
        {
            id: 2,
            title: 'Add Multiple Products',
            link: '/seller-dashboard/upload-products-bulk'
        },
        {
            id: 3,
            title: 'Edit Product',
            link: '/seller-dashboard/product-list'
        },
        {
            id: 4,
            title: 'Create Promotion',
            link: '/'
        },
    ]
    const tvps = [
        {
            id: 1,
            img: img1,
            title: 'Al Mudhish Tea Milk Catering 410g x 48'
        },
        {
            id: 2,
            img: img2,
            title: 'Al Mudhish Tea Milk Catering 410g x 48'
        },
        {
            id: 3,
            img: img3,
            title: 'Al Mudhish Tea Milk Catering 410g x 48'
        },
    ]
    const tsps = [
        {
            id: 1,
            img: img4,
            title: 'Al Mudhish Tea Milk Catering 410g x 48'
        },
        {
            id: 2,
            img: img2,
            title: 'Al Mudhish Tea Milk Catering 410g x 48'
        },
        {
            id: 3,
            img: img5,
            title: 'Al Mudhish Tea Milk Catering 410g x 48'
        },
    ]


    //steps-related
    const { bankDetails } = useSelector((state) => state.bankDetails);
    const { sellerprofile } = useSelector((state) => state.sellerBusinessProfile);

    const [steps, setSteps] = useState([
        { step: 1, label: 'Verify your contacts', completed: true },
        { step: 2, label: 'Upload your business documents', completed: false },
        { step: 3, label: 'Set up your bank details', completed: false },
    ]);

    useEffect(() => {
        try {
            if (sellerprofile && sellerprofile.documents) {
                const { IDENTITY_DOCUMENT, TRADE_LICENSE } = sellerprofile.documents;
                if (IDENTITY_DOCUMENT && TRADE_LICENSE) {
                    const identityDocumentStatus = IDENTITY_DOCUMENT.status;
                    const tradeLicenseStatus = TRADE_LICENSE.status;
                    const allDocumentsVerified = identityDocumentStatus === 'VERIFIED' && tradeLicenseStatus === 'PENDING';
                    setSteps(prevSteps => prevSteps.map(step =>
                        step.step === 2 ? { ...step, completed: allDocumentsVerified } : step
                    ));
                } else {
                    console.log('Documents data is missing');
                }
            } else {
                console.log('Seller profile or documents are not defined');
            }
        } catch (error) {
            console.log('Error updating steps:', error);
        }
    }, [sellerprofile]);





    useEffect(() => {
        const hasDefaultBank = bankDetails.some(bank => bank.defaultValue);
        setSteps(prevSteps => prevSteps.map(step =>
            step.step === 3 ? { ...step, completed: hasDefaultBank } : step
        ));
    }, [bankDetails]);

    useEffect(() => {
        const allStepsCompleted = steps.every(step => step.completed);
        if (allStepsCompleted) {
            dispatch(setVerifiedSeller(true));
        } else {
            dispatch(setVerifiedSeller(false));
        }
    }, [steps, dispatch]);

    const stepProcess = [
        {
            id: uuidv4(),
            icon: 'https://res.cloudinary.com/dey1tujp8/image/upload/v1717742790/2243986_android_mobile_phone_app_communication_icon_a5qape.png',
            title: 'Verify your mobile',
            description: 'To complete your seller profile we need to verify your mobile number.',
            btn: 'Verify mobile number',
            link: '/profile',
        },
        {
            id: uuidv4(),
            icon: 'https://res.cloudinary.com/dey1tujp8/image/upload/v1717747167/3123_documents_icon_dgij1z.png',
            title: 'Upload your business documents',
            description: 'To complete your seller profile we need to verify your business documents.',
            btn: 'Upload documents',
            link: '/seller-dashboard/seller-company-profile',
        },
        // {
        //     id: uuidv4(),
        //     icon: 'https://res.cloudinary.com/dey1tujp8/image/upload/v1717747167/3123_documents_icon_dgij1z.png',
        //     title: 'Set shipping preferences',
        //     description: 'To complete your seller profile, please select your shipping preference.',
        //     btn: 'Set preferences',
        //     link: '/seller-dashboard/shipping-preferences',
        // },
        {
            id: uuidv4(),
            icon: 'https://res.cloudinary.com/dey1tujp8/image/upload/v1717740444/5452454_and_bank_banking_buildings_business_icon_vvoa4o.png',
            title: 'Set up your bank details',
            description: 'Why do we need bank details. We want to pay you so tell us about your bank account and we’ll tie this to your account.',
            btn: 'Set up bank details',
            link: '/seller-dashboard/payments',
        },
    ];
    const getCurrentStep = () => {
        for (let i = 0; i < steps.length; i++) {
            if (!steps[i].completed) {
                return i;
            }
        }
        return steps.length;
    };
    const currentStepIndex = getCurrentStep();
    const filteredStepProcess = stepProcess.slice(currentStepIndex, currentStepIndex + 1);
    const allStepsCompleted = steps.every(step => step.completed);
    const updateProgressBar = (id, value) => {
        const progressBar = document.getElementById(`progressBar-${id}`);
        progressBar.style.width = value + "%";
    };


    //keywords
    const keywords = [
        {
            id: 15,
            num: '#',
            keyword: 'Keywords',
            progress: null
        },
        {
            id: 5,
            num: 1,
            keyword: 'BGM',
            progress: 50
        },
        {
            id: 6,
            num: 2,
            keyword: 'Ramadan',
            progress: 40
        },
        {
            id: 7,
            num: 3,
            keyword: 'Samsung Galaxy S23 leather cow',
            progress: 80
        },
        {
            id: 8,
            num: 4,
            keyword: 'iPhone 15 Calf',
            progress: 60
        },
        {
            id: 9,
            num: 5,
            keyword: 'For Samsung Galaxy',
            progress: 10
        },
        {
            id: 10,
            num: 6,
            keyword: 'leather phone case',
            progress: 30
        },
        {
            id: 11,
            num: 7,
            keyword: 'Mop Bucket',
            progress: 20
        },
        {
            id: 12,
            num: 8,
            keyword: 'water',
            progress: 70
        },
        {
            id: 13,
            num: 9,
            keyword: 'phone accessories',
            progress: 90
        },
        {
            id: 14,
            num: 10,
            keyword: 'sugar',
            progress: 100
        },
    ]

    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.focus();
        }

        keywords.forEach(item => {
            updateProgressBar(item.id, item.progress);
        });
    }, []);

    const isVerifiedSeller = useSelector((state) => state.auth.isVerifiedSeller);

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Seller Dashboard | Ulinkit - Manage Your Store and Sales</title>
                <meta name="description" content="Access your seller dashboard on Ulinkit to manage your store, track sales, and monitor performance. Get insights and tools to optimize your online business effectively." />
                <link rel="canonical" href="https://www.ulinkit.com/seller-dashboard/seller-home" />
            </Helmet>

            {isAuthenticated && (
                <p className="heading">Hi {user.firstname}, Welcome to Ulinkit!</p>
            )}

            <div className="flex seller-home">
                <article className="flexcol shone">
                    <section className="sel-box" style={{ display: 'none' }}>
                        <div className="flexcol score2 wh">
                            <h1 className="heading3">Upload your products to start your journey</h1>
                            <h2 className="decrip2">Before we populate your dashboard with your sale analytics, please upload your products so you can start selling.</h2>
                            <div className="flex wh">
                                <div className="flex score wh">
                                    <div className='quick flex wh' style={{ height: '100px' }}>
                                        <div className="flex wh">
                                            <div className="flexcol wh">
                                                <h3 className="heading3 wh">Add single product</h3>
                                                <h4 className="descrip2 wh">Add one product at a time</h4>
                                            </div>
                                        </div>
                                        <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06Z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                                <div className="flex score wh">
                                    <div className='quick flex wh' style={{ height: '100px' }}>
                                        <div className="flex wh">
                                            <div className="flexcol wh">
                                                <h5 className="heading3 wh">Add multiple products</h5>
                                                <p className="descrip2 wh">Add multiple products at a time by using our excel template</p>
                                            </div>
                                        </div>
                                        <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06Z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="sel-box" style={{ display: allStepsCompleted ? 'none' : 'flex' }}>
                        <div className="flex wh">
                            <div className="step-verification" style={{ borderRight: '1px solid rgb(222, 222, 222)' }}>
                                <h1 className="heading2">Complete these steps to start selling</h1>
                                {steps.map((step, index) => (
                                    <div key={step.step} className={`step ${step.completed ? 'completed' : ''}`}>
                                        {step.completed ? <span className="checkmark">✔</span> : <span className="number">{step.step}</span>}
                                        <span className="descrip2">{step.label}</span>
                                    </div>
                                ))}
                            </div>
                            {currentStepIndex < steps.length ? (
                                filteredStepProcess.map((item) => (
                                    <div className="bank-detail" key={item.id}>
                                        <img style={{ width: '40px', height: '40px' }} src={item.icon} alt="step-icon" />
                                        <p className="heading3">{item.title}</p>
                                        <p className="heading2">{item.description}</p>
                                        <Link to={item.link} className="btn box flex" style={{ width: '200px', padding: '7px 10px' }} type="submit">
                                            <div className="heading2">{item.btn}</div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="bank-detail">
                                    <h2 className="heading3 wh" style={{ textAlign: 'center', color: 'green' }}>Congratulations! <br /> You are a verified seller now!</h2>
                                </div>
                            )}
                        </div>
                    </section>


                    <section className="flex wh" style={{ gap: '30px' }}>
                        <div className="sel-box">
                            <div className="flexcol score2 wh">
                                <h1 className="heading3">Top viewed products from other sellers</h1>
                                <div className="flexcol wh" style={{ gap: '10px' }}>
                                    {
                                        tvps.map((item) => (
                                            <div key={uuidv4()} className="flex tvstps wh">
                                                <img src={item.img} className='product-image' alt="product" />
                                                <p className="descrip wh">{item.title}</p>
                                                <a className='linkey2' href='#' >Add to your catalogue</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="sel-box">
                            <div className="flexcol score2 wh">
                                <h2 className="heading3">Top selling products from other sellers</h2>
                                <div className="flexcol wh" style={{ gap: '10px' }}>
                                    {
                                        tsps.map((item) => (
                                            <div key={uuidv4()} className="flex tvstps wh">
                                                <img src={item.img} className='product-image' alt="product" />
                                                <p className="descrip wh">{item.title}</p>
                                                <a className='linkey2' href='#' >Add to your catalogue</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </article>

                <div className="flexcol shtwo" tabIndex={0} ref={scrollRef}>

                    <div className="sel-box">
                        <div className="flex wh" style={{ padding: '15px', gap: '15px' }}>
                            <div className="flex" style={{ width: 'fit-content' }}>
                                <img src={profileImgSeller} className="profile" alt='profile' />
                            </div>
                            <div className="flexcol" style={{ alignItems: 'start', width: '100%' }}>
                                {isAuthenticated && (
                                    <div className="heading3 name">{user.firstname} {user.lastname}</div>
                                )}
                                {isVerifiedSeller ?
                                    (<div className="warning-btn2 flex"><VerifiedIcon style={{ width: '13px' }} />Verified Seller</div>) :
                                    (<div className="warning-btn3 flex"><NewReleasesIcon style={{ width: '13px' }} />Unverified Seller</div>)
                                }
                            </div>
                        </div>
                        <div className="flexcol score wh bt">
                            <div className="heading3 wh">Overall seller score</div>
                            <div className="descrip2 wh">Our minimum rating requirement for displaying an overall seller score has not been reached.</div>
                        </div>
                    </div>

                    <div className="sel-box">
                        <div className="flex wh" style={{ padding: '15px' }}>
                            <img src={logo} className='logo' alt="logo" />
                        </div>
                        <div className="flexcol score wh">
                            <p className="descrip2">
                                Collection of educational resources and training materials to empower Ulink sellers with the needed knowledge and skills.
                            </p>
                            <button className='btn box flex' type='submit'><div className="heading2">GO TO ACADEMY</div></button>
                        </div>
                    </div>

                    <article className="sel-box">
                        <div className="flexcol score wh">
                            <h1 className="heading3 wh">Finance center</h1>
                            <h2 className="descrip2 wh">Our minimum rating requirement for displaying an overall seller score has not been reached.</h2>
                            <Link to='/seller-dashboard/payments' className="linc wh">Update bank details&nbsp;&nbsp;</Link>
                        </div>
                    </article>

                    <article className="sel-box">
                        <div className="flexcol score wh">
                            <h1 className="heading3 wh">Quick links</h1>
                            {
                                quickLinks.map((item) => (
                                    <Link to={item.link} key={uuidv4()} className='quick flex wh'>
                                        <div className="flex">
                                            <p className="heading3">{item.title}</p>
                                        </div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06Z" fill="currentColor"></path></svg>
                                    </Link>
                                ))
                            }
                        </div>
                    </article>

                    <article className="sel-box">
                        <div className="flexcol score wh">
                            <h1 className="heading3 wh">Inquiries</h1>
                            <h2 className="descrip2 wh">Inquiries on your products and submitted quotations.</h2>
                            <div className="flexcol score2 wh" style={{ backgroundColor: '#f9f8f8' }}>
                                <p className="descrip2">
                                    You don't have any inquiries.
                                </p>
                                <div className="descrip2">
                                    <a href="">Upload products</a> or <a href="">submit quotations</a> to RFQs to receive negotiation inquiries.
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="sel-box">
                        <div className="flexcol score wh">
                            <h1 className="heading3 wh">Most searched keywords</h1>
                            {
                                keywords.map((item) => (
                                    <div key={uuidv4()} className='flex keywords wh'>
                                        <div className="num">{item.num}.</div>
                                        <a className="linkey" href='#'>{item.keyword}</a>
                                        <div className="flex progress wh">
                                            <div className="progress-bar-inner" id={`progressBar-${item.id}`} style={{ width: `${item.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default SellerHome