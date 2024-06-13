import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import { fetchExchangeRates } from '../Redux/currencySlice';
import currencySymbols from '../components/Schemas/currencySymbols';
import defaulImg from '../assets/default.jpg';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../components/Schemas/cate';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const FilterPage = () => {

    const query = useQuery().get('query') || '';
    const navigate = useNavigate();
    const location = useLocation();
    const { supOption = '', subOption = '', miniSubOption = '' } = location.state || {};
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('low');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);
    const [price, setPrice] = useState([0, 100000]);

    const dispatch = useDispatch();
    const { products, status, error, totalItems } = useSelector((state) => state.products);
    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const exchangeRates = useSelector(state => state.currency.exchangeRates);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    const convertPrice = (price, fromCurrency) => {
        const rate = exchangeRates[selectedCurrency];
        if (!rate) return price;
        const priceInUSD = price / exchangeRates[fromCurrency];
        return (priceInUSD * rate).toFixed(2);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const handleSupOptionChange = (event) => {
        setSelectedSupOption(event.target.value);
        setSelectedSubOption('');
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };

    const handleSubOptionChange = (event) => {
        setSelectedSubOption(event.target.value);
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };

    const handleMiniSubOptionChange = (event) => {
        setSelectedMiniSubOption(event.target.value);
        setSelectedMicroSubOption('');
    };

    const handleMicroSubOptionChange = (event) => {
        setSelectedMicroSubOption(event.target.value);
    };

    useEffect(() => {
        if (!Array.isArray(products)) return;

        const normalizeString = (str) => str ? str.toLowerCase().replace(/\s+/g, '') : '';
        const searchQueryRegex = new RegExp(query, 'i');

        const filtered = products.filter(product => {
            const productPrice = parseFloat(product.sellPrice);
            const isInPriceRange = productPrice >= price[0] && productPrice <= price[1];

            const isCategoryMatch =
                (!selectedSupOption || normalizeString(product.selectedSupOption) === normalizeString(selectedSupOption)) &&
                (!selectedSubOption || normalizeString(product.selectedSubOption) === normalizeString(selectedSubOption)) &&
                (!selectedMiniSubOption || normalizeString(product.selectedMiniSubOption) === normalizeString(selectedMiniSubOption)) &&
                (!selectedMicroSubOption || normalizeString(product.selectedMicroSubOption) === normalizeString(selectedMicroSubOption));

            const isNameMatch = searchQueryRegex.test(product.productName);
            return isInPriceRange && isCategoryMatch && (!query || isNameMatch);
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
        setPage(0); // Reset to first page on filters change
    }, [products, price, sortBy, selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption, query]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < Math.ceil(filteredProducts.length / size)) {
            setPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        setSize(Number(e.target.value));
        setPage(0);
    };

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

    const convertPascalToReadable = (text) => {
        return text.replace(/([A-Z])/g, ' $1').trim();
    };

    const handleClear = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('query');
        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const displayedProducts = filteredProducts.slice(page * size, (page + 1) * size);

    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Search Results</title>
            </Helmet>
            <div className="flexcol wh" style={{ gap: '10px' }}>
                {query && <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                    <div className='heading2 wh captext'>Showing results for: {query}</div>
                    <a className='hover' onClick={handleClear}>Clear</a>
                </div>}
                {selectedSupOption &&
                    <div className="flex-start wh">
                        <div className="heading2 captext">{convertPascalToReadable(selectedSupOption)}</div>
                        {selectedSubOption && <div className="heading2 captext">/ {convertPascalToReadable(selectedSubOption)}</div>}
                        {selectedMiniSubOption && <div className="heading2 captext">/ {convertPascalToReadable(selectedMiniSubOption)}</div>}
                        {selectedMicroSubOption && <div className="heading2 captext">/ {convertPascalToReadable(selectedMicroSubOption)}</div>}
                    </div>
                }
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
                        <div className="heading2 wh" style={{ marginBottom: '5px' }}>Categories</div>
                        <div className="filterselect">
                            <select onChange={handleSupOptionChange} className="box flex" value={selectedSupOption}>
                                <option value="">Select category</option>
                                {supOptions.map((option, index) => (
                                    <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                                ))}
                            </select>

                            <select onChange={handleSubOptionChange} className="box flex" value={selectedSubOption}>
                                <option value="">Select sub category</option>
                                {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
                                    <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                                ))}
                            </select>

                            <select onChange={handleMiniSubOptionChange} className="box flex" value={selectedMiniSubOption}>
                                <option value="">Select sub sub category</option>
                                {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
                                    <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                                ))}
                            </select>

                            <select onChange={handleMicroSubOptionChange} className="box flex" value={selectedMicroSubOption}>
                                <option value="">Select sub sub sub category</option>
                                {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
                                    <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="fptwo flexcol wh">
                    <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                        <div className="heading2">{filteredProducts.length} Results Found</div>
                        <div className="flex wh" style={{ alignItems: 'center', gap: '10px' }}>
                            <label className="heading2" htmlFor="pageSize">Show:</label>
                            <select id="pageSize" value={size} onChange={handlePageSizeChange}>
                                <option value={15}>15</option>
                                <option value={30}>30</option>
                                <option value={45}>45</option>
                            </select>
                            <label className="heading2" htmlFor="sort">Sort By:</label>
                            <select id="sort" value={sortBy} onChange={handleSortChange}>
                                <option value="low">Price: Low to High</option>
                                <option value="high">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    <div className="flexcol wh" style={{ gap: '15px' }}>
                        {displayedProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image || defaulImg} alt={product.productName} />
                                <div className="product-info">
                                    <h3>{truncateText(product.productName, 20)}</h3>
                                    <p>{currencySymbols[selectedCurrency]} {convertPrice(product.sellPrice, 'USD')}</p>
                                    <p>{product.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex" style={{ gap: '10px' }}>
                        <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</button>
                        <span>Page {page + 1} of {Math.ceil(filteredProducts.length / size)}</span>
                        <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={page === Math.ceil(filteredProducts.length / size) - 1}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPage;
