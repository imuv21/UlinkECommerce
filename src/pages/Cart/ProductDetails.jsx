import React, { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FlightIcon from '@mui/icons-material/Flight';
import ReturnIcon from '../../assets/return.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import ProDetail from '../../assets/proDetail.png';
import Box from '../../assets/boxx.png';
import Img1 from '../../assets/jpg-slider/1.jpg';
import Img2 from '../../assets/jpg-slider/2.jpg';
import Img3 from '../../assets/jpg-slider/3.jpg';
import Img4 from '../../assets/jpg-slider/4.jpg';
import Img5 from '../../assets/jpg-slider/5.jpg';
import './cart.css';

const ProductDetails = () => {

    //plus-minus
    const [value, setValue] = useState(1);
    const incrementValue = () => {
        setValue(prevValue => prevValue + 1);
    };
    const decrementValue = () => {
        setValue(prevValue => (prevValue > 1 ? prevValue - 1 : 1));
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value);
        setValue(newValue >= 1 ? newValue : 1);
    };


    //accordion-panel
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleProductAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    //img-change-slider
    const [selectedImage, setSelectedImage] = useState(Img1);
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };


    return (
        <div className="flexcol wh product-detail">
            <div className="flex wh">
                <div className="heading2 wh">Home / Consumer Electronics / Audio & Studio / Headphones & Headsets / Wireless Earbuds</div>
            </div>

            <div className="pdcont">
                <div className="pdcol_one">
                    <div className="sel-box" style={{ gap: '20px' }}>
                        <div className="big-image">
                            <img src={selectedImage} alt="Big Image" />
                        </div>
                        <div className="flex" style={{ gap: '10px' }}>
                            <div className="small-image" onClick={() => handleImageClick(Img1)}>
                                <img src={Img1} alt="Small Image 1" />
                            </div>
                            <div className="small-image" onClick={() => handleImageClick(Img2)}>
                                <img src={Img2} alt="Small Image 2" />
                            </div>
                            <div className="small-image" onClick={() => handleImageClick(Img3)}>
                                <img src={Img3} alt="Small Image 3" />
                            </div>
                            <div className="small-image" onClick={() => handleImageClick(Img4)}>
                                <img src={Img4} alt="Small Image 4" />
                            </div>
                            <div className="small-image" onClick={() => handleImageClick(Img5)}>
                                <img src={Img5} alt="Small Image 5" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pdcol_two">
                    <div className="heading2 wh">Brand : <span className='hoverr'>Apple</span></div>
                    <div className="heading3 wh">Apple Airpods Pro 2nd Gen USB-C</div>
                    <div className="sel-box" style={{ gap: '20px' }}>
                        <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                            <div className="flex" style={{ gap: '15px' }}>
                                <span className='descrip2' style={{ textDecoration: 'line-through' }}>AED 737.33</span><span style={{ fontWeight: 'bold', fontSize: '14px', color: 'limegreen' }}>1% OFF</span>
                            </div>
                            <div className="flex" style={{ gap: '15px' }}>
                                <span>AED</span><span style={{ fontWeight: 'bold', fontSize: '22px' }}>729.75</span>
                            </div>
                            <div className="flex">
                                <span className='descrip'>per piece Incl. VAT</span>
                            </div>
                        </div>
                    </div>
                    <div className="heading2 wh">We accept</div>
                    <div className="heading3 wh">About this item</div>
                    <ul style={{ marginLeft: '16px' }}>
                        <li className='descrip2' style={{ listStyle: 'circle' }}>AirPods Pro (2nd generation) with USB-C deliver up to 2x more Active Noise Cancellation than the previous generation.</li>
                        <li className='descrip2' style={{ listStyle: 'circle' }}>Conversation Awareness helps lower media volume and enhance the voices in front of you while you’re interacting with others. A single charge delivers up to 6 hours of battery life.</li>
                        <li className='descrip2' style={{ listStyle: 'circle' }}>And Touch control lets you easily adjust volume with a swipe. The MagSafe Charging Case is a marvel on its own with Precision Finding, built-in speaker, and lanyard loop.</li>
                        <li className='descrip2' style={{ listStyle: 'circle' }}>The upgraded H2 chip powers smarter noise cancellation and three-dimensional sound. Adaptive EQ tunes music to your ears in real time to deliver crisp, clean high notes and deep, rich bass in stunning clarity.</li>
                        <li className='descrip2' style={{ listStyle: 'circle' }}>Active Noise Cancellation removes twice as much unwanted noise, so nothing interrupts your listening during a commute and when you need to focus.</li>
                        <li className='descrip2' style={{ listStyle: 'circle' }}>Transparency mode reduces and adjusts down the intensity of loud noises at 48,000 times per second, so you can comfortably hear the world around you.</li>
                    </ul>

                    <div className="flexcol wh">
                        <div className={`accordion-pd ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleProductAccordion(1)}>
                            <div className="heading3 flex"><img src={ProDetail} className='img-big' alt="" />&nbsp;&nbsp;Product details</div>
                        </div>
                        <div className="panel-pd" style={{ maxHeight: activeIndex === 1 ? '300px' : '0' }}>
                            <div className="flexcol wh" style={{ padding: '10px', alignItems: 'start' }}>
                                <div className="descrip2" >Brand: Apple</div>
                                <div className="descrip2" >Country of origin: China</div>
                                <div className="descrip2">Storage temperature: Dry</div>
                                <div className="descrip2">Unit size: 1 piece</div>
                                <div className="descrip2">Number of packs in one carton: 1</div>
                                <div className="descrip2">Min. Order Quantity: 1 piece</div>
                            </div>
                        </div>

                        <div className={`accordion-pd ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleProductAccordion(2)}>
                            <div className="heading3 flex"><img src={Box} className='img-big' alt="" />&nbsp;&nbsp;Stock dimensions</div>
                        </div>
                        <div className="panel-pd" style={{ maxHeight: activeIndex === 2 ? '300px' : '0' }}>
                            <div className="flexcol wh" style={{ padding: '10px', alignItems: 'start' }}>
                                <div className="descrip2" >Carton dimensions (LWH): 6.33 cm x 3.05 cm x 6.33 cm</div>
                                <div className="descrip2" >Carton weight: 240g</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pdcol_three">
                    <div className="sel-box" style={{ gap: '20px' }}>
                        <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                            <div className="heading3">Order quantity</div>
                            <div className="plus-minus">
                                <div style={{ cursor: 'pointer' }}><AddCircleOutlineIcon onClick={incrementValue} /></div>
                                <input className='pminput' type="number" value={value} onChange={handleInputChange} />
                                <div style={{ cursor: 'pointer' }}><RemoveCircleOutlineIcon onClick={decrementValue} /></div>
                            </div>
                            <div className="descrip2">Minimum order quantity is 1 piece</div>
                        </div>

                        <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
                            <div className="heading2"><span>Total Price Incl. VAT</span></div>
                            <div className="heading2"><span>1,786.68 AED</span></div>
                        </div>

                        <div className="flexcol wh" style={{ gap: '10px' }}>
                            <button className='btn addtocart flex'><AddShoppingCartIcon style={{ width: '15px' }} /><div className="heading2">Add to cart</div></button>
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
                <div className="heading3 wh">Overview</div>
            </div>

            <div className="overview">
                <div className="overview_one">
                    <div className="over-heading">
                        <div>Seller SKU ID</div>
                        <div>Technical specification sheet available by request</div>
                        <div>Average battery life</div>
                        <div>Connectivity type</div>
                        <div>Dangerous goods</div>
                        <div>Operating system</div>
                        <div>Port type</div>
                    </div>
                    <div className="over-field">
                        <div>IP-190920230555</div>
                        <div>No</div>
                        <div>Up to 6 hours of listening time with a single charge</div>
                        <div>Wireless</div>
                        <div>No</div>
                        <div>iOS</div>
                        <div>MagSafe Charging Case (USB‑C)</div>
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
                        <div>White</div>
                        <div>6</div>
                        <div>3</div>
                        <div>6</div>
                        <div>240</div>
                        <div>g</div>
                        <div>cm</div>
                    </div>
                </div>
            </div>

            <div className="flexcol wh">
                <div className="heading3 wh">Product description</div>
            </div>

            <div className="descrip2 flex wh">
                Print all your business documents quickly and efficiently and match the performance of your HP Color LaserJet Pro with Original HP Toner cartridges with JetIntelligence. Rely on HP quality and reliability for impressive printing results. Get more value from your cartridge Be confident you’re getting more from your cartridge.1 Original HP Toner cartridges with Jet Intelligence deliver cost-effective high-yield options and enhanced efficiency with dependable tracking of toner levels, Print at high speeds – without sacrificing quality, Produce top-quality documents, at speeds your printer was built to achieve.
            </div>

        </div>
    )
}

export default ProductDetails
