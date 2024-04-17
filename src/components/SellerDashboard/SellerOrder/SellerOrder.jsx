import React, { useState, Fragment } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import empty from '../../../assets/box-empty-icon.png';
import demo from '../../../assets/jpg-slider/11.jpg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';


const SellerOrder = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    //page 1
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading">My Orders</div>
            </div>

            <div className="productlist">
                <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                    <button onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">All Orders</div></button>
                    <button onClick={() => handlePageChange(2)} className={currentPage === 2 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Ready For Pickup</div></button>
                    <button onClick={() => handlePageChange(3)} className={currentPage === 3 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Pending Approval</div></button>
                    <button onClick={() => handlePageChange(4)} className={currentPage === 4 ? 'toggle-active btn-toggle box3 flex' : 'btn-toggle box3 flex'}><div className="heading2">Rejected</div></button>

                </div>
                {currentPage === 1 && (
                    <Fragment>
                        <form className='searchBoxPro' onSubmit={searchSubmitHandler}>
                            <input type='text' className='searchinputPro' placeholder='Search for orders...' onChange={(e) => setKeyword(e.target.value)} />
                            <button type='submit' className='searchbtnPro'><SearchIcon /></button>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Order Status</option>
                                <option value="all">All</option>
                                <option value="pending-upload">Order placed</option>
                                <option value="pending-verification">In transit</option>
                                <option value="pending-payment">Delivered</option>
                                <option value="paid">Canceled</option>
                                <option value="one">Ready to ship</option>
                                <option value="two">Order picked</option>
                                <option value="two">Out for delivery</option>
                                <option value="paid">Under dispute</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Invoice Status</option>
                                <option value="all">All</option>
                                <option value="pending-upload">Pending upload</option>
                                <option value="pending-verification">Pending verification</option>
                                <option value="pending-payment">Pending payment</option>
                                <option value="paid">Paid</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Order Type</option>
                                <option value="all">All</option>
                                <option value="cart">Cart orders</option>
                                <option value="negotiated">Negotiated orders</option>
                            </select>
                            <select name="reasons" className='searchselectPro'>
                                <option value="">Short By</option>
                                <option value="oldest">Last updated - oldest</option>
                                <option value="newest">Last updated - newest</option>
                                <option value="highest">Price - highest</option>
                                <option value="lowest">Price - lowest</option>
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

export default SellerOrder