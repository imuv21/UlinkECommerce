import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import defaulImg from '../assets/default.jpg';

const FilterPage = () => {

    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    //pagination
    const [page, setPage] = useState(0);
    useEffect(() => {
        dispatch(fetchProducts({ page }));
    }, [dispatch, page]);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };


    // price
    const [price, setPrice] = useState([0, 100000]);
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    //filtered products
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('low');

    // filter products based on price range and short products
    useEffect(() => {
        const filtered = products.filter(product => {
            const productPrice = parseFloat(product.sellPrice);
            return productPrice >= price[0] && productPrice <= price[1];
        });

        let sortedProducts = [...filtered];
        switch (sortBy) {
            case 'newest':
                sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'high':
                sortedProducts.sort((a, b) => parseFloat(b.sellPrice) - parseFloat(a.sellPrice));
                break;
            case 'low':
                sortedProducts.sort((a, b) => parseFloat(a.sellPrice) - parseFloat(b.sellPrice));
                break;
            default:
                break;
        }
        setFilteredProducts(sortedProducts);
    }, [products, price, sortBy]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    //TruncateText
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

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
                        <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby='range-slide' min={0} max={100000} />
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
                        <div className="heading2 wh">Healthy Snacks ( {filteredProducts.length} Items)</div>
                        <div className="flex" style={{ gap: '20px' }}>
                            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Short By</div>
                            <select name="shortby" className='selectshort' value={sortBy} onChange={handleSortChange}>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="high">Price : High to Low</option>
                                <option value="low">Price : Low to High</option>
                            </select>
                        </div>
                    </div>

                    <div className="filteredProducts">
                        {
                            filteredProducts.map((product, index) => (
                                <a className='show-img-detail' key={index} href={`/product-details/${product.productId}`}>
                                    <img className='product-img-size' src={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} alt='img' />
                                    <div className='product-detail-info'>
                                        <p className='product-title'>{truncateText(product.productName, 20)} </p>
                                        <p className='product-price'>{product.currencySymbol}{parseFloat(product.sellPrice).toFixed(2)}/ piece incl value</p>
                                        <div className='flex' style={{ gap: '10px' }}>
                                            <p className='product-discount'>{product.currencySymbol}{parseFloat(product.unitPrice).toFixed(2)}</p>
                                            <span className='discount-percentage'>{(((product.unitPrice - product.sellPrice) / product.unitPrice) * 100).toFixed(2)}% OFF</span>
                                        </div>
                                        <p className='product-quantity'>Min Order: {product.minOrderQuant} peace</p>
                                    </div>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
                <button className='btn box' style={{width: '100px'}} onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    Previous
                </button>
                <button className='btn box' style={{width: '100px'}} onClick={() => handlePageChange(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default FilterPage