import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts,  deleteSellerProduct } from '../../Redux/sellerProductSlice';
import SearchIcon from '@mui/icons-material/Search';
import empty from '../../assets/empty.png';
import demo from '../../assets/demo.jpg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet-async';


const ProductList = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { sellerProducts, loading, error } = useSelector((state) => state.sellerProducts);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    useEffect(() => {
        dispatch(fetchSellerProducts({ page, size }));
    }, [dispatch, page, size]);


    const addsingle = () => {
        navigate('/seller-dashboard/add-single-product');
    }

    const [clickedIndex, setClickedIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const productDetail = (id) => {
        navigate(`/product-details/${id}`);
    };

    //popup
    const [showPopup, setShowPopup] = useState(false);
    const handleAddAddress = (index) => {
        setClickedIndex(index);
        setSelectedItem(sellerProducts[index]);
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    //page 1
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
    };

    const handleEdit = (index) => {
        navigate(`/editsingle/${index}`);
    };

    const handleDelete = (productId) => {
        dispatch(deleteSellerProduct({ productId }))
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
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Products List</title>
            </Helmet>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading">Products List</div>
                <button onClick={addsingle} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Add Single Product</div></button>
            </div>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="descrip2">Find and manage your uploaded products here</div>
                <a href='../assets/json/GOT.epub' className='download-btn' download target='_blank'>DOWNLOAD REJECTION REASONS</a>
            </div>

            {showPopup && (
                <div className='popup-parent'>
                    <form className='popup-child'>

                        <div className="popupform">
                            <div className="popbox">
                                <div className="heading wh">Revenue Calculator</div>
                                <div className="popboxdivs">
                                    <div className="heading2">Unit Price</div><div className='bbox'>{selectedItem.unitPrice}{user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Shipping Charges</div><div className='bbox'>0{user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Discount</div><div className='bbox'>{calculateDiscountPercentage()}{user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Sale Price</div><div className='bbox'>{selectedItem.sellPrice}{user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Ulinkit Fee</div><div className='bbox'>{calculateUlinkFee()}{user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Taxes on Fee</div><div className='bbox'>{selectedItem.gst}{user.currencySymbol}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Marketing Fee</div><div className='bbox'>{selectedItem.commision}%</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Cost Per Unit</div><div className='bbox'>{calculateCostPerUnit(selectedItem)}{user.currencySymbol}</div>
                                </div>

                                <div className="flex" style={{ gap: '20px' }}>
                                    <button onClick={handleClosePopup} className='btn box2 flex' style={{ width: 'fit-content' }} type="button" ><div className="heading2">Back</div></button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            )}

            <div className="productlist">
                <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                    <button onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">All Products ({sellerProducts.length})</div></button>
                    <button onClick={() => handlePageChange(2)} className={currentPage === 2 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Approved (1)</div></button>
                    <button onClick={() => handlePageChange(3)} className={currentPage === 3 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Pending Approval (1)</div></button>
                    <button onClick={() => handlePageChange(4)} className={currentPage === 4 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Rejected (0)</div></button>
                    <button onClick={() => handlePageChange(5)} className={currentPage === 5 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Archived (0)</div></button>
                    <button onClick={() => handlePageChange(6)} className={currentPage === 6 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Draft (0)</div></button>
                </div>
                {currentPage === 1 && (
                    <Fragment>
                        <form className='searchBoxPro' onSubmit={searchSubmitHandler}>
                            <input type='text' className='searchinputPro' placeholder='Search for products...' onChange={(e) => setKeyword(e.target.value)} />
                            <button type='submit' className='searchbtnPro'><SearchIcon /></button>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Rejection reasons</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
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
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Updated</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                        </form>
                        <div className='productlist5' style={{ overflow: 'auto' }}>

                            {sellerProducts.length === 0 ? (
                                <Fragment>
                                    <div className="productlist">
                                        <img src={empty} className='productlist-img' alt="empty box" />
                                        <div className="heading">You do not have any products in this list</div>
                                        <div className="descrip2">This is where you will be able to view and manage your products</div>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>

                                    <div className="searchBoxPro2 grid-head">
                                        <div></div>
                                        <div className="heading3">Image</div>
                                        <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                        <div className="heading3">Category</div>
                                        <div className="heading3">Price</div>
                                        <div className="heading3">Fee Preview</div>
                                        <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                        <div className="heading3">Status</div>
                                        <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                        <div className="heading3">Visibility</div>
                                        <div className="heading3"></div>
                                    </div>

                                    {sellerProducts.map((item, index) => (
                                        <div className="searchBoxPro2" key={item.productId}>
                                            <div><input type="checkbox" /></div>
                                            <div>
                                                {item.imageUrl && <img className='imgPro' src={item.imageUrl} alt={item.imageName} />}
                                            </div>
                                            <div className="heading2 download-btn" onClick={() => productDetail(item.productId)} style={{ whiteSpace: 'nowrap' }}>
                                                {item.productName.length > 15 ? `${item.productName.substring(0, 15)}...` : item.productName}
                                            </div>
                                            <div className="heading2">
                                                {item.category.length > 15 ? `${item.category.substring(0, 15)}...` : item.category}
                                            </div>
                                            <div className="heading2">
                                                <div className="flex" style={{ gap: '5px' }}>
                                                    <span style={{ textDecoration: 'line-through', color: 'gray' }}>{user.currencySymbol}{item.unitPrice}</span>-<span style={{ fontWeight: 'bold' }}>{user.currencySymbol}{item.sellPrice}</span>
                                                </div>
                                            </div>
                                            <div className="heading2"><span className='download-btn' onClick={() => handleAddAddress(index)}> {calculateCostPerUnit(item)}{user.currencySymbol} </span></div>
                                            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>
                                                <div className="flexcol" style={{ gap: '2px' }}>
                                                    {/* <span style={{ fontWeight: 'bold' }}>{item.availableQuantity}</span> */}
                                                    <span style={{ fontWeight: 'bold' }}>3</span>
                                                    <span style={{ fontSize: '12px' }}>MOQ is {item.minOrderQuant}</span>
                                                </div>
                                            </div>
                                            <div className="heading2">{item.status}</div>
                                            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>{new Date(item.updatedDate).toLocaleString()}</div>
                                            <div className="heading2">{item.visibility}</div>
                                            <div className="heading2 flexcol">
                                                <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />
                                                <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.productId)} />
                                            </div>
                                        </div>
                                    ))}

                                </Fragment>
                            )}
                        </div>
                    </Fragment>
                )}
                {currentPage === 2 && (
                    <Fragment>
                        <div className="productlist">
                            <img src={empty} className='productlist-img' alt="empty box" />
                            <div className="heading">You do not have any products in this state</div>
                            <div className="descrip2">This is where you will be able to view and manage your products</div>
                        </div>
                    </Fragment>
                )}
                {currentPage === 3 && (
                    <Fragment>
                        <form className='searchBoxPro' onSubmit={searchSubmitHandler}>
                            <input type='text' className='searchinputPro' placeholder='Search for products...' onChange={(e) => setKeyword(e.target.value)} />
                            <button type='submit' className='searchbtnPro'><SearchIcon /></button>

                            <select name="reasons" className='searchselectPro'>
                                <option value="">Category</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Updated</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                        </form>
                        <div className='productlist5' style={{ overflow: 'auto' }}>
                            <div className="searchBoxPro2 grid-head">
                                <div></div>
                                <div className="heading3">Image</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading3">Category</div>
                                <div className="heading3">Price</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading3">Status</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading3">Visibility</div>
                                <div className="heading3"></div>
                            </div>
                            <div className="searchBoxPro2">
                                <div><input type="checkbox" /></div>
                                <div><img src={demo} className='imgPro' alt="demo" /></div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading2">Category</div>
                                <div className="heading2">Price</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading2">Status</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading2">Visibility</div>
                                <div className="heading2 flexcol"><EditNoteIcon style={{ cursor: 'pointer' }} /><DeleteIcon style={{ cursor: 'pointer' }} /> </div>
                            </div>
                        </div>

                    </Fragment>
                )}
                {currentPage === 4 && (
                    <Fragment>
                        <form className='searchBoxPro' onSubmit={searchSubmitHandler}>
                            <input type='text' className='searchinputPro' placeholder='Search for products...' onChange={(e) => setKeyword(e.target.value)} />
                            <button type='submit' className='searchbtnPro'><SearchIcon /></button>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Rejection reasons</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Category</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Updated</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                        </form>
                        <div className='productlist5' style={{ overflow: 'auto' }}>
                            <div className="searchBoxPro2 grid-head">
                                <div></div>
                                <div className="heading3">Image</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading3">Category</div>
                                <div className="heading3">Price</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading3">Status</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading3">Visibility</div>
                                <div className="heading3"></div>
                            </div>
                            <div className="searchBoxPro2">
                                <div><input type="checkbox" /></div>
                                <div><img src={demo} className='imgPro' alt="demo" /></div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading2">Category</div>
                                <div className="heading2">Price</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading2">Status</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading2">Visibility</div>
                                <div className="heading2 flexcol"><EditNoteIcon style={{ cursor: 'pointer' }} /><DeleteIcon style={{ cursor: 'pointer' }} /> </div>
                            </div>
                        </div>

                    </Fragment>
                )}
                {currentPage === 5 && (
                    <Fragment>
                        <form className='searchBoxPro' onSubmit={searchSubmitHandler}>
                            <input type='text' className='searchinputPro' placeholder='Search for products...' onChange={(e) => setKeyword(e.target.value)} />
                            <button type='submit' className='searchbtnPro'><SearchIcon /></button>
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
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Updated</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                        </form>
                        <div className='productlist5' style={{ overflow: 'auto' }}>
                            <div className="searchBoxPro2 grid-head">
                                <div></div>
                                <div className="heading3">Image</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading3">Category</div>
                                <div className="heading3">Price</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading3">Status</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading3">Visibility</div>
                                <div className="heading3"></div>
                            </div>
                            <div className="searchBoxPro2">
                                <div><input type="checkbox" /></div>
                                <div><img src={demo} className='imgPro' alt="demo" /></div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading2">Category</div>
                                <div className="heading2">Price</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading2">Status</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading2">Visibility</div>
                                <div className="heading2 flexcol"><EditNoteIcon style={{ cursor: 'pointer' }} /><DeleteIcon style={{ cursor: 'pointer' }} /> </div>
                            </div>
                        </div>

                    </Fragment>
                )}
                {currentPage === 6 && (
                    <Fragment>
                        <form className='searchBoxPro' onSubmit={searchSubmitHandler}>
                            <input type='text' className='searchinputPro' placeholder='Search for products...' onChange={(e) => setKeyword(e.target.value)} />
                            <button type='submit' className='searchbtnPro'><SearchIcon /></button>

                            <select name="reasons" className='searchselectPro'>
                                <option value="">Category</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Updated</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                            </select>
                        </form>
                        <div className='productlist5' style={{ overflow: 'auto' }}>
                            <div className="searchBoxPro2 grid-head">
                                <div></div>
                                <div className="heading3">Image</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading3">Category</div>
                                <div className="heading3">Price</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading3">Status</div>
                                <div className="heading3" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading3">Visibility</div>
                                <div className="heading3"></div>
                            </div>
                            <div className="searchBoxPro2">
                                <div><input type="checkbox" /></div>
                                <div><img src={demo} className='imgPro' alt="demo" /></div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Product Name</div>
                                <div className="heading2">Category</div>
                                <div className="heading2">Price</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Available Quantity</div>
                                <div className="heading2">Status</div>
                                <div className="heading2" style={{ whiteSpace: 'nowrap' }}>Created / Updated</div>
                                <div className="heading2">Visibility</div>
                                <div className="heading2 flexcol"><EditNoteIcon style={{ cursor: 'pointer' }} /><DeleteIcon style={{ cursor: 'pointer' }} /> </div>
                            </div>
                        </div>

                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default ProductList