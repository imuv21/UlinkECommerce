import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import empty from '../../assets/empty.png';
import demo from '../../assets/demo.jpg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet-async';

const ProductList = ({ handleOptionClick }) => {

    const [clickedIndex, setClickedIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState({});
    const tax = 10;

    const twoClick = () => {
        handleOptionClick('OptionTwo');
    };
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const productDetail = (index) => {
        navigate(`/product-details/${index}`);
    };

    //popup
    const [showPopup, setShowPopup] = useState(false);
    const handleAddAddress = (index) => {
        setClickedIndex(index);
        setSelectedItem(singleFormData[index]);
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


    //form data handling
    const [singleFormData, setSingleFormData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
        setSingleFormData(savedSingleFormData.map(item => ({ ...item, images: item.images || [] })));
    }, []);


    const handleEdit = (index) => {
        navigate(`/editsingle/${index}`);
    };
    const handleDelete = (index) => {
        const updatedSingleFormData = [...singleFormData];
        updatedSingleFormData.splice(index, 1);
        localStorage.setItem('singleFormData', JSON.stringify(updatedSingleFormData));
        setSingleFormData(updatedSingleFormData);
    };



    //discount calculator
    const calculateDiscountPercentage = () => {
        const salePrice = parseFloat(selectedItem.salePrice);
        const unitPrice = parseFloat(selectedItem.unitPrice);

        if (isNaN(salePrice) || isNaN(unitPrice)) {
            return 'N/A';
        }

        const discount = ((unitPrice - salePrice) / unitPrice) * 100;
        return `${discount.toFixed(2)}%`;
    };


    // Calculate Ulink Fee
    const calculateUlinkFee = () => {
        const salePrice = parseFloat(selectedItem.salePrice);
        const marketingValue = parseFloat(selectedItem.marketingValue);
        const quantity = 1;

        if (isNaN(salePrice)) {
            return 'N/A';
        }
        const ulinkFee = (marketingValue/100) * salePrice * quantity;
        return `${ulinkFee.toFixed(2)}₹`;
    };


    // Calculate Cost per unit
    const calculateCostPerUnit = (product) => {
        const salePrice = parseFloat(product.salePrice);
        const quantity = 1;

        if (isNaN(salePrice)) {
            return 'N/A';
        }
        const ulinkFee = 0.05 * salePrice * quantity;
        const costPerUnit = ulinkFee + tax;
        return `${costPerUnit.toFixed(2)}₹`;
    };


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Products List</title>
            </Helmet>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading">Products List</div>
                <button onClick={twoClick} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Add Single Product</div></button>
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
                                    <div className="heading2">Unit Price</div><div className='bbox'>{selectedItem.unitPrice}₹</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Shipping Charges</div><div className='bbox'>0₹</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Discount</div><div className='bbox'>{calculateDiscountPercentage()}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Sale Price</div><div className='bbox'>{selectedItem.salePrice}₹</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Ulinkit Fee</div><div className='bbox'>{calculateUlinkFee()}</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Taxes on Fee</div><div className='bbox'>{tax}₹</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Marketing Fee</div><div className='bbox'>{selectedItem.marketingValue}%</div>
                                </div>
                                <div className="popboxdivs">
                                    <div className="heading2">Cost Per Unit</div><div className='bbox'>{calculateCostPerUnit(selectedItem)}</div>
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
                    <button onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">All Products (1)</div></button>
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

                            {singleFormData.length === 0 ? (
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

                                    {singleFormData.map((item, index) => (
                                        <div className="searchBoxPro2" key={index}>
                                            <div><input type="checkbox" /></div>
                                            <div>
                                                {item.images.length > 0 && <img className='imgPro' src={item.images[0].url} alt={item.images[0].name} />}
                                            </div>
                                            <div className="heading2 download-btn" onClick={() => productDetail(index)} style={{ whiteSpace: 'nowrap' }}>
                                                {item.productName.length > 15 ? `${item.productName.substring(0, 15)}...` : item.productName}
                                            </div>
                                            <div className="heading2">{item.categoryPath.length > 15 ? `${item.categoryPath.substring(0, 15)}...` : item.categoryPath}</div>
                                            <div className="heading2">
                                                <div className="flex" style={{ gap: '5px' }}>
                                                    <span style={{ textDecoration: 'line-through', color: 'gray' }}>{item.unitPrice}₹</span>-<span style={{ fontWeight: 'bold' }}>{item.salePrice}₹</span>
                                                </div>
                                            </div>
                                            <div className="heading2"><span className='download-btn' onClick={() => handleAddAddress(index)}> {calculateCostPerUnit(item)} </span></div>
                                            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>
                                                <div className="flexcol" style={{ gap: '2px' }}>
                                                    <span style={{ fontWeight: 'bold' }}>{item.availableQuantity}</span>
                                                    <span style={{ fontSize: '12px' }}>MOQ is {item.minOrderQuant}</span>
                                                </div>
                                            </div>
                                            <div className="heading2">Pending</div>
                                            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>{item.time}</div>
                                            <div className="heading2">Offline</div>
                                            <div className="heading2 flexcol">
                                                <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />
                                                <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDelete(index)} />
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