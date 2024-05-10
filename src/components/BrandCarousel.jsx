import React, { useState, useEffect, lazy, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loader from './Loader/Loader';
import Sliders from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// brand logo image here
import Apple from '../assets/BrandName/apple2.png';
import HP from '../assets/BrandName/hplogo.png';
import LG from '../assets/BrandName/lglogo.png';
import MI from '../assets/BrandName/milogo2.png';
import Motorola from '../assets/BrandName/motorolalogo.png';
import Sumsung from '../assets/BrandName/samsunglogo.png';
import Tamron from '../assets/BrandName/tamronlogo.png';
import Voltas from '../assets/BrandName/voltaslogo.png';

const BrandCarousel = () => {

    const [slides, setSlides] = useState([]);

    //form data handling
    useEffect(() => {
        const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
        setSlides(savedSingleFormData.map(item => ({ ...item, images: item.images || [] })));
    }, []);

    const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999', right: '0%' }} onClick={onClick}>
                <ChevronRightIcon />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999' }} onClick={onClick}>
                <ChevronLeftIcon />
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 6,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
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

    const brands = [
        { id: 1, image: Apple },
        { id: 2, image: HP },
        { id: 3, image: LG },
        { id: 4, image: MI },
        { id: 5, image: Motorola },
        { id: 6, image: Sumsung },
        { id: 7, image: Tamron },
        { id: 8, image: Voltas }
    ]


    return (

        <div className="product-slider-cont">
            <Sliders {...settings}>
                {brands.map((brand, index) => (
                    <div className='show-img-detail-sup' key={uuidv4()}>
                        <div className="show-img-detail-sub">
                            <img className="product-img-size" src={brand.image} alt={`brand ${index}`} />
                        </div>
                    </div>
                ))}
            </Sliders>
        </div>
    );
};

export default BrandCarousel;
