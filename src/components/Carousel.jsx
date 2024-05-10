import React, { useState, useEffect, lazy, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loader from './Loader/Loader';
const ProductCard = lazy(() => import('../components/ProductCard'));
import Sliders from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Carousel = () => {
   
    const [slides, setSlides] = useState([]);

     //form data handling
     useEffect(() => {
         const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
         setSlides(savedSingleFormData.map(item => ({ ...item, images: item.images || [] })));
     }, []);

     const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer',  filter: 'drop-shadow(5px 5px 5px gray)',  width: '40px', height: '40px', zIndex: '999', right: '0%' }} onClick={onClick}>
                <ChevronRightIcon />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px',  zIndex: '999' }} onClick={onClick}>
                <ChevronLeftIcon />
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 7,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
     
        <div className="product-slider-cont">
            <Sliders {...settings}>
                {slides.map((item, index) => (
                    <div className='show-img-detail-sup' key={uuidv4()}>
                        <Suspense fallback={<Loader />}>
                            <ProductCard name={item.productName} id={index} img={item.images[0].url} unitPrice={item.unitPrice} salePrice={item.salePrice} />
                        </Suspense>
                    </div>
                ))}
            </Sliders>
        </div>
    );
};

export default Carousel;
