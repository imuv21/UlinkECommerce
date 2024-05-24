import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Electronic from '../assets/electronicgadgets2.png4.png';
import Kitchen from '../assets/kitchenproducts2.png3.png1.png';
import Stationary from '../assets/stationaryproduct1.png1.png';
import Fashion from '../assets/fashionproducts1.png1.png';
import Buety from '../assets/brautyproduct1.png';
import PersonalCare from '../assets/personalcare1.png';
import Food from '../assets/foodproduct1.png';
import Discount from '../assets/trandingdiscount.png';
import { Link } from 'react-router-dom';
import Refurbish from '../assets/Refurbished.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div style={{ ...style, position: 'absolute', top: '40%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999', right: '0%' }} onClick={onClick}>
      <ChevronRightIcon />
    </div>
  );
};
const PrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div style={{ ...style, position: 'absolute', top: '40%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999' }} onClick={onClick}>
      <ChevronLeftIcon />
    </div>
  );
};
const CategorySection = () => {
  const categories = [
    { name: 'Trending Product', image: Discount, link: '/category-pages/trending' },
    { name: 'Consumer Electronic', image: Electronic, link: '/category-pages/electronic' },
    { name: 'Office Stationary', image: Stationary, link: '/category-pages/stationary' },
    { name: 'Food & Beverages', image: Food, link: '/category-pages/food' },
    { name: 'Personal Care', image: PersonalCare, link: '/category-pages/personalcare' },
    { name: 'Home & Kitchen', image: Kitchen, link: '/category-pages/kitchen' },
    { name: 'Beauty & Fragrences', image: Buety, link: '/category-pages/buety' },
    { name: 'Fashion & Acceseries', image: Fashion, link: '/category-pages/fashion' },
    { name: 'Refurbished', image: Refurbish, link: '/category-pages/refurbish' },
  ];
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
          breakpoint: 1300,
          settings: {
              slidesToShow: 6,
              slidesToScroll: 2,
          },
      },
      {
          breakpoint: 1150,
          settings: {
              slidesToShow: 5,
              slidesToScroll: 2,
          },
      },
      {
          breakpoint: 1000,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
          },
      },
      {
          breakpoint: 800,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
          },
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
          },
      },
      {
          breakpoint: 380,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
          },
      },
  ],
  };

  return (
    <div className='category-section'>
      <Slider {...settings}>
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className='category-image'>
            <div className="category-image-sub">
              <img className='img-aspect' src={category.image} alt={category.name}></img>
              <div className='cate-title'>
                <p className='category-img-title'>{category.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySection;
