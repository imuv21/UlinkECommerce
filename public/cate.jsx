import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import defaulImg from '../assets/default.jpg';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../components/Schemas/cate';
import { useLocation } from 'react-router-dom';

const FilterPage = () => {
    const location = useLocation();
    const { supOption = '', subOption = '', miniSubOption = '' } = location.state || {};

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('low');

    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    // Initialize category filter states from location.state
    const [selectedSupOption, setSelectedSupOption] = useState(supOption);
    const [selectedSubOption, setSelectedSubOption] = useState(subOption);
    const [selectedMiniSubOption, setSelectedMiniSubOption] = useState(miniSubOption);
    const [selectedMicroSubOption, setSelectedMicroSubOption] = useState('');

    const [isSecondSelectEnabled, setIsSecondSelectEnabled] = useState(!!supOption);
    const [isThirdSelectEnabled, setIsThirdSelectEnabled] = useState(!!subOption);
    const [isFourthSelectEnabled, setIsFourthSelectEnabled] = useState(!!miniSubOption);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    useEffect(() => {
        dispatch(fetchProducts({ page, size }));
    }, [dispatch, page, size]);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Price
    const [price, setPrice] = useState([0, 100000]);
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    // Handle category changes
    const handleSupOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSupOption(selectedOption);
        setIsSecondSelectEnabled(true);
        setIsThirdSelectEnabled(false);
        setIsFourthSelectEnabled(false);
        setSelectedSubOption('');
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };

    const handleSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSubOption(selectedOption);
        setIsThirdSelectEnabled(true);
        setIsFourthSelectEnabled(false);
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };

    const handleMiniSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMiniSubOption(selectedOption);
        setIsFourthSelectEnabled(true);
        setSelectedMicroSubOption('');
    };

    const handleMicroSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMicroSubOption(selectedOption);
    };

    // Filter products based on price range, category, and sort products
    useEffect(() => {
        const normalizeString = (str) => str ? str.toLowerCase().replace(/\s+/g, '') : '';
        const filtered = products.filter(product => {
            const productPrice = parseFloat(product.sellPrice);
            const isInPriceRange = productPrice >= price[0] && productPrice <= price[1];

            const isCategoryMatch =
                (!selectedSupOption || normalizeString(product.selectedSupOption) === normalizeString(selectedSupOption)) &&
                (!selectedSubOption || normalizeString(product.selectedSubOption) === normalizeString(selectedSubOption)) &&
                (!selectedMiniSubOption || normalizeString(product.selectedMiniSubOption) === normalizeString(selectedMiniSubOption)) &&
                (!selectedMicroSubOption || normalizeString(product.selectedMicroSubOption) === normalizeString(selectedMicroSubOption));

            return isInPriceRange && isCategoryMatch;
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
    }, [products, price, sortBy, selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    const truncateAndConvertPascal = (text, maxLength) => {
        const readableText = text.replace(/([A-Z])/g, ' $1').trim();
        if (readableText.length <= maxLength) {
            return readableText;
        }
        return readableText.slice(0, maxLength) + '...';
    };

    return (
        <div>
            <Helmet>
                <title>Search Results</title>
            </Helmet>
            <div className="filterbox">
                <div className="heading2 wh" style={{ marginBottom: '5px' }}>Categories</div>
                <div className="filterselect">
                    <select onChange={handleSupOptionChange} className="box flex" value={selectedSupOption}>
                        <option value="">Select category</option>
                        {supOptions.map((option, index) => (
                            <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                        ))}
                    </select>

                    <select onChange={handleSubOptionChange} className="box flex" value={selectedSubOption} disabled={!isSecondSelectEnabled}>
                        <option value="">Select sub category</option>
                        {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
                            <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                        ))}
                    </select>

                    <select onChange={handleMiniSubOptionChange} className="box flex" value={selectedMiniSubOption} disabled={!isThirdSelectEnabled}>
                        <option value="">Select an option</option>
                        {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
                            <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                        ))}
                    </select>

                    <select onChange={handleMicroSubOptionChange} className="box flex" value={selectedMicroSubOption} disabled={!isFourthSelectEnabled}>
                        <option value="">Select sub option</option>
                        {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
                            <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="filteredProducts">
                {filteredProducts.map((product, index) => (
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
                ))}
            </div>
        </div>
    );
};

export default FilterPage;
