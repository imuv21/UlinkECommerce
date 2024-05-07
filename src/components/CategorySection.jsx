import React from 'react';
import { Link } from 'react-router-dom';
import Electronic from '../assets/Category/electronicgadgets2.png4.png';
import Kitchen from '../assets/Category/kitchenproducts2.png3.png1.png';
import Stationary from '../assets/Category/stationaryproduct1.png1.png';
import Fashion from '../assets/Category/fashionproducts1.png1.png';
import Buety from '../assets/Category/brautyproduct1.png';
import PersonalCare from '../assets/Category/personalcare1.png';
import Food from '../assets/Category/foodproduct1.png';
import Discount from '../assets/Category/trandingdiscount.png';

const CategorySection = () => {
    return (
        <div className='category-section'>
            <dic className='category-container'>
                <Link to='/category-pages/trending'>
                    <div className='category-image '>
                        <img className='img-aspect' src={Discount} alt='Trending Product'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Trending Product</p>
                        </div>
                    </div>
                </Link>
                <Link to="/category-pages/electronic">
                    <div className='category-image'>
                        <img className='img-aspect' src={Electronic} alt='Consumer Electronic'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Consumer Electronic</p>
                        </div>
                    </div>
                </Link>
                <Link to="/category-pages/stationary">
                    <div className='category-image'>
                        <img className='img-aspect' src={Stationary} alt='Office Stationary'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Office Stationary</p>
                        </div>
                    </div>
                </Link>
                <Link to='/category-pages/food'>
                    <div className='category-image'>
                        <img className='img-aspect' src={Food} alt='Food & Beverages'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Food & Beverages</p>
                        </div>
                    </div>
                </Link>
                <Link to='/category-pages/personalcare'>
                    <div className='category-image'>
                        <img className='img-aspect' src={PersonalCare} alt='Health & Beauty'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Personal Care</p>
                        </div>
                    </div>
                </Link>
                <Link to='/category-pages/kitchen'>
                    <div className='category-image'>
                        <img className='img-aspect' src={Kitchen} alt='Home & Kitchen'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Home & Kitchen</p>
                        </div>
                    </div>
                </Link>
                <Link to='/category-pages/buety'>
                    <div className='category-image'>
                        <img className='img-aspect' src={Buety} alt='Beauty & Fragrences'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Beauty & Fragrences</p>
                        </div>
                    </div>
                </Link>
                <Link to='/category-pages/fashion'>
                    <div className='category-image'>
                        <img className='img-aspect' src={Fashion} alt='Fashion & Acceseries'></img>
                        <div className='category-img-title'>
                            <p className='category-img-titles'>Fashion & Acceseries</p>
                        </div>
                    </div>
                </Link>
            </dic>
        </div>
    )
};

export default CategorySection