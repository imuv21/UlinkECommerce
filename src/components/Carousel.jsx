import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import { v4 as uuidv4 } from 'uuid';
import Loader from './Loader/Loader';
const ProductCard = lazy(() => import('../components/ProductCard'));
import Sliders from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import defaulImg from '../assets/default.jpg';

const Carousel = () => {

    const dispatch = useDispatch();
    const {  products = [], status, error } = useSelector((state) => state.products);

    //pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);
    useEffect(() => {
        dispatch(fetchProducts({ page, size }));
    }, [dispatch, page, size]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }



     const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer',  filter: 'drop-shadow(5px 5px 5px gray)',  width: '40px', height: '40px', zIndex: '1', right: '0%' }} onClick={onClick}>
                <ChevronRightIcon />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px',  zIndex: '1' }} onClick={onClick}>
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
                breakpoint: 420,
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
            {Array.isArray(products) && products.map((product) => (
                    <div className='show-img-detail-sup' key={uuidv4()}>
                        <Suspense fallback={<Loader />}>                                                   
                            <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg } unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                        </Suspense>
                    </div>
                ))}
            </Sliders>
        </div>
    );
};

export default Carousel;
