import React, { useState, useEffect, Fragment } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FlightIcon from '@mui/icons-material/Flight';
import ReturnIcon from '../../assets/return.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import ProDetail from '../../assets/proDetail.png';
import Box from '../../assets/boxx.png';
import './cart.css';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

    const { index } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
        const selectedProduct = savedSingleFormData[parseInt(index)];
        if (selectedProduct) {
            setProduct({
                ...selectedProduct,
                images: selectedProduct.images || [] 
            });
        }
    }, [index]);


    const [cart, setCart] = useState([]);
    const [cartText, setCartText] = useState(0); 
    const addToCart = () => {
        if (!product) return;
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        const existingCart = Array.isArray(savedCart) ? savedCart : [];
        const existingProductIndex = existingCart.findIndex(item => item.product.sku === product.sku);
        const newCart = [...existingCart];
        if (existingProductIndex !== -1) {
            newCart[existingProductIndex].quantity += parseInt(value);
        } else { 
            newCart.push({
                product: product,
                quantity: parseInt(value)
            });
        }
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartText(newCart.length);
    };
    
   

    //accordion-panel
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleProductAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

     //plus-minus
     const [moq, setMoq] = useState(1);
     const [value, setValue] = useState(moq.toString());
     const incrementValue = () => {
         setValue(prevValue =>  (parseInt(prevValue) + 1).toString());
     };
     const decrementValue = () => {
         setValue(prevValue => Math.max(parseInt(prevValue) - 1, moq).toString()); 
     };
 
     const handleInputChange = (e) => {
         const newValue = parseInt(e.target.value);
         setValue(newValue >= moq ? newValue.toString() : moq.toString());
     };


    //img-change-slider
    const [selectedImage, setSelectedImage] = useState(null);
    const [salep, setSalep] = useState();
    const [unitp, setUnitp] = useState();
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [totalPrice, setTotalPrice] = useState(salep);
    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setSelectedImage(product.images[0].url);
        }
        if (product && product.minOrderQuant) {
            setMoq(product.minOrderQuant);
            setValue(product.minOrderQuant.toString());
        }
        if (product && product.salePrice && product.unitPrice) {
            setSalep(product.salePrice);
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
            setTotalPrice(Tprice);
        }
    }, [salep, unitp, value]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };



    return (
        <div className="flexcol wh product-detail">
            {product ? (
                <Fragment>
                    <div className="flex wh">
                        <div className="heading2 wh captext">{product.category}</div>
                    </div>

                    <div className="pdcont">
                        <div className="pdcol_one">
                            <div className="sel-box" style={{ gap: '20px' }}>
                                <div className="big-image">
                                    <img src={selectedImage} alt="Big Image" />
                                </div>
                                <div className="flex" style={{ gap: '10px' }}>
                                    <div className="small-image" onClick={() => handleImageClick(product.images[0].url)}>
                                        {product.images[0] && <img src={product.images[0].url} alt={product.images[0].name} />}
                                    </div>
                                    <div className="small-image" onClick={() => handleImageClick(product.images[1].url)}>
                                        {product.images[1] && <img src={product.images[1].url} alt={product.images[1].name} />}
                                    </div>
                                    <div className="small-image" onClick={() => handleImageClick(product.images[2].url)}>
                                        {product.images[2] && <img src={product.images[2].url} alt={product.images[2].name} />}
                                    </div>
                                    <div className="small-image" onClick={() => handleImageClick(product.images[3].url)}>
                                        {product.images[3] && <img src={product.images[3].url} alt={product.images[3].name} />}
                                    </div>
                                    <div className="small-image" onClick={() => handleImageClick(product.images[4].url)}>
                                        {product.images[4] && <img src={product.images[4].url} alt={product.images[4].name} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pdcol_two">
                            <div className="heading2 wh captext">Brand : {product.brandName}</div>
                            <div className="heading wh captext">{product.productName}</div>
                            <div className="sel-box" style={{ gap: '20px' }}>
                                <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                                    <div className="flex" style={{ gap: '15px' }}>
                                        <span className='descrip2' style={{ textDecoration: 'line-through' }}>AED {product.unitPrice}</span><span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>{discountPercentage}% OFF</span>
                                    </div>
                                    <div className="flex" style={{ gap: '15px' }}>
                                        <span>AED</span><span style={{ fontWeight: 'bold', fontSize: '22px' }}>{product.salePrice}</span>
                                    </div>
                                    <div className="flex">
                                        <span className='descrip'>per piece Incl. VAT</span>
                                    </div>
                                </div>
                            </div>
                            <div className="heading2 wh">We accept</div>
                            <div className="heading3 wh">About this item</div>
                            <ul style={{ marginLeft: '16px' }}>
                                <li className='descrip2 caplist'>AirPods Pro (2nd generation) with USB-C deliver up to 2x more Active Noise Cancellation than the previous generation.</li>
                                <li className='descrip2 caplist'>Conversation Awareness helps lower media volume and enhance the voices in front of you while you’re interacting with others. A single charge delivers up to 6 hours of battery life.</li>
                                <li className='descrip2 caplist'>And Touch control lets you easily adjust volume with a swipe. The MagSafe Charging Case is a marvel on its own with Precision Finding, built-in speaker, and lanyard loop.</li>
                                <li className='descrip2 caplist'>The upgraded H2 chip powers smarter noise cancellation and three-dimensional sound. Adaptive EQ tunes music to your ears in real time to deliver crisp, clean high notes and deep, rich bass in stunning clarity.</li>
                                <li className='descrip2 caplist'>Active Noise Cancellation removes twice as much unwanted noise, so nothing interrupts your listening during a commute and when you need to focus.</li>
                                <li className='descrip2 caplist'>Transparency mode reduces and adjusts down the intensity of loud noises at 48,000 times per second, so you can comfortably hear the world around you.</li>
                            </ul>

                            <div className="flexcol wh">
                                <div className={`accordion-pd ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleProductAccordion(1)}>
                                    <div className="heading3 flex"><img src={ProDetail} className='img-big' alt="" />&nbsp;&nbsp;Product details</div>
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
                                    <div className="heading3 flex"><img src={Box} className='img-big' alt="" />&nbsp;&nbsp;Stock dimensions</div>
                                </div>
                                <div className="panel-pd" style={{ maxHeight: activeIndex === 2 ? '300px' : '0' }}>
                                    <div className="flexcol wh" style={{ padding: '10px', alignItems: 'start' }}>
                                        <div className="descrip2 captext" >Carton dimensions (LWH): {product.cartonLgh} {product.cartonLghUnit} x {product.cartonWdh} {product.cartonWdhUnit} x {product.cartonHgt} {product.cartonHgtUnit}</div>
                                        <div className="descrip2 captext" >Carton weight: {product.cartonWgt} {product.cartonWgtUnit} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pdcol_three">
                            <div className="sel-box" style={{ gap: '20px' }}>
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
                                    <div className="heading2"><span>Total Price Incl. VAT</span></div>
                                    <div className="heading2"><span>{totalPrice} AED</span></div>
                                </div>

                                <div className="flexcol wh" style={{ gap: '10px' }}>
                                    <button className='btn2 addtocart flex' onClick={addToCart}><AddShoppingCartIcon style={{ width: '15px' }} /><div className="heading2">Add to cart</div></button>
                                    <button className='btn addtocart flex'><div className="heading2">Negotiate with seller</div></button>
                                </div>
                            </div>
                            <div className="sel-box" style={{ gap: '20px' }}>
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
                                        <div className="heading2 flex" style={{ gap: '5px' }}><img src={ReturnIcon} className='img' /><span>Returns</span></div>
                                        <div className="descrip2"><a className='hoverr'>Read seller's return policy</a></div>
                                    </div>

                                    <div className="flexcol wh" style={{ alignItems: 'start', paddingTop: '10px' }}>
                                        <div className="descrip2">Final price, delivery dates and additional shipping options will be shown at checkout.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="sel-box" style={{ gap: '20px' }}>
                                <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                                    <div className="heading3">Seller information</div>
                                    <div className="flex wh" style={{ justifyContent: 'space-between', }}>
                                        <div className="descrip warning-btn2 flex" style={{ color: 'white' }}><VerifiedIcon style={{ width: '15px' }} />Verified</div>
                                        <div className="descrip2">India</div>
                                    </div>
                                    <div className="flex wh">
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
                                <div>Seller SKU ID</div>
                                <div>Technical specification sheet available by request</div>
                                <div>Average battery life</div>
                                <div>Connectivity type</div>
                                <div>Operating system</div>
                                <div>Port type</div>
                                <div>Dangerous goods</div>
                            </div>
                            <div className="over-field">
                                <div className='captext'>{product.sku}</div>
                                <div className='captext'>No</div>
                                <div className='captext'>Up to 6 hours of listening time with a single charge</div>
                                <div className='captext'>Wireless</div>
                                <div className='captext'>iOS</div>
                                <div className='captext'>MagSafe Charging Case (USB‑C)</div>
                                <div className='captext'>{product.dgrGoods}</div>
                            </div>
                        </div>
                        <div className="overview_one">
                            <div className="over-heading">
                                <div>Color</div>
                                <div>Item length</div>
                                <div>Item width</div>
                                <div>Item height</div>
                                <div>Item weight</div>
                                <div>Item weight unit</div>
                                <div>Item dimensions unit</div>
                            </div>
                            <div className="over-field">
                                <div className='captext'>{product.variantColor}</div>
                                <div className='captext'>{product.productLgh}</div>
                                <div className='captext'>{product.productWdh}</div>
                                <div className='captext'>{product.productHgt}</div>
                                <div className='captext'>{product.productWgt}</div>
                                <div className='captext'>{product.productWgtUnit}</div>
                                <div className='captext'>{product.DimensionUnit}</div>
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
            ) : (
                <Fragment>Loading...</Fragment>
            )}
        </div>
    )
}

export default ProductDetails
