import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';
import ProductCard from '../ProductCard';


const Translator = () => {

    const responsive = {
        largeDesktop: {
            breakpoint: { max: 1800, min: 1200 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 1200, min: 1000 },
            items: 5
        },
        bigTablet: {
            breakpoint: { max: 1000, min: 800 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 800, min: 600 },
            items: 3
        },
        bigMobile: {
            breakpoint: { max: 600, min: 400 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 400, min: 0 },
            items: 1
        }
    };

    const [slides, setSlides] = useState([]);

    return (
        <div className='home mt'>
            <Carousel responsive={responsive}>
                {slides.map((item) => (
                    <div key={uuidv4()}>
                            <ProductCard name={item.title} id={uuidv4()} img={item.image} price={item.price} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Translator