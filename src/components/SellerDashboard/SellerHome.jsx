import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';
import img1 from '../../assets/img1.webp';
import img2 from '../../assets/img2.webp';
import img3 from '../../assets/img3.webp';
import img4 from '../../assets/img4.webp';
import img5 from '../../assets/img5.webp';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';


const SellerHome = () => {

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const quickLinks = [
        {
            id: 1,
            title: 'Add Product',
            image: ''
        },
        {
            id: 2,
            title: 'Add Multiple Products',
            image: ''
        },
        {
            id: 3,
            title: 'Edit Product',
            image: ''
        },
        {
            id: 4,
            title: 'Create Promotion',
            image: ''
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

    const updateProgressBar = (id, value) => {
        const progressBar = document.getElementById(`progressBar-${id}`);
        progressBar.style.width = value + "%";
    };

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


    //getting data from local storage (backend)
    const [loggedUser, setLoggedUser] = useState(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem('loggedUser');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setLoggedUser(parsedUserData);
        }
    }, []);


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Seller Dashboard</title>
            </Helmet>

            {isAuthenticated && (
                <div className="heading">Hi {user.name}, Welcome to Ulinkit!</div>
            )}

            <div className="flex seller-home">
                <div className="flexcol shone">
                    <div className="sel-box">
                        <div className="flexcol score2 wh">
                            <div className="heading3">Upload your products to start your journey</div>
                            <div className="decrip2">Before we populate your dashboard with your sale analytics, please upload your products so you can start selling.</div>
                            <div className="flex wh">
                                <div className="flex score wh">
                                    <div className='quick flex wh' style={{ height: '100px' }}>
                                        <div className="flex wh">
                                            <div className="flexcol wh">
                                                <div className="heading3 wh">Add single product</div>
                                                <div className="descrip2 wh">Add one product at a time</div>
                                            </div>
                                        </div>
                                        <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06Z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                                <div className="flex score wh">
                                    <div className='quick flex wh' style={{ height: '100px' }}>
                                        <div className="flex wh">
                                            <div className="flexcol wh">
                                                <div className="heading3 wh">Add multiple products</div>
                                                <div className="descrip2 wh">Add multiple products at a time by using our excel template</div>
                                            </div>
                                        </div>
                                        <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06Z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex wh" style={{ gap: '30px' }}>

                        <div className="sel-box">
                            <div className="flexcol score2 wh">
                                <div className="heading3">Top viewed products from other sellers</div>
                                <div className="flexcol wh" style={{ gap: '10px' }}>
                                    {
                                        tvps.map((item) => (
                                            <div key={uuidv4()} className="flex tvstps wh">
                                                <img src={item.img} className='product-image' alt="product" />
                                                <div className="descrip wh">{item.title}</div>
                                                <a className='linkey2' href='#' >Add to your catalogue</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="sel-box">
                            <div className="flexcol score2 wh">
                                <div className="heading3">Top selling products from other sellers</div>
                                <div className="flexcol wh" style={{ gap: '10px' }}>
                                    {
                                        tsps.map((item) => (
                                            <div key={uuidv4()} className="flex tvstps wh">
                                                <img src={item.img} className='product-image' alt="product" />
                                                <div className="descrip wh">{item.title}</div>
                                                <a className='linkey2' href='#' >Add to your catalogue</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flexcol shtwo" tabIndex={0} ref={scrollRef}>

                    <div className="sel-box">
                        <div className="flex wh" style={{ padding: '15px', gap: '15px' }}>
                            <div className="flex" style={{ width: 'fit-content' }}>
                                <div className="flex profile">UV</div>
                            </div>
                            <div className="flexcol" style={{ alignItems: 'start', width: '100%' }}>
                                {isAuthenticated && (
                                    <div className="heading3 name">{user.name}</div>
                                )}
                                <div className="descrip warning-btn">Pending Verification</div>
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
                            <div className="descrip2">
                                Collection of educational resources and training materials to empower Ulink sellers with the needed knowledge and skills.
                            </div>
                            <button className='btn box flex' type='submit'><div className="heading2">GO TO ACADEMY</div></button>
                        </div>
                    </div>

                    <div className="sel-box">
                        <div className="flexcol score wh">
                            <div className="heading3 wh">Finance center</div>
                            <div className="descrip2 wh">Our minimum rating requirement for displaying an overall seller score has not been reached.</div>
                            <a className="linc wh" href='#'>Update bank details&nbsp;&nbsp;</a>
                        </div>
                    </div>

                    <div className="sel-box">
                        <div className="flexcol score wh">
                            <div className="heading3 wh">Quick links</div>
                            {
                                quickLinks.map((item) => (
                                    <div key={uuidv4()} className='quick flex wh'>
                                        <div className="flex">
                                            <div className="heading3">{item.title}</div>
                                        </div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.53 11.47a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06Z" fill="currentColor"></path></svg>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="sel-box">
                        <div className="flexcol score wh">
                            <div className="heading3 wh">Inquiries</div>
                            <div className="descrip2 wh">Inquiries on your products and submitted quotations.</div>
                            <div className="flexcol score2 wh" style={{ backgroundColor: '#f9f8f8' }}>
                                <div className="descrip2">
                                    You don't have any inquiries.
                                </div>
                                <div className="descrip2">
                                    <a href="">Upload products</a> or <a href="">submit quotations</a> to RFQs to receive negotiation inquiries.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sel-box">
                        <div className="flexcol score wh">
                            <div className="heading3 wh">Most searched keywords</div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerHome