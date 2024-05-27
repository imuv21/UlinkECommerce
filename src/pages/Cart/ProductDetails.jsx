import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FlightIcon from '@mui/icons-material/Flight';
import returned from '../../assets/returned.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import proDetail from '../../assets/proDetail.png';
import boxx from '../../assets/boxx.png';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../Redux/productDetailSlice';
import { addToCart } from '../../Redux/cartSlice';
import { Helmet } from 'react-helmet-async';
import InfoIcon from '@mui/icons-material/Info';
import Loader from '../../components/Loader/Loader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import visa from '../../assets/visa.png';
import mastercard from '../../assets/mastercard.png';
import paypal from '../../assets/paypal.png';
import upi from '../../assets/upi.png';
import netbanking from '../../assets/netbanking.png';

const ProductDetails = () => {

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, status, error } = useSelector((state) => state.productDetail);
    useEffect(() => {
        dispatch(fetchProductDetail(id));
    }, [dispatch, id]);

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


    //accordion-panel
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleProductAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    //img-change-slider moq discount
    const [selectedImage, setSelectedImage] = useState(null);
    const [salep, setSalep] = useState();
    const [unitp, setUnitp] = useState();
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [totalPrice, setTotalPrice] = useState(salep);
    useEffect(() => {
        if (product && product.image && product.image.length > 0) {
            setSelectedImage(product.image[0].imageUrl);
        }
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
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    //bullet-points
    const renderBulletPoints = (bulletPoints) => {
        const bulletPointArray = bulletPoints.split('/').filter(point => point.trim() !== '');
        return (
            <ul className='bullet-points'>
                {bulletPointArray.map((point, index) => (
                    <li className='descrip2 caplist' key={index}>{point.trim()}.</li>
                ))}
            </ul>
        );
    };


    const cartHandler = () => {
        if (!product) return;
        console.log('Product ID:', id); 
        console.log('Quantity:', value);
        dispatch(addToCart({ productId: id, quantity: value }));
        alert(`${value} items added to cart successfully!`);
    };


    if (status === 'loading') {
        return <Loader />;
    }
    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }
    if (!product) {
        return null;
    }


    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Product Details</title>
            </Helmet>

            <Fragment>
                <div className="flex wh">
                    <div className="heading2 wh captext">{`${product.selectedSupOption} > ${product.selectedSubOption} > ${product.selectedMiniSubOption} > ${product.selectedMicroSubOption}`}</div>
                </div>

                <div className="pdcont">
                    <div className="pdcol pdcol_one">
                        <div className="big-image-box">
                            <div className="big-image">
                                <img src={selectedImage} alt="Big Image" />
                            </div>
                            <div className="flex" style={{ width: '100%', padding: '10px', justifyContent: 'space-evenly', border: 'var(--border)' }}>
                                {product.image && product.image.length > 0 && (
                                    <div className="small-image" onClick={() => handleImageClick(product.image[0].imageUrl)}>
                                        <img src={product.image[0].imageUrl} alt={product.productName} />
                                    </div>
                                )}
                                {product.image && product.image.length > 1 && (
                                    <div className="small-image" onClick={() => handleImageClick(product.image[1].imageUrl)}>
                                        <img src={product.image[1].imageUrl} alt={product.productName} />
                                    </div>
                                )}
                                {product.image && product.image.length > 2 && (
                                    <div className="small-image" onClick={() => handleImageClick(product.image[2].imageUrl)}>
                                        <img src={product.image[2].imageUrl} alt={product.productName} />
                                    </div>
                                )}
                                {product.image && product.image.length > 3 && (
                                    <div className="small-image" onClick={() => handleImageClick(product.image[3].imageUrl)}>
                                        <img src={product.image[3].imageUrl} alt={product.productName} />
                                    </div>
                                )}
                                {product.image && product.image.length > 4 && (
                                    <div className="small-image" onClick={() => handleImageClick(product.image[4].imageUrl)}>
                                        <img src={product.image[4].imageUrl} alt={product.productName} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="pdcol pdcol_two">
                        <div className="heading2 wh captext">Brand : {product.brandName}</div>
                        <div className="heading wh captext">{product.productName}</div>
                        <div className="sel-box" style={{ gap: '20px' }}>
                            <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                                <div className="flex" style={{ gap: '15px' }}>
                                    <span className='descrip2' style={{ textDecoration: 'line-through' }}>{product.currencySymbol}{product.unitPrice}</span>
                                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>{discountPercentage}% OFF</span>
                                </div>
                                <div className="flex" style={{ gap: '15px' }}>
                                    <span>{product.currencyname}</span><span style={{ fontWeight: 'bold', fontSize: '22px' }}>{product.currencySymbol}{product.sellPrice}</span>
                                </div>
                                <div className="flex">
                                    <span className='descrip'>per piece</span>
                                </div>
                            </div>
                        </div>

                        <div className="weaccept">
                            <div className="heading2">We accept</div>
                            <img src={mastercard} alt="mastercard" />
                            <img src={visa} alt="visa" />
                            <img src={paypal} alt="paypal" />
                            <img src={upi} alt="upi" />
                            <img src={netbanking} alt="netbanking" />
                        </div>

                        <div className="heading3 wh">About this item</div>
                        {product.bulletPoints && renderBulletPoints(product.bulletPoints)}

                        <div className="flexcol wh">
                            <div className={`accordion-pd ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleProductAccordion(1)}>
                                <div className="heading3 flex"><img src={proDetail} className='img-big' alt="" />&nbsp;&nbsp;Product details</div>
                            </div>
                            <div className="panel-pd" style={{ maxHeight: activeIndex === 1 ? '300px' : '0' }}>
                                <div className="flexcol wh" style={{ padding: '10px', alignItems: 'start' }}>
                                    <div className="descrip2 captext" >Brand: {product.brandName}</div>
                                    <div className="descrip2 captext" >Country of origin: {product.origin}</div>
                                    <div className="descrip2 captext">Storage temperature:{product.temperature}</div>
                                    <div className="descrip2 captext">Unit size: {product.size}</div>
                                    <div className="descrip2 captext">Number of packs in one carton: {product.unitsPerCarton}</div>
                                    <div className="descrip2 captext">Min. Order Quantity: {product.minOrderQuant}</div>
                                </div>
                            </div>

                            <div className={`accordion-pd ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleProductAccordion(2)}>
                                <div className="heading3 flex"><img src={boxx} className='img-big' alt="" />&nbsp;&nbsp;Stock dimensions</div>
                            </div>
                            <div className="panel-pd" style={{ maxHeight: activeIndex === 2 ? '300px' : '0' }}>
                                <div className="flexcol wh" style={{ padding: '10px', alignItems: 'start' }}>
                                    <div className="descrip2 captext" >Carton dimensions (LWH): {product.cartonLgh} {product.cartonLghUnit} x {product.cartonWdh} {product.cartonWdhUnit} x {product.cartonHgt} {product.cartonHgtUnit}</div>
                                    <div className="descrip2 captext" >Carton weight: {product.cartonWgt} {product.cartonWgtUnit} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pdcol pdcol_three">
                        <div className="sel-box pdthree_one" style={{ gap: '20px' }}>
                            <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                                <div className="heading3">Order quantity</div>
                                <div className="plus-minus">
                                    <div style={{ cursor: 'pointer' }}><RemoveCircleOutlineIcon onClick={decrementValue} /></div>
                                    <input className='pminput' type="number" value={value} onChange={handleInputChange} />
                                    <div style={{ cursor: 'pointer' }}><AddCircleOutlineIcon onClick={incrementValue} /></div>
                                </div>
                                <div className="descrip2">Minimum order quantity : {product.minOrderQuant}</div>
                            </div>

                            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
                                <div className="heading2"><span>Total Price</span></div>
                                <div className="heading2"><span>{totalPrice} {product.currencyname}</span></div>
                            </div>

                            <div className="flexcol wh" style={{ gap: '10px' }}>
                                {isAuthenticated && user.role === 'Seller' && (<div className="descrip2 flex" style={{ gap: '10px' }}><InfoIcon style={{ color: 'gray' }} />To purchase products, please log in using your Buyer account.</div>)}
                                {isAuthenticated && user.role === 'Buyer' && (
                                    <Fragment>
                                        <button className='btn2 addtocart flex' onClick={cartHandler}><AddShoppingCartIcon style={{ width: '15px' }} /><div className="heading2">Add to cart</div></button>
                                        <button className='btn addtocart flex'><div className="heading2">Negotiate with seller</div></button>
                                    </Fragment>
                                )}
                                {!isAuthenticated && (
                                    <div className="descrip2 flex" style={{ gap: '10px' }}><InfoIcon style={{ color: 'gray' }} />To purchase products, please login/signup using your Buyer account.</div>
                                )}
                            </div>
                        </div>
                        <div className="sel-box pdthree_two" style={{ gap: '20px' }}>
                            <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                                <div className="heading3">Shipping & Returns</div>
                                <div className="descrip warning-btn3 flex"><FlightIcon style={{ width: '15px' }} />International shipping</div>
                            </div>
                            <div className="flexcol wh" style={{ gap: '0px' }}>
                                <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
                                    <div className="heading2"><span>Available options</span></div>
                                    <div className="heading2"><span>Ex Works</span></div>
                                </div>
                                <div className="flexcol wh bbottom" style={{ alignItems: 'start', padding: '10px 0px' }}>
                                    <div className="heading2 flex" style={{ gap: '5px' }}><img src={returned} className='img' /><span>Returns</span></div>
                                    <div className="descrip2"><a className='hoverr'>Read seller's return policy</a></div>
                                </div>

                                <div className="flexcol wh" style={{ alignItems: 'start', paddingTop: '10px' }}>
                                    <div className="descrip2">Final price, delivery dates and additional shipping options will be shown at checkout.</div>
                                </div>
                            </div>
                        </div>
                        <div className="sel-box pdthree_three" style={{ gap: '20px' }}>
                            <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                                <div className="heading3">Seller information</div>
                                <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                                    <div className="descrip2">{product.seller.name}</div>
                                    {product.seller.isVerified ? (<div className="descrip warning-btn2 flex" style={{ color: 'green' }}><VerifiedIcon style={{ width: '15px' }} />Verified</div>)
                                        : (<div className="descrip warning-btn2 flex" style={{ color: 'orange' }}><NewReleasesIcon style={{ width: '15px' }} />Unverified</div>)}
                                </div>
                                <div className="descrip2">{product.seller.companyName}, {product.seller.countryOfoperation}</div>
                                <div className="flex-start wh">
                                    <a className='hoverr wh'>More from this seller</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flexcol wh">
                    <div className="heading wh">Overview</div>
                </div>

                <div className="overview">
                    <div className="overview_one">
                        <div className="over-heading">
                            {product.sku && <div>Seller SKU ID</div>}
                            {product.specifications && <div>Specifications</div>}
                            {product.avgBatteryLife && <div>Average battery life</div>}
                            {product.connectivityType && <div>Connectivity type</div>}
                            {product.opSystem && <div>Operating system</div>}
                            {product.portType && <div>Port type</div>}
                            {product.dgrGoods && <div>Dangerous goods</div>}
                            {product.availability && <div>Availability</div>}
                            {product.PrivateLabel && <div>Private Label</div>}
                        </div>
                        <div className="over-field">
                            {product.sku && <div className='captext'>{product.sku}</div>}
                            {product.specifications && <div className='captext'>{product.specifications}</div>}
                            {product.avgBatteryLife && <div className='captext'>{product.avgBatteryLife}</div>}
                            {product.connectivityType && <div className='captext'>{product.connectivityType}</div>}
                            {product.opSystem && <div className='captext'>{product.opSystem}</div>}
                            {product.portType && <div className='captext'>{product.portType}</div>}
                            {product.dgrGoods && <div className='captext'>{product.dgrGoods}</div>}
                            {product.availability && <div className='captext'>{product.availability}</div>}
                            {product.PrivateLabel && <div className='captext'>{product.PrivateLabel}</div>}
                        </div>
                    </div>
                    <div className="overview_one">
                        <div className="over-heading">
                            {product.colors && <div>Color</div>}
                            {product.productLgh && <div>Item length</div>}
                            {product.productWdh && <div>Item width</div>}
                            {product.productHgt && <div>Item height</div>}
                            {product.productWgt && <div>Item weight</div>}
                        </div>
                        <div className="over-field">
                            {product.colors && <div className='captext'>{product.colors}</div>}
                            {product.productLgh && product.dimensionUnit && <div className='captext'>{product.productLgh} {product.dimensionUnit}</div>}
                            {product.productWdh && product.dimensionUnit && <div className='captext'>{product.productWdh} {product.dimensionUnit}</div>}
                            {product.productHgt && product.dimensionUnit && <div className='captext'>{product.productHgt} {product.dimensionUnit}</div>}
                            {product.productWgt && product.productWgtUnit && <div className='captext'>{product.productWgt} {product.productWgtUnit}</div>}
                        </div>
                    </div>
                </div>

                <div className="flexcol wh">
                    <div className="heading wh">Product description</div>
                </div>

                <div className="descrip2 flexstart captext wh">
                    {product.addInfo}
                </div>
            </Fragment>
        </div>
    )
}

export default ProductDetails
