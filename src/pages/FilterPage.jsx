import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import defaulImg from '../assets/default.jpg';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../components/Schemas/cate';
import { useLocation, useNavigate } from 'react-router-dom';

//search-results
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

    const dispatch = useDispatch();
    const { products, status, error, currentPage, totalPages, pageSize, totalItems } = useSelector((state) => state.products);

    //pagination
    const [page, setPage] = useState(currentPage);
    const [size, setSize] = useState(15);
    useEffect(() => {
        dispatch(fetchProducts({ page, size }));
    }, [dispatch, page, size]);
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };
    const handlePageSizeChange = (e) => {
        setSize(Number(e.target.value));
        setPage(0);
    };


    // price
    const [price, setPrice] = useState([0, 100000]);
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };



    // Category filter 
    const [selectedSupOption, setSelectedSupOption] = useState(supOption);
    const [selectedSubOption, setSelectedSubOption] = useState(subOption);
    const [selectedMiniSubOption, setSelectedMiniSubOption] = useState(miniSubOption);
    const [selectedMicroSubOption, setSelectedMicroSubOption] = useState('');

    const [isSecondSelectEnabled, setIsSecondSelectEnabled] = useState(!!supOption);
    const [isThirdSelectEnabled, setIsThirdSelectEnabled] = useState(!!subOption);
    const [isFourthSelectEnabled, setIsFourthSelectEnabled] = useState(!!miniSubOption);

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

    // filter products based on price range, category and short products
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
    }, [products, price, sortBy, selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption, query]);



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

    const truncateAndConvertPascal = (text, maxLength) => {
        const readableText = text.replace(/([A-Z])/g, ' $1').trim();
        if (readableText.length <= maxLength) {
            return readableText;
        }
        return readableText.slice(0, maxLength) + '...';
    };

    //spaced-text
    const convertPascalToReadable = (text) => {
        return text.replace(/([A-Z])/g, ' $1').trim();
    };

    //fetch products 
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);


    //clear query
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


    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Search Results</title>
            </Helmet>
            <div className="flexcol wh" style={{ gap: '10px' }}>
                { query && <div className="flex wh" style={{justifyContent: 'space-between'}}>
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
                                <option value="">Select an option</option>
                                {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
                                    <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                                ))}
                            </select>

                            <select onChange={handleMicroSubOptionChange} className="box flex" value={selectedMicroSubOption}>
                                <option value="">Select sub option</option>
                                {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
                                    <option key={index} value={option}>{truncateAndConvertPascal(option)}</option>
                                ))}
                            </select>
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
                <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={page === 0}>
                    First Page
                </button>
                <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
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