import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterProducts } from '../Redux/filterProductSlice';
import { fetchExchangeRates } from '../Redux/currencySlice';
import currencySymbols from '../components/Schemas/currencySymbols';
import defaulImg from '../assets/default.jpg';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../components/Schemas/cate';
import { useLocation, useNavigate } from 'react-router-dom';

//search-results
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const FilterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { filterProducts, status, error, currentPage, totalPages, totalItems, numberOfElements } = useSelector((state) => state.filterProducts);
    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const exchangeRates = useSelector(state => state.currency.exchangeRates);

    //product fetch
    const [page, setPage] = useState(currentPage || 0);
    const [size, setSize] = useState(15);
    const [sort, setSort] = useState('PRICE_HIGH_TO_LOW');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [vprice, setVprice] = useState([0, 100000]);
    const minPrice = vprice[0];
    const maxPrice = vprice[1];

    const [selectedSupOption, setSelectedSupOption] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');
    const [selectedMiniSubOption, setSelectedMiniSubOption] = useState('');
    const [selectedMicroSubOption, setSelectedMicroSubOption] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFilterProducts({ page, size, sort, category, minPrice, maxPrice }));
        }
    }, [status, dispatch, page, size, sort, category, minPrice, maxPrice]);
    useEffect(() => {
        if (status === 'success' || status === 'failed') {
            setPage(currentPage);
        }
    }, [status, currentPage]);


    useEffect(() => {
        if (selectedSupOption && selectedSubOption && selectedMiniSubOption && selectedMicroSubOption) {
            setCategory(selectedMicroSubOption);
        } else if (selectedSupOption && selectedSubOption && selectedMiniSubOption) {
            setCategory(selectedMiniSubOption);
        } else if (selectedSupOption && selectedSubOption) {
            setCategory(selectedSubOption);
        } else if (selectedSupOption) {
            setCategory(selectedSupOption);
        } else {
            setCategory('');
        }
    }, [selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption]);

    useEffect(() => {
        if (category) {
            dispatch(fetchFilterProducts({ page, size, sort, category, minPrice, maxPrice }));
        }
    }, [category, dispatch, page, size, sort, minPrice, maxPrice]);

    //pagination, sorting, price and category
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
            dispatch(fetchFilterProducts({ page: newPage, size, sort, category, minPrice, maxPrice }));
        }
    };
    const handleSortChange = (e) => {
        setSort(e.target.value);
        dispatch(fetchFilterProducts({ page, size, sort: e.target.value, category, minPrice, maxPrice }));
    };
    const priceHandler = (newPrice) => {
        setVprice(newPrice);
        setTimeout(() => {
            dispatch(fetchFilterProducts({ page, size, sort, category, minPrice: newPrice[0], maxPrice: newPrice[1] }));
        }, 2000);
    };

    const handleSupOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSupOption(selectedOption);
        setSelectedSubOption('');
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };
    const handleSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSubOption(selectedOption);
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };
    const handleMiniSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMiniSubOption(selectedOption);
        setSelectedMicroSubOption('');
    };
    const handleMicroSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMicroSubOption(selectedOption);
    };

    // Function to get page numbers to display
    const getPageNumbers = (currentPage, totalPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5; // Number of page buttons to display at once

        // Determine the start and end page numbers
        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        // always show the correct number of page buttons
        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 0) {
                endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);
            } else if (endPage === totalPages - 1) {
                startPage = Math.max(0, endPage - maxPageButtons + 1);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, totalPages);

    //currency
    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);
    const convertPrice = (price, fromCurrency) => {
        const rate = exchangeRates[selectedCurrency];
        if (!rate) return price;
        const priceInUSD = price / exchangeRates[fromCurrency];
        return (priceInUSD * rate).toFixed(2);
    };

    //clear query
    const query = useQuery().get('query') || '';
    useEffect(() => {
        if (query) {
            setSearch(query);
            setPage(0);
            setSize(null);
            dispatch(fetchFilterProducts({ page: 0, size: null, sort, category, search: query, minPrice, maxPrice }));
        }
        console.log(filterProducts);
    }, [query, dispatch, sort, category, minPrice, maxPrice, page ]);
    const handleClear = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('query');
        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
        setPage(0);
        setSize(15);
        setSearch('');
        dispatch(fetchFilterProducts({ page: 0, size: 15, sort, category, search: '', minPrice, maxPrice }));
    };

    //clear category
    const handleClearCat = () => {
        setCategory('');
        setSelectedSupOption('');
        setSelectedSubOption('');
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
        dispatch(fetchFilterProducts({ page, size, sort, category: '', minPrice, maxPrice }));
    };

    //TruncateText
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }
    //spaced-text
    const convertPascalToReadable = (text) => {
        return text.replace(/([A-Z])/g, ' $1').trim();
    };


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
            <div className="flexcol wh" style={{ gap: '10px' }}>
                {query &&
                    <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                        <div className='descrip2 wh captext'>Showing results for: &nbsp;&nbsp;&nbsp;&nbsp; {truncateText(query, 30)}</div>
                        <a className='descrip2 hover' style={{ color: 'red'}} onClick={handleClear}>Clear</a>
                    </div>
                }

                {category &&
                    <div className='flex wh' style={{ justifyContent: 'space-between' }}>
                        <div className="flex-start wh">
                            {selectedSupOption && <div className="descrip2 captext">{convertPascalToReadable(selectedSupOption)}</div>}
                            {selectedSubOption && <div className="descrip2 captext">/ {convertPascalToReadable(selectedSubOption)}</div>}
                            {selectedMiniSubOption && <div className="descrip2 captext">/ {convertPascalToReadable(selectedMiniSubOption)}</div>}
                            {selectedMicroSubOption && <div className="descrip2 captext">/ {convertPascalToReadable(selectedMicroSubOption)}</div>}
                        </div>
                        <a className='descrip2 hover' style={{ color: 'red'}} onClick={handleClearCat}>Clear</a>
                    </div>
                }
            </div>

            <div className="fpcont">
                <div className="fpone">
                    <div className="filterbox">
                        <div className="heading2 wh">Price</div>
                        <Slider value={vprice} onChange={(event, newPrice) => priceHandler(newPrice)} valueLabelDisplay="auto" aria-labelledby='range-slide' min={0} max={100000} />
                        <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                            <div className="minmaxbox heading2"> {vprice[0]}</div> <div className="heading2">To</div> <div className="minmaxbox heading2"> {vprice[1]}</div>
                        </div>
                    </div>
                    <div className="filterbox">
                        <div className="heading2 wh" style={{ marginBottom: '5px' }}>Categories</div>
                        <div className="filterselect">
                            <select onChange={handleSupOptionChange} className="box flex" value={selectedSupOption}>
                                <option value="">Select category</option>
                                {supOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>

                            <select onChange={handleSubOptionChange} className="box flex" value={selectedSubOption}>
                                <option value="">Select sub category</option>
                                {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>

                            <select onChange={handleMiniSubOptionChange} className="box flex" value={selectedMiniSubOption}>
                                <option value="">Select an option</option>
                                {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>

                            <select onChange={handleMicroSubOptionChange} className="box flex" value={selectedMicroSubOption}>
                                <option value="">Select sub option</option>
                                {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
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
                        <div className="heading2 wh">Showing {numberOfElements} items out of {totalItems}</div>
                        <div className="flex" style={{ gap: '20px' }}>
                            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Short By</div>
                            <select name="shortby" className='selectshort' value={sort} onChange={handleSortChange}>
                                <option value="NEWEST">Newest</option>
                                <option value="RELEVANCE">Relevance</option>
                                <option value="PRICE_HIGH_TO_LOW">Price : High to Low</option>
                                <option value="PRICE_LOW_TO_HIGH">Price : Low to High</option>
                            </select>
                        </div>
                    </div>

                    <div className="filteredProducts">
                        {
                            filterProducts.map((product, index) => (
                                <a className='show-img-detail' key={index} href={`/product-details/${product.productId}`}>
                                    <img className='product-img-size' src={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} alt='img' />
                                    <div className='product-detail-info'>
                                        <p className='product-title'>{truncateText(product.productName, 20)} </p>
                                        <p className='product-price'>{currencySymbols[selectedCurrency]} {convertPrice(product.sellPrice, product.currencyname)} {selectedCurrency}/ piece incl value</p>
                                        <div className='flex' style={{ gap: '10px' }}>
                                            <p className='product-discount'> {currencySymbols[selectedCurrency]} {convertPrice(product.unitPrice, product.currencyname)} {selectedCurrency} </p>
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
                <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={page === 0}>
                    First Page
                </button>
                <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    Previous
                </button>

                {pageNumbers.map(index => (
                    <button
                        key={index}
                        className={`pagination-btn ${index === page ? 'active' : ''}`}
                        style={{ width: '50px' }}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                    Next
                </button>
                <button className='pagination-btn' onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1}>
                    Last Page
                </button>
            </div>
        </div>
    )
}

export default FilterPage