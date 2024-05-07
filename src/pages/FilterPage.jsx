import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import axios from 'axios';

const FilterPage = () => {

    // price
    const [price, setPrice] = useState([0, 1000]);
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    //product api
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // filter products based on price range
    useEffect(() => {
        const filtered = products.filter(product => {
            const productPrice = parseFloat(product.price);
            return productPrice >= price[0] && productPrice <= price[1];
        });
        setFilteredProducts(filtered);
    }, [price, products]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }



    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Search Results</title>
            </Helmet>
            <div className="flex wh">
                <div className="heading2 wh captext">Home / Products / Healthy snacks</div>
            </div>
            <div className="fpcont">
                <div className="fpone">
                    <div className="filterbox">
                        <div className="heading2 wh">Price</div>
                        <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby='range-slide' min={0} max={1000} />
                        <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                            <div className="minmaxbox heading2"> {price[0]}</div> <div className="heading2">To</div> <div className="minmaxbox heading2"> {price[1]}</div>
                        </div>
                    </div>
                    <div className="filterbox">
                        <div className="heading2 wh" style={{ marginBottom: '5px' }}>Brands</div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Boat</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Sharptek</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Noise</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">BlueParrott</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Jbl</div></div>
                    </div>
                    <div className="filterbox">
                        <div className="heading2 wh" style={{ marginBottom: '5px' }}>Stock Location</div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">India</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">China</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Russia</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">UAE</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Japan</div></div>
                    </div>
                    <div className="filterbox">
                        <div className="heading2 wh" style={{ marginBottom: '5px' }}>Gender</div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Women</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Men</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Unisex</div></div>
                    </div>
                    <div className="filterbox">
                        <div className="heading2 wh" style={{ marginBottom: '5px' }}>Color</div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Blue</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Green</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Black</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">Red</div></div>
                        <div className="checkbox"><input type="checkbox" /><div className="descrip2">White</div></div>
                    </div>
                </div>
                <div className="fptwo">
                    <div className="shortby">
                        <div className="heading2 wh">Healthy Snacks (21 Products)</div>
                        <div className="flex" style={{ gap: '20px' }}>
                            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Short By</div>
                            <select name="shortby" className='selectshort'>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="high">Price : High to Low</option>
                                <option value="low">Price : Low to High</option>
                                <option value="relevance">Relevance</option>
                            </select>
                        </div>
                    </div>

                    <div className="filteredProducts">
                        {
                            filteredProducts.map((product, id) => (
                                <div className='show-img-detail' key={id}>
                                    <img className='product-img-size' src={product.image} style={{ background: 'none' }} />
                                    <div className='product-detail-info'>
                                        <p className='product-title'>{truncateText(product.title, 20)} </p>
                                        <p className='product-price'>AED {product.price}/ piece incl value</p>
                                        <div className='discount'>
                                            <p className='product-discount'>AED 7.35</p>
                                            <span className='discount-percentage'>50% Off</span>
                                        </div>
                                        <p className='product-quantity'>Unit per carton: 1</p>
                                        <p className='product-quantity'>Min Order: 1 peace</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPage