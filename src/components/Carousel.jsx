import React, { useState, useEffect, lazy, Suspense, useNavigate } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loader from './Loader/Loader';
const ProductCard = lazy(() => import('../components/ProductCard'));


const Carousel = () => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [currentMargin, setCurrentMargin] = useState(0);
    const [slidesPerPage, setSlidesPerPage] = useState(0);
    const [slidesCount, setSlidesCount] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [slides, setSlides] = useState([]);

    // const fetchImages = () => {
    //     fetch(`https://fakestoreapi.com/products`).then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.status}`);
    //         }
    //         return response.json();
    //     }).then((data) => {
    //         setSlides(data);
    //     }).catch((error) => {
    //         console.error(`Error: ${error.message}`);
    //     });
    // }

    // useEffect(() => {
    //     fetchImages();
    // }, [])


     //form data handling
    
     useEffect(() => {
         const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
         setSlides(savedSingleFormData.map(item => ({ ...item, images: item.images || [] })));
     }, []);




    useEffect(() => {
        const checkWidth = () => {
            setContainerWidth(document.getElementById("slider-container").offsetWidth);
        };

        window.addEventListener("resize", checkWidth);
        checkWidth();

        return () => {
            window.removeEventListener("resize", checkWidth);
        };
    }, []);

    useEffect(() => {
        setParams(containerWidth);
    }, [containerWidth]);

    const setParams = (w) => {
        let slidesPerPageVal = 0;

        if (w < 551) {
            slidesPerPageVal = 1;
        } else if (w < 901) {
            slidesPerPageVal = 2;
        } else if (w < 1101) {
            slidesPerPageVal = 3;
        } else {
            slidesPerPageVal = 4;
        }

        setSlidesPerPage(slidesPerPageVal);
        setSlidesCount(slides.length - slidesPerPageVal);

        let newCurrentMargin = -currentPosition * (100 / slidesPerPageVal);
        setCurrentMargin(newCurrentMargin);

        const buttons = document.getElementsByClassName("btnnn");
        if (currentPosition > 0) {
            buttons[0].classList.remove("inactive");
        }
        if (currentPosition < slidesCount) {
            buttons[1].classList.remove("inactive");
        }
        if (currentPosition >= slidesCount) {
            buttons[1].classList.add("inactive");
        }
    };

    const slideRight = () => {
        if (currentPosition !== 0) {
            let newCurrentMargin = currentMargin + 100 / slidesPerPage;
            setCurrentMargin(newCurrentMargin);
            setCurrentPosition(currentPosition - 1);
        }
        const buttons = document.getElementsByClassName("btnnn");
        if (currentPosition === 0) {
            buttons[0].classList.add("inactive");
        }
        if (currentPosition < slidesCount) {
            buttons[1].classList.remove("inactive");
        }
    };

    const slideLeft = () => {
        if (currentPosition !== slidesCount) {
            let newCurrentMargin = currentMargin - 100 / slidesPerPage;
            setCurrentMargin(newCurrentMargin);
            setCurrentPosition(currentPosition + 1);
        }
        const buttons = document.getElementsByClassName("btnnn");
        if (currentPosition === slidesCount) {
            buttons[1].classList.add("inactive");
        }
        if (currentPosition > 0) {
            buttons[0].classList.remove("inactive");
        }
    };


    return (
     
        <div id="slider-container">
            <span onClick={slideRight} className="btnnn"></span>
            <div id="slider" style={{ marginLeft: `${currentMargin}%` }}>
                {slides.map((item, index) => (
                    <div key={uuidv4()} className="slide">
                        <Suspense fallback={<Loader />}>
                            <ProductCard name={item.productName} id={index} img={item.images[0].url} unitPrice={item.unitPrice} salePrice={item.salePrice} />
                        </Suspense>
                    </div>
                ))}
            </div>
            <span onClick={slideLeft} className="btnnn"></span>
        </div>
    );
};

export default Carousel;
