import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Sliders from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fetchProductsTwo } from '../Redux/productSlice';
import { fetchProductDetail } from '../Redux/productDetailSlice';
import { addToCart } from '../Redux/cartSlice';
import { fetchExchangeRates } from '../Redux/currencySlice';
import currencySymbols from '../components/Schemas/currencySymbols';
import defaulImg from '../assets/default.jpg';
import Loader from './Loader/Loader';
const ProductCard = lazy(() => import('./ProductCard'));

const CarouselTwo = () => {

    const dispatch = useDispatch();
    const { productsTwo = [], statusTwo, errorTwo } = useSelector((state) => state.products);
    const { product } = useSelector((state) => state.productDetail);

    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const exchangeRates = useSelector(state => state.currency.exchangeRates);

    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);


    // Fetch currency options and exchange rates
    const convertPrice = (price, fromCurrency) => {
        const rate = exchangeRates[selectedCurrency];
        if (!rate) return price;
        const priceInUSD = price / exchangeRates[fromCurrency];
        return (priceInUSD * rate).toFixed(2);
    };

    //plus-minus
    const [moq, setMoq] = useState(1);
    const [value, setValue] = useState(moq.toString());
    const incrementValue = () => {
        setValue(prevValue => (parseInt(prevValue) + 1).toString());
    };
    const decrementValue = () => {
        setValue(prevValue => Math.max(parseInt(prevValue) - 1, moq).toString());
    };
    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value);
        setValue(newValue >= moq ? newValue.toString() : moq.toString());
    };

    const cartHandler = (id) => {
        if (!product) return;
        dispatch(addToCart({ productId: id, quantity: value }));
        alert(`${value} items added to cart successfully!`);
        setIsClickedCart(false);
    };



    //pagination
    const [category, setCategory] = useState('FoodAndBeverages');

    useEffect(() => {
        if (statusTwo === 'idle') {
            dispatch(fetchProductsTwo({ category }));
        }
    }, [dispatch, category, statusTwo]);


    //cart popup
    const [isClickedCart, setIsClickedCart] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const handleClickCart = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedProductId(id);
        setIsClickedCart(true);
    };

    useEffect(() => {
        if (selectedProductId) {
            dispatch(fetchProductDetail(selectedProductId));
        }
    }, [dispatch, selectedProductId]);


    const [salep, setSalep] = useState();
    const [unitp, setUnitp] = useState();
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [totalPrice, setTotalPrice] = useState(salep);

    useEffect(() => {
        if (product && product.minOrderQuant) {
            setMoq(product.minOrderQuant);
            setValue(product.minOrderQuant.toString());
        }
        if (product && product.sellPrice && product.unitPrice) {
            setSalep(product.sellPrice);
            setUnitp(product.unitPrice);
        }
    }, [product]);
    useEffect(() => {
        if (salep && unitp) {
            const discount = ((unitp - salep) / unitp) * 100;
            setDiscountPercentage(discount.toFixed(2));
        }
        if (value && salep) {
            const Tprice = parseFloat(salep) * parseInt(value);
            setTotalPrice((Tprice.toFixed(2)));
        }
    }, [salep, unitp, value]);

    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedCart(false);
    }
    useEffect(() => {
        const handleScroll = () => {
            if (isClickedCart) {
                setIsClickedCart(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isClickedCart]);


    if (statusTwo === 'loading') {
        return <div>Loading...</div>;
    }
    if (statusTwo === 'failed') {
        return <div>Error: {errorTwo}</div>;
    }

    const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1', right: '0%' }} onClick={onClick}>
                <ChevronRightIcon />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1' }} onClick={onClick}>
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
        <div className={`product-slider-cont ${isClickedCart ? 'clicked' : ''}`}>
            <Sliders {...settings}>
                {Array.isArray(productsTwo) && productsTwo.map((pro) => (
                    <div className='show-img-detail-sup' key={uuidv4()}>
                        <Suspense fallback={<Loader />}>
                            <ProductCard handleClickCart={handleClickCart} name={pro.productName} moq={pro.minOrderQuant} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} unitPrice={pro.unitPrice} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
                        </Suspense>
                    </div>
                ))}
            </Sliders>
            {(isClickedCart && product) && (
                <div className="add-to-cart-popup add-to-cart">
                    <div className="add-to-cart-wrapper-footer">
                        <div className="heading3 captext">{product.productName.length > 30 ? `${product.productName.substring(0, 30)}...` : product.productName}</div>
                        <div className="flex" style={{ gap: '15px' }}>
                            <span className='descrip' style={{ textDecoration: 'line-through' }}>{currencySymbols[selectedCurrency]} {convertPrice(product.unitPrice, product.currencyname)} {selectedCurrency}</span>
                            <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>{discountPercentage}% OFF</span>
                        </div>
                        <div className="flex" style={{ gap: '15px' }}>
                            <span className='descrip2'>{currencySymbols[selectedCurrency]} {convertPrice(product.sellPrice, product.currencyname)} {selectedCurrency}</span> <span className='descrip'>per piece</span>
                        </div>
                        <div className="line-out"></div>
                        <div className="descrip2">Minimum Order Quantity: {product.minOrderQuant}</div>
                        <div className="heading2">Total Price: {currencySymbols[selectedCurrency]} {convertPrice(totalPrice, product.currencyname)} {selectedCurrency}</div>
                        <div className="plus-minus">
                            <div style={{ cursor: 'pointer' }}><RemoveCircleOutlineIcon onClick={decrementValue}  /></div>
                            <input className='pminput' type="number" value={value} onChange={handleInputChange} />
                            <div style={{ cursor: 'pointer' }}><AddCircleOutlineIcon onClick={incrementValue} /></div>
                        </div>
                        <button className='btn2 addtocart flex' onClick={() => cartHandler(product.productId)} ><AddShoppingCartIcon style={{ width: '15px' }} /><div className="heading2 captext">ADD TO CART</div></button>
                        <button type="button" onClick={closepopup} className="go-home-cart"> CLOSE </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarouselTwo;
