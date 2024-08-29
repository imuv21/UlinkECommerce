import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts, deleteSellerProduct } from '../../../Redux/sellerProductSlice';
import { fetchEditProduct } from '../../../Redux/updateProductSlice';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import empty from '../../../assets/empty.png';

const AllSellerProducts = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { sellerProducts, loading, error, totalItems, totalPages, numberOfElements, isFirst, isLast, hasPrevious, hasNext } = useSelector((state) => state.sellerProducts);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);

    useEffect(() => {
        dispatch(fetchSellerProducts({ page, size }));
    }, [dispatch, page, size]);

    // pagination
    const handlePageChange = useCallback((newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    }, [dispatch, totalPages]);

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


    //edit and delete
    const handleEdit = (productId) => {
        dispatch(fetchEditProduct(productId)).unwrap().then(() => {
            navigate(`/editsingle/${productId}`);
        }).catch((error) => {
            console.error('Failed to fetch product details:', error);
        });
    };
    const handleDelete = (productId) => {
        dispatch(deleteSellerProduct({ productId }))
    };

    //redirect
    const getDashboardLink = () => {
        return "/seller-dashboard/product-list";
    };

    const productDetail = (id) => {
        navigate(`/product-details/${id}`);
    };

    //popup
    const [clickedIndex, setClickedIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const handleAddAddress = (index) => {
        setClickedIndex(index);
        setSelectedItem(sellerProducts[index]);
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    //discount calculator
    const calculateDiscountPercentage = () => {
        const sellPrice = parseFloat(selectedItem.sellPrice);
        const unitPrice = parseFloat(selectedItem.unitPrice);

        if (isNaN(sellPrice) || isNaN(unitPrice)) {
            return 'N/A';
        }

        const discount = ((unitPrice - sellPrice) / unitPrice) * 100;
        return `${discount.toFixed(2)}%`;
    };

    // Calculate Ulink Fee
    const calculateUlinkFee = () => {
        const sellPrice = parseFloat(selectedItem.sellPrice);
        const commision = parseFloat(selectedItem.commision);
        const quantity = 1;

        if (isNaN(sellPrice)) {
            return 'N/A';
        }
        const ulinkFee = (commision / 100) * sellPrice * quantity;
        return `${ulinkFee.toFixed(2)}`;
    };

    // Calculate Cost per unit
    const calculateCostPerUnit = (product) => {
        const sellPrice = parseFloat(product.sellPrice);
        const tax = parseFloat(product.gst);
        const quantity = 1;

        if (isNaN(sellPrice)) {
            return 'N/A';
        }
        const ulinkFee = 0.05 * sellPrice * quantity;
        const costPerUnit = ulinkFee + tax;
        return `${costPerUnit.toFixed(2)}`;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="flexcol wh product-detail">

            <Helmet>
                <title>All Products | Ulinkit - Explore Our Full Range of Offerings</title>
                <meta name="description" content="Browse through all products available on Ulinkit. Discover a diverse range of items, compare options, and find exactly what you need at competitive prices." />
                <link rel="canonical" href="https://www.ulinkit.com/all-products" />
            </Helmet>

            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <p className="heading3">Showing {numberOfElements} of {totalItems} products </p> <Link to={getDashboardLink()} className='heading3'>Back</Link>
            </div>

            {showPopup && (
                <div className='popup-parent'>
                    <form className='popup-child'>

                        <div className="popupform">
                            <div className="popbox">
                                <div className="heading wh">Revenue Calculator</div>
                                <div className="popboxdivs">
                                    <div className="heading2">Unit Price</div><div className='bbox'>{Number(selectedItem.unitPrice).toFixed(2)} {user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Shipping Charges</div><div className='bbox'>0 {user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Discount</div><div className='bbox'>{calculateDiscountPercentage()}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Sale Price</div><div className='bbox'>{Number(selectedItem.sellPrice).toFixed(2)} {user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Ulinkit Fee</div><div className='bbox'>{calculateUlinkFee()} {user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Taxes on Fee</div><div className='bbox'>{selectedItem.gst} {user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Marketing Fee</div><div className='bbox'>{selectedItem.commision}%</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Cost Per Unit</div><div className='bbox'>{calculateCostPerUnit(selectedItem)} {user.currencySymbol}</div>
                                </div>

                                <div className="flex" style={{ gap: '20px' }}>
                                    <button onClick={handleClosePopup} className='btn box2 flex' style={{ width: 'fit-content' }} type="button" ><div className="heading2">Back</div></button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            )}

            <div className="allproduct2">
                {sellerProducts.length === 0 ? (
                    <Fragment>
                        <div className="productlist">
                            <img src={empty} className='productlist-img' alt="empty box" />
                            <p className="heading">You do not have any products in this list</p>
                            <p className="descrip2">This is where you will be able to view and manage your products</p>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>

                        <div className='searchBoxPronew'>
                            <div className="sfp_relative">
                                <input type='text' className='searchinputPro' placeholder='Search for products...' />
                                <div className='searchbtnPro'><SearchIcon /></div>
                            </div>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Status</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Category</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                        </div>
                        <div className="searchBoxPro2 grid-head">
                            <div className="heading3">Image</div>
                            <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                            <div className="heading3">Category</div>
                            <div className="heading3">Price</div>
                            <div className="heading3">Fee Preview</div>
                            <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                            <div className="heading3">Status</div>
                            <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                            <div className="heading3">Visibility</div>
                            <div className="heading3">Action</div>
                        </div>
                        {sellerProducts.map((item, index) => (
                            <div className="searchBoxPro2" key={item.productId}>
                                <div>
                                    {item.imageUrl && <img className='imgPro' src={item.imageUrl} alt={item.imageName} />}
                                </div>
                                <p className="heading2 download-btn" onClick={() => productDetail(item.productId)} style={{ whiteSpace: 'nowrap' }}>
                                    {item.productName.length > 15 ? `${item.productName.substring(0, 15)}...` : item.productName}
                                </p>
                                <p className="heading2">
                                    {item.category.length > 15 ? `${item.category.substring(0, 15)}...` : item.category}
                                </p>
                                <div className="heading2">
                                    <div className="flex" style={{ gap: '5px' }}>
                                        <span style={{ textDecoration: 'line-through', color: 'gray' }}>{user.currencySymbol} {item.unitPrice}</span>-<span style={{ fontWeight: 'bold' }}>{user.currencySymbol} {item.sellPrice}</span>
                                    </div>
                                </div>
                                <div className="heading2"><span className='download-btn' onClick={() => handleAddAddress(index)}> {calculateCostPerUnit(item)} {user.currencySymbol} </span></div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>
                                    <div className="flexcol" style={{ gap: '2px' }}>
                                        {/* <span style={{ fontWeight: 'bold' }}>{item.availableQuantity}</span> */}
                                        <span style={{ fontWeight: 'bold' }}>3</span>
                                        <span style={{ fontSize: '12px', display: 'none' }}>MOQ is {item.minOrderQuant}</span>
                                    </div>
                                </div>
                                <div className="heading2">{item.status}</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>{new Date(item.updatedDate).toLocaleString()}</div>
                                <div className="heading2">{item.visibility}</div>
                                <div className="heading2 flexcol">
                                    <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEdit(item.productId)} />
                                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.productId)} />
                                </div>
                            </div>
                        ))}

                        <div className="flexcol wh" style={{ marginTop: '20px' }} >
                            <div className="flex" style={{ gap: '10px' }}>
                                <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={isFirst}>
                                    First Page
                                </button>
                                <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPrevious}>
                                    Previous
                                </button>

                                {pageNumbers.map(index => (
                                    <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} style={{ width: '50px' }} onClick={() => handlePageChange(index)}>
                                        {index + 1}
                                    </button>
                                ))}

                                <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNext}>
                                    Next
                                </button>
                                <button className='pagination-btn' onClick={() => handlePageChange(totalPages - 1)} disabled={isLast}>
                                    Last Page
                                </button>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default AllSellerProducts

